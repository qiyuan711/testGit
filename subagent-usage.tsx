/** @jsxImportSource @opentui/solid */
import type { AssistantMessage, Part } from "@opencode-ai/sdk/v2"
import type { TuiPlugin, TuiPluginApi, TuiPluginModule } from "@opencode-ai/plugin/tui"
import { createMemo, Show, untrack } from "solid-js"

const id = "subagent-usage"

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const number = (value: number) => Math.round(value).toLocaleString("en-US")

type ToolCallPart = Extract<Part, { type: "tool" }>

function Usage(props: { api: TuiPluginApi; session_id: string }) {
  const theme = () => props.api.theme.current
  const messages = createMemo(() => props.api.state.session.messages(props.session_id))

  const usage = createMemo(() => {
    const last = messages().findLast(
      (item): item is AssistantMessage => item.role === "assistant" && (item.tokens?.output ?? 0) > 0,
    )
    const tokens = last?.tokens
    if (!tokens) return

    const input = tokens.input ?? 0
    const output = tokens.output ?? 0
    const reasoning = tokens.reasoning ?? 0
    const cacheRead = tokens.cache?.read ?? 0
    const cacheWrite = tokens.cache?.write ?? 0
    const total = input + output + reasoning + cacheRead + cacheWrite
    if (total <= 0) return

    const provider = props.api.state.provider.find((item) => item.id === last?.providerID)
    const model = last ? provider?.models[last.modelID] : undefined
    const limit = model?.limit?.context
    const pct = limit ? ` (${Math.round((total / limit) * 100)}%)` : ""
    const cost = props.api.state.session.get(props.session_id)?.cost ?? 0

    return [
      `${number(total)}${pct}`,
      `${number(cacheRead)} cached`,
      `${number(input)} in`,
      `${number(output)} out`,
      reasoning > 0 ? `${number(reasoning)} reasoning` : undefined,
      cost > 0 ? money.format(cost) : undefined,
    ]
      .filter((segment): segment is string => Boolean(segment))
      .join(" · ")
  })

  const tools = createMemo(() => {
    const calls = messages()
      .flatMap((message) => props.api.state.part(message.id))
      .filter((part): part is ToolCallPart => part.type === "tool")
    const err = calls.filter((part) => part.state.status === "error").length
    const counts = new Map<string, number>()
    for (const part of calls) counts.set(part.tool, (counts.get(part.tool) ?? 0) + 1)
    const byTool = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    return { total: calls.length, err, byTool }
  })

  return (
    <box flexShrink={0} flexDirection="column" paddingLeft={2} paddingRight={1}>
      <Show when={usage()}>
        {(line) => (
          <text fg={theme().textMuted} wrapMode="none">
            {line()}
          </text>
        )}
      </Show>
      <Show when={tools().total > 0}>
        <text fg={theme().textMuted} wrapMode="none">
          {[
            tools().err > 0
              ? `${number(tools().total)} tools (${number(tools().err)} err)`
              : `${number(tools().total)} tools`,
            ...tools()
              .byTool.slice(0, 5)
              .map(([name, count]) => `${name} ${number(count)}`),
            tools().byTool.length > 5 ? `+${tools().byTool.length - 5} more` : undefined,
          ]
            .filter((segment): segment is string => Boolean(segment))
            .join(" · ")}
        </text>
      </Show>
    </box>
  )
}

const tui: TuiPlugin = async (api) => {
  api.slots.register({
    order: 0,
    slots: {
      // session_prompt is a replace-mode slot rendered directly below the
      // subagent footer. Returning null falls back to the stock prompt, so
      // only subagent sessions get the usage lines above their prompt.
      session_prompt(_ctx, props) {
        // untrack: the slot registry invokes this inside its own memo; reading
        // session state untracked keeps that memo stable so the prompt below
        // is not remounted on every session update.
        const subagent = untrack(() => Boolean(api.state.session.get(props.session_id)?.parentID))
        if (!subagent) return null
        return (
          <box flexDirection="column" flexShrink={0}>
            <Usage api={api} session_id={props.session_id} />
            <api.ui.Prompt
              sessionID={props.session_id}
              visible={props.visible}
              disabled={props.disabled}
              onSubmit={props.on_submit}
              ref={props.ref}
              right={<api.ui.Slot name="session_prompt_right" session_id={props.session_id} />}
            />
          </box>
        )
      },
    },
  })
}

const plugin: TuiPluginModule & { id: string } = {
  id,
  tui,
}

export default plugin
