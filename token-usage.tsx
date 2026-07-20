/** @jsxImportSource @opentui/solid */
import type { AssistantMessage, Part } from "@opencode-ai/sdk/v2"
import type { TuiPlugin, TuiPluginApi, TuiPluginModule } from "@opencode-ai/plugin/tui"
import { createMemo, For, Show } from "solid-js"

const id = "token-usage"

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

type ToolStat = {
  name: string
  total: number
  ok: number
  err: number
}

type Totals = {
  input: number
  output: number
  reasoning: number
  cacheRead: number
  cacheWrite: number
  cost: number
  turns: number
  tools: number
  toolsOk: number
  toolsErr: number
  byTool: ToolStat[]
}

function formatCount(n: number) {
  return Math.round(n).toLocaleString("en-US")
}

function sumTools(
  api: TuiPluginApi,
  messages: ReadonlyArray<{ id: string; role: string }>,
): Pick<Totals, "tools" | "toolsOk" | "toolsErr" | "byTool"> {
  let tools = 0
  let toolsOk = 0
  let toolsErr = 0
  const map = new Map<string, ToolStat>()

  for (const item of messages) {
    if (item.role !== "assistant") continue
    const parts = api.state.part(item.id) as ReadonlyArray<Part>
    for (const part of parts) {
      if (part.type !== "tool") continue
      tools += 1
      const name = part.tool || "unknown"
      const status = part.state?.status
      const entry = map.get(name) ?? { name, total: 0, ok: 0, err: 0 }
      entry.total += 1
      if (status === "completed") {
        toolsOk += 1
        entry.ok += 1
      } else if (status === "error") {
        toolsErr += 1
        entry.err += 1
      }
      map.set(name, entry)
    }
  }

  const byTool = Array.from(map.values()).sort((a, b) => b.total - a.total || a.name.localeCompare(b.name))
  return { tools, toolsOk, toolsErr, byTool }
}

function sumMessages(
  messages: ReadonlyArray<{ role: string } & Partial<AssistantMessage>>,
): Omit<Totals, "tools" | "toolsOk" | "toolsErr" | "byTool"> {
  const totals = {
    input: 0,
    output: 0,
    reasoning: 0,
    cacheRead: 0,
    cacheWrite: 0,
    cost: 0,
    turns: 0,
  }
  for (const item of messages) {
    if (item.role !== "assistant") continue
    const msg = item as AssistantMessage
    const tokens = msg.tokens
    if (!tokens) continue
    totals.input += tokens.input ?? 0
    totals.output += tokens.output ?? 0
    totals.reasoning += tokens.reasoning ?? 0
    totals.cacheRead += tokens.cache?.read ?? 0
    totals.cacheWrite += tokens.cache?.write ?? 0
    totals.cost += msg.cost ?? 0
    totals.turns += 1
  }
  return totals
}

function formatToolStat(stat: ToolStat) {
  const bits = [`${stat.name} ${formatCount(stat.total)}`]
  if (stat.err > 0) bits.push(`${formatCount(stat.err)} err`)
  return bits.join(" · ")
}

function View(props: { api: TuiPluginApi; session_id: string }) {
  const theme = () => props.api.theme.current

  const totals = createMemo((): Totals => {
    const session = props.api.state.session.get(props.session_id)
    const messages = props.api.state.session.messages(props.session_id)
    const fromMessages = sumMessages(messages)
    const tools = sumTools(props.api, messages)

    if (session?.tokens) {
      return {
        input: session.tokens.input ?? 0,
        output: session.tokens.output ?? 0,
        reasoning: session.tokens.reasoning ?? 0,
        cacheRead: session.tokens.cache?.read ?? 0,
        cacheWrite: session.tokens.cache?.write ?? 0,
        cost: session.cost ?? fromMessages.cost,
        turns: fromMessages.turns,
        ...tools,
      }
    }

    return { ...fromMessages, ...tools }
  })

  const show = createMemo(() => {
    const t = totals()
    return t.input + t.output + t.reasoning + t.cacheRead + t.cacheWrite + t.cost + t.tools > 0
  })

  const toolHeader = createMemo(() => {
    const t = totals()
    if (t.tools === 0) return "Tools 0"
    const bits = [`Tools ${formatCount(t.tools)}`]
    if (t.toolsOk > 0) bits.push(`${formatCount(t.toolsOk)} ok`)
    if (t.toolsErr > 0) bits.push(`${formatCount(t.toolsErr)} err`)
    return bits.join(" · ")
  })

  return (
    <Show when={show()}>
      <box>
        <text fg={theme().text}>
          <b>Usage</b>
        </text>
        <text fg={theme().textMuted}>
          ↑ {formatCount(totals().input)} in · ↓ {formatCount(totals().output)} out
        </text>
        <text fg={theme().textMuted}>Reasoning {formatCount(totals().reasoning)}</text>
        <text fg={theme().textMuted}>
          Cache {formatCount(totals().cacheRead)}r/{formatCount(totals().cacheWrite)}w
        </text>
        <text fg={theme().textMuted}>{toolHeader()}</text>
        <For each={totals().byTool}>
          {(stat) => <text fg={theme().textMuted}>  {formatToolStat(stat)}</text>}
        </For>
        <text fg={theme().textMuted}>
          {money.format(totals().cost)} spent
          {totals().turns > 0 ? ` · ${totals().turns} turn${totals().turns === 1 ? "" : "s"}` : ""}
        </text>
      </box>
    </Show>
  )
}

const tui: TuiPlugin = async (api) => {
  api.slots.register({
    order: 150,
    slots: {
      sidebar_content(_ctx, props) {
        return <View api={api} session_id={props.session_id} />
      },
    },
  })
}

const plugin: TuiPluginModule & { id: string } = {
  id,
  tui,
}

export default plugin
