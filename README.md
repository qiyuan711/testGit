/**
/ File: Adventurer.java
/ Author: your name
/ Id: your id
/ Version: 1.0 09/10/2015
/ Description: Assignment 2
/ This is my own work as defined by the SAIBT / EIBT
/ Academic Misconduct policy.
*/

package entity;

import items.Armour;
import items.Item;
import items.Shield;
import items.UseableItem;
import items.Weapon;

import java.util.Random;

import exceptions.ItemTypeException;

/**
 * <h3>Overview</h3>
 * <p>
 * Playable characters and enemies will both be an instance of 
 * the Adventurer class. The Adventurer will have a name, maxHP and 
 * hp. They will also have a status indicating if they are alive, stunned or 
 * blocking. The adventurer will be able to use and equip items. 
 * Items could be usable items like potions or items that can be 
 * equipped like weapons, shields or armour.
 * The Adventurer will be able to equip a suit of armour, a weapon
 * and a shield. The Adventurer will also be able to hold an additional
 * 6 items in their inventory.
 * </p>
 * <p>
 * The adventurer will be able to fight other adventurers using their
 * weapon to deal damage and their shield and armour to reduce damage
 * taken. If the character is not stunned or dead the character
 * can choose to attack, defend or use an item. Every action ends the
 * player's turn. If stunned, they will skip a turn.
 * </p>
 * <h3>How To Do This Assignment</h3>
 * <ul>
 * <li>We suggest you write the basic methods of Adventurer first.
 * <li>Test the takeDamage, takeHealing, isAlive and toString methods.
 * <li>Write your test driver with a main method. Create an adventurer to test these methods.
 * <li>Write the Item, Weapon, Shield and Armour classes. Create some equipment. Test.
 * <li>Write the equipWeapon, equipShield, equipArmour methods. Equip your adventurer. Test.
 * <li>Write the attack and defend methods. Create a second adventurer to test these methods.
 * <li>Write your UseableItem, HealthPotion and DamagePotion classes.
 * <li>Write your addItem, removeItem, destroyItem and use methods.
 * <li>Create some potions and test these methods.
 * <li>Test these by using them on your opponent from your inventory. 
 * <li>Write a main method in your Game class to instantiate the game.
 * <li>Write your game class, battle section. Test.
 * <li>Write your game class, inventory management section. Test.
 * <li>Complete the rest of your test driver and play the game enough times to ensure it is working.
 * <li>At this point your assignment should be complete as per the marking criteria.
 * <li>If you would like to make some extensions, copy your project and have some fun.
 * </ul>
 * 
 * <h3>Additional Requirement</h3>
 * <ul>
 * <li>As you are programming you will need to comment your code thoroughly in each of your methods.
 * <li>You will need to create and use a test driver.
 * </ul>
 * 
 * <h3>How We Will Mark Your Assignment.</h3>
 * <ul>
 * <li>We will run javadoc on your code to see if your code generates the API correctly.
 * <li>We will read your code to look for style and commenting problems.
 * <li>We will play your game with our own game class, to test your code and all possibilities therein.
 * </ul>
 * 
 * <h3>Marking Scheme</h3>
 * <p>
 * 45 Percent for correct class structure including Adventurer and Items<br>
 * 25 Percent for the interactive game class <br>
 * 10 Percent for correct exception handling <br>
 * 10 Percent for your test driver and appropriate tests therein.<br>
 * 10 Percent for commenting/style of code etc...<br><br>
 * </p>
 * <p>
 * 
 * <strong>Date:</strong> 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10/8/2015</p>
 * 
 * @version 1.2
 */
public class Adventurer {

	String name;
	int maxHP;
	int hp;
	Weapon weapon;
	Shield shield;
	Armour armour;
	boolean alive;
	boolean blocking;
	boolean stunned;
	Item[] inventory;
	
	private static int INVENTORY_SIZE = 6;
	
	/**
	 * A full constructor
	 * @param name The adventurer's name
	 * @param maxHP Max hit points
	 * @param hp Initial hit points
	 * @param weapon initial weapon
	 * @param shield initial shield
	 * @param armour initial armour
	 * @param alive Whether the character is alive or dead
	 */
	public Adventurer(String name, int maxHP, int hp, 
			Weapon weapon, Shield shield, Armour armour, 
			boolean alive){
		this.name = name;
		this.maxHP = maxHP;
		this.hp = hp;
		this.weapon = weapon;
		this.shield = shield;
		this.armour = armour;
		this.alive = alive;
		this.blocking = false;
		this.stunned = false;
		this.inventory = new Item[INVENTORY_SIZE];
		this.clearInventory();
	}

	/**
	 * Helper method that would empty the Adventurer's inventory.
	 */
	private void clearInventory(){
		for(int i = 0; i < INVENTORY_SIZE; i++)
			this.inventory[i] = null;
	}
	
	/**
	 * A minimal constructor.
	 * Other member variables are initialized to default.
	 * @param name The adventurer's name
	 * @param maxHP Max hit points and initial hitpoints
	 */
	public Adventurer(String name, int maxHP){
		this(name, maxHP, maxHP, null, null, null, true);
	}
	
	/**
	 * A copy constructor
	 * @param other the other adventurer to copy all values from
	 */
	public Adventurer(Adventurer other){
		this(other.name, other.maxHP, other.hp, other.weapon, other.shield, other.armour, other.alive);
	}
	
	/**
	 * Apply damage to hp.
	 * HP must not go below zero or above maxHP
	 * @param damage positive Int
	 */
	public void takeDamage(int damage){
		this.hp = Math.max(this.hp - damage, 0);
		if(this.hp == 0)
			this.alive = false;
	}
		
	/**
	 * Apply healing to hp.
	 * HP must not go below zero or above maxHP
	 * @param healing Positive int
	 */
	public void takeHealing(int healing){
		this.hp = Math.min(this.hp + healing, this.maxHP);
	}
	
	/**
	 * Returns if the adventurer is alive
	 * @return True if adventurer is alive
	 */
	public boolean isAlive(){
		return this.alive;
	}
		
	/**
	 * Returns if the adventurer is stunned;
	 * @return True if adventurer is stunned
	 */
	public boolean isStunned(){
		return this.stunned;
	}

	/**
	 * Stun the adventurer.
	 */
	public void getStunned(){
		this.stunned = true;
	}
	
	/**
	 * Recover from stun and back to active.
	 */	
	public void recoveredFromStun(){
		this.stunned = false;
	}
	
	/**
	 * Use the item at the specified index on the target adventurer.
	 * 
	 * @param index Index to find the item
	 * @param target Adventurer to use the item on
	 * @return True if the item was successfully used
	 * @throws ItemTypeException If item is not an equipable item.
	 */
	public boolean use(int index, Adventurer target) throws ItemTypeException{
		Item item = this.inventory[index - 1];
		if(item instanceof UseableItem){
			((UseableItem) item).use(target);
			this.inventory[index - 1] = null;
			return true;
		}
		else{
			throw new ItemTypeException("Incorrect item type.");
		}
	}

	/**
	 * Returns the item at the specified index from the inventory.
	 * @param index The index of the item to return, which starts at 1.
	 * @return The item at position specified by the index.
	 */
	public Item getItem(int index){
		return this.inventory[index - 1];
	}
	
	/**
	 * Add the input item in the first empty position in the inventory.
	 * @param item Item to add
	 * @return True if item successfully added to inventory
	 */
	public boolean addItem(Item item){
		int index = -1;
		
		for(int i = 0; i < INVENTORY_SIZE; i++){
			if(this.inventory[i] == null){
				index = i;
				break;
			}
		}
		
		if(index != -1)
			this.inventory[index] = item;
		
		return index != -1;
	}

	/**
	 * Add the input item at the index position in the inventory.
	 * @param item Item to add
	 * @param index position to add the item
	 * @return True if item successfully added to inventory
	 */
	public boolean addItem(Item item, int index){
		this.inventory[index - 1] = item;
		return true;
	}
	
	/**
	 * Remove the item at the specified index from the inventory.
	 * Set the item at that position to null.
	 * @param index The index of the item to return, which starts at 1.
	 * @return The item at position specified by the index.
	 */
	public Item removeItem( int index ){
		Item item = this.inventory[index - 1];
		this.inventory[index - 1] = null;
		return item;
	}

	/**
	 * Destroy the item at the specified index from the inventory.
	 * Set the item at that location to null.
	 * @param index The index of the item to destroy
	 */
	public void destroyItem ( int index ){
		this.inventory[index - 1] = null;
	}

	/**
	 * Check whether the attacker would be stunned when attacking
	 * @return True if to stun the enemy
	 */	
	public boolean wouldStunAttacker(){
		boolean stunAttacker = false;
		
		if(this.shield != null){
			Random r = new Random();
			float chance = r.nextFloat();
			if(chance > this.shield.getRating()){
				stunAttacker = true;
			}
		}
		
		return stunAttacker;
	}
	
	/**
	 * Attack the target adventurer with your weapon
	 * @param target The adventurer to attack
	 * @return The amount of damage dealt
	 */
	public int attack(Adventurer target){
		if(this.blocking){
			this.blocking = false;
		}
		
		int damage = 0;
		if(this.weapon != null){
			damage = this.weapon.getDamage();
		}
		
		int targetArmourRating = target.getArmourRating();
		damage = Math.max(damage - targetArmourRating, 1);
		System.out.println(this.name + " attacks " + target.name + " for " + damage + " damage!");
		
		target.takeDamage(damage);
		if(target.wouldStunAttacker()){
			this.stunned = true;
			System.out.println(this.name + " is stunned!");
		}
		return damage;
	}
	
	/**
	 * Set blocking to true so that your shield rating and chance to stun is applied
	 * when the enemy attacks.
	 */
	public void defend(){
		this.blocking = true;
		System.out.println(this.name + " defends!");
	}
	
	/**
	 * Check whether the adventurer is defending
	 * @return True if the adventurer is defending
	 */	
	public boolean isDefending(){
		return this.blocking;
	}
	
	/**
	 * Set your equipped weapon to the input weapon
	 * @param weapon Weapon to equip
	 * @return The old weapon
	 */
	public Weapon equipWeapon(Weapon weapon){
		Weapon current = this.weapon;
		this.weapon = weapon;
		return current;
	}
	
	/**
	 * Set your equipped shield to the input shield
	 * @param shield Shield to equip
	 * @return The old shield
	 */
	public Shield equipShield(Shield shield){
		Shield current = this.shield;
		this.shield = shield;
		return current;
	}

	/**
	 * Set your equipped armour to the input armour
	 * @param armour Armour to equip
	 * @return The old armour
	 */
	public Armour equipArmour(Armour armour){
		Armour current = this.armour;
		this.armour = armour;
		return current;
	}

	/**
	 * Check whether armour has been equipped
	 * @return True if armour has been equipped
	 */
	public boolean isEquippedArmour(){
		return this.armour != null;
	}

	/**
	 * Return the equipped armour
	 * @return the currently equipped armour
	 */
	public Armour getArmour(){
		return this.armour;
	}

	/**
	 * Check whether shield has been equipped
	 * @return True if shield has been equipped
	 */
	public boolean isEquippedShield(){
		return this.shield != null;
	}

	/**
	 * Return the equipped shield
	 * @return the currently equipped shield
	 */	
	public Shield getShield(){
		return this.shield;
	}

	/**
	 * Check whether weapon has been equipped
	 * @return True if weapon has been equipped
	 */
	public boolean isEquippedWeapon(){
		return this.weapon != null;
	}

	/**
	 * Return the equipped weapon
	 * @return the currently equipped weapon
	 */	
	public Weapon getWeapon(){
		return this.weapon;
	}

	/**
	 * Return the total weight of the adventurer.
	 * @return the weight of the adventurer, Positive int.
	 */			
	
	public int getWeight(){
		int totalWeight = 0;
		
		if(this.weapon != null)
			totalWeight += this.weapon.getWeight();
		if(this.shield != null)
			totalWeight += this.shield.getWeight();
		if(this.armour != null)
			totalWeight += this.armour.getWeight();
		
		return totalWeight;
	}

	/**
	 * Return the total armour rating of the adventurer.
	 * @return the armour rating of the adventurer, Positive int.
	 */			
	public int getArmourRating(){
		int rating = 0;
		
		if(this.shield != null)
			rating += this.shield.getRating();
		if(this.armour != null)
			rating += this.armour.getRating();
		
		return rating;	
	}
	
	/**
	 * Display the current inventory of the adventurer.
	 */			
	public void showInventory(){
		for(int i = 0; i < INVENTORY_SIZE; i++)
			if(this.inventory[i] == null)
				System.out.println((i + 1) + ". " + "null");
			else
				System.out.println((i + 1) + ". " + this.inventory[i]);
	}

	/**
	 * Display the current hp of the adventurer.
	 */		
	public void displayHp(){
		System.out.println(this.name + " has " + this.hp + "hp left.");
	}

	/**
	 * Check whether the adventurer's hp is full at maxHp.
	 * @return True if full hp
	 */		
	public boolean isRejunvenated(){
		return this.hp == this.maxHP;
	}
	
	/**
	 * Get the information of the adventurer in String format.
	 * @return the String representing the adventurer
	 */	
	public String toString(){
		return this.name;
	}
}


/**
/ File: Game.java
/ Author: your name
/ Id: your id
/ Version: 1.0 09/10/2015
/ Description: Assignment 2
/ This is my own work as defined by the SAIBT / EIBT
/ Academic Misconduct policy.
*/

package entity;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

import exceptions.ItemTypeException;
import items.Item;
import items.Armour;
import items.Shield;
import items.Weapon;
import items.HealthPotion;
import items.DamagePotion;

/**
 * This is an interactive text-based game allowing you to fight enemy
 * adventurers and equip and use items. 
 * 
 * Before the game begins you will need to perform any initialization 
 * that might be required. In this section, create an adventurer for 
 * the player. You may choose to equip them with some basic equipment
 * and items.
 * 
 * In the battle subroutine you will need to generate an enemy and
 * allow the player and enemy to fight each other until one of them
 * is defeated.
 * 
 * In the findItems subroutine you will present the player with some 
 * items to add to their inventory. In this subroutine, they may
 * add items, equip items, drop items or choose to battle the next
 * enemy.
 * 
 * When the player is defeated display game over and end the game. 
 * 
 * <strong>Date:</strong> 
 * <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10/8/2015</p>
 * 
 * @version 1.2
 */
public class Game {

	Adventurer player;
	Adventurer enemy;
	Scanner keyboard;
	Random random;
	
	private Adventurer firstToMove;
	private int inventoryStatus;
	private static ArrayList<Item> arsenal;
	
	static{
		arsenal = new ArrayList<Item>();
		
		Armour leatherTunic = new Armour("Leather Tunic", 5, 10);
		Armour scaleMail = new Armour("Scale Mail", 10, 20);
		Armour breastPlate = new Armour("Breast Plate", 15, 25);
		Armour plateMail = new Armour("Plate Mail", 20, 30);
		Armour gothicPlate = new Armour("Gothic Plate", 25, 40);
		Armour ancientArmour = new Armour("Ancient Armour", 30, 45);
		
		arsenal.add(leatherTunic);
		arsenal.add(scaleMail);
		arsenal.add(breastPlate);
		arsenal.add(plateMail);
		arsenal.add(gothicPlate);
		arsenal.add(ancientArmour);
		
		Shield buckler = new Shield("Buckler", 5, 5, 0);
		Shield largeShield = new Shield("Large Shield", 10, 10, 0.1f);
		Shield monarch = new Shield("Monarch", 15, 15, 0.15f);
		Shield bladeBarrier = new Shield("Blade Barrier", 20, 15, 0.15f);
		Shield aegis = new Shield("Aegis", 25, 30, 0.2f);
		Shield ward = new Shield("Ward", 30, 45, 0.3f);
		
		arsenal.add(buckler);
		arsenal.add(largeShield);
		arsenal.add(monarch);
		arsenal.add(bladeBarrier);
		arsenal.add(aegis);
		arsenal.add(ward);

		Weapon dagger = new Weapon("Dagger", 30, 5);
		Weapon axe = new Weapon("Axe", 50, 15);
		Weapon mace = new Weapon("Mace", 60, 15);
		Weapon spear = new Weapon("Spear", 80, 10);
		Weapon sword = new Weapon("Sword", 100, 20);
		Weapon revolver = new Weapon("Revolver", 200, 10);
		
		arsenal.add(dagger);
		arsenal.add(axe);
		arsenal.add(mace);
		arsenal.add(spear);
		arsenal.add(sword);
		arsenal.add(revolver);
		
		HealthPotion healthPotion = new HealthPotion("Healing Potion");
		DamagePotion damagePotion = new DamagePotion("Rancid Gas Potion");
		
		arsenal.add(healthPotion);
		arsenal.add(damagePotion);
	}
	
	/**
	 * 
	 * @param player The character to make actions based on keyboard input
	 * @param enemy The character to make actions based on random numbers
	 */
	public Game(Adventurer player, Adventurer enemy){
		this.player = player;
		this.enemy = enemy;
		this.keyboard = new Scanner(System.in);
		this.random = new Random();
		this.inventoryStatus = 0;
		this.equipAdventurer();
	}

	/**
	 * Initialize the game by give the player equipments.
	 *  
	 */						
	private void equipPlayer(){
		Weapon initialEquippedWeapon = new Weapon("Truncheon", 100, 1);
		this.player.equipWeapon(initialEquippedWeapon);		

		Shield computerEquippedShield = (Shield) this.getEquipment("Shield");
		this.player.equipShield(computerEquippedShield);		
	}

	/**
	 * Initialize the game by give the enemy equipments.
	 *  
	 */						
	private void equipComputer(){
		Weapon computerEquippedWeapon = (Weapon) this.getEquipment("Weapon");
		this.enemy.equipWeapon(computerEquippedWeapon);
		
		Shield computerEquippedShield = (Shield) this.getEquipment("Shield");
		this.enemy.equipShield(computerEquippedShield);
		
		Armour computerEquippedArmour = (Armour) this.getEquipment("Armour");
		this.enemy.equipArmour(computerEquippedArmour);		
	}

	/**
	 * Initialize the game by give the players equipments.
	 *  
	 */					
	private void equipAdventurer(){
		this.equipPlayer();
		this.equipComputer();
	}

	/**
	 * Select equipments from the Game Arsenal.
	 *  
	 */						
	private Item getEquipment(String equipmentType){
		ArrayList<Item> selectable = new ArrayList<Item>();
		for(Item item: arsenal){
			if(item.getTypename().equals(equipmentType)){
				selectable.add(item);
			}
		}
		
		if(selectable.size() > 0){
			int index = this.random.nextInt(selectable.size());
			return selectable.get(index);
		}
		else{
			System.err.println("There is no item of type " + equipmentType + " in the Game Arsenal.\n");
			return null;			
		}
	}

	/**
	 * Prompt the adventurer for actions during the battle.
	 *  
	 */					
	private int showPlayerActions(){
		System.out.println("1. Attack");
		System.out.println("2. Block");
		System.out.println("3. Inventory");
		System.out.println("4. Run Away");
		System.out.println("What would you like to do (1-4)?");
		
		int choice = keyboard.nextInt();
		if((choice >= 0) && (choice <=4)){
			return choice;
		}
		else{
			return this.showPlayerActions();
		}
	}

	/**
	 * Pick up new items for the adventurer.
	 *  
	 */				
	private void pickupItem(){
		int selection = this.random.nextInt(arsenal.size());
		Item item = arsenal.get(selection);
		System.out.println("Item found!");
		System.out.println(item);
		System.out.println("Would you like to pick up " + item + "(yes/no):");
		String answer = this.keyboard.next();
		if(answer.equals("yes")){
			boolean status = this.player.addItem(item);
			if(!status)
				System.out.println("Couldn't pick up item because inventory is full!");
		}
		this.player.showInventory();
	}

	/**
	 * The adventurer's awards for winning the game.
	 *  
	 */				
	private void getAwards(){	
		int totalAwards = 3;
		System.out.println("Items Found!\n");

		int awardsLeft = totalAwards;

		while(true){
			System.out.println("Items left: " + awardsLeft);
			System.out.println("1. Pick up item");
			System.out.println("2. Drop item");
			System.out.println("3. Equip item");
			System.out.println("4. Fight!");
			System.out.println("What would you like to do (1-4)?");
			int choice = this.keyboard.nextInt();
			if((awardsLeft == 0) && (choice == 1)){
				System.out.println("Couldn't pick up item due to no award left.");
				continue;
			}
			switch(choice){
				case 1: this.pickupItem(); awardsLeft--; break;
				case 2: this.inventoryStatus = 2; this.findItems(); break;
				case 3: this.inventoryStatus = 3; this.findItems(); break;
				case 4: break;
			}
			if(choice == 4)
				break;
		}
		this.battle();
	}

	/**
	 * The adventurer loses the game.
	 * More battle statistics could be displayed here. 
	 */			
	public void gameOver(){
		System.out.println("Game Over!");
	}

	/**
	 * The adventurer wins the game and should collect awards.
	 */		
	public void winBattle(){
		System.out.println("Congratulation! You defeated " + this.enemy);
		this.getAwards();
	}
	
	/**
	 * Battle will generate an enemy and allow the player to fight them.
	 * The player will be able to attack, defend and use items.
	 * Exit the function when either the player or the enemy have been defeated.
	 */
	public void battle(){
		if((this.enemy == null) || (!this.enemy.isAlive())){
			System.out.println("Generate a new enemy. The name is?");
			String enemyName = this.keyboard.next();
			this.enemy = new Adventurer(enemyName, 500);
			this.equipComputer();
		}
		
		this.firstToMove = this.player;
		if(this.player.getWeight() > this.enemy.getWeight()){
			this.firstToMove = this.enemy;
		}
		
		System.out.println(this.firstToMove.name + " moves first.");
		
		while(true){
			if(!this.enemy.isAlive()){
				this.winBattle();
				break;
			}
			else if(!this.player.isAlive()){
				this.gameOver();
				break;
			}
			
			if(this.firstToMove == this.player){
				this.firstToMove = this.enemy;
				if(this.player.isStunned()){
					this.player.recoveredFromStun();
				}
				else{
					int choice = this.showPlayerActions();
					switch(choice){
						case 1: this.player.attack(this.enemy); break;
						case 2: this.player.defend(); break;
						case 3: this.inventoryStatus = 1; this.findItems(); break;
					}
					if(choice == 4){
						this.gameOver();
						break;
					}
				}
			}
			else{
				this.firstToMove = this.player;
				if(this.enemy.isStunned()){
					this.enemy.recoveredFromStun();
				}
				else{
					int attackOrDefend = this.random.nextInt(2) + 1;
					if(attackOrDefend == 1)
						this.enemy.attack(this.player);
					else
						this.enemy.defend();
				}
			}
			
			this.player.displayHp();
			this.enemy.displayHp();			
		}
	}

	/**
	 * Use items for the adventurer.
	 */		
	private void useItems(){
		System.out.println("Current Inventory");
		this.player.showInventory();
		int choice = -1;
		
		while(true){
			System.out.println("Which item would you like to use (1-6, or -1 to quit)?");
			choice = this.keyboard.nextInt();
			if((choice == -1) || ((choice >= 1) && (choice <= 6)))
				break;
			else
				System.out.println("Invalid choice! Please input again.");
		}
		
		if(choice != -1){
			System.out.println("1. " + this.player);
			System.out.println("2. " + this.enemy);
			System.out.println("Who do you want to use Health Potion on (1-2)?");
			int target = this.keyboard.nextInt();
			try {
				if(target == 1)
					this.player.use(choice, this.player);
				else
					this.player.use(choice, this.enemy);
			}
			catch(ItemTypeException ite){
				System.out.println("Incorrect item type.");
			}
		}
		else
			this.firstToMove = this.player;
	}	
	
	/**
	 * Drop or remove items for the adventurer.
	 */		
	private void dropItems(){
		System.out.println("Current Inventory");
		this.player.showInventory();
		int choice = -1;
		
		while(true){
			System.out.println("Which item would you like to drop (1-6, or -1 to quit)?");
			choice = this.keyboard.nextInt();
			if((choice == -1) || ((choice >= 1) && (choice <= 6)))
				break;
			else
				System.out.println("Invalid choice! Please input again.");
		}
		
		if(choice != -1){
			Item item = this.player.getItem(choice);
			System.out.println(item);
			System.out.println("Are you sure you want to drop " + item + "(yes/no)?");
			String answer = this.keyboard.next();
			if(answer.equals("yes")){
				this.player.removeItem(choice);
				System.out.println("Item removed");
			}
		}		
	}

	/**
	 * Equip items for the adventurer.
	 */	
	private void equipItems(){
		System.out.println("Current Inventory");
		this.player.showInventory();
		int choice = -1;
		
		while(true){
			System.out.println("Which item would you like to equip (1-6, or -1 to quit)?");
			choice = this.keyboard.nextInt();
			if((choice == -1) || ((choice >= 1) && (choice <= 6)))
				break;
			else
				System.out.println("Invalid choice! Please input again.");
		}
		
		if(choice != -1){
			Item item = this.player.getItem(choice);
			if(item instanceof Armour){
				Armour newArmour = (Armour) item;
				if(this.player.isEquippedArmour()){
					System.out.println("Current Armour");
					System.out.println(this.player.getArmour());					
				}
				System.out.println("New Armour");
				System.out.println(newArmour);
				System.out.println("Are you sure you want to equip " + newArmour +"(yes/no)?");
				String answer = this.keyboard.next();
				if(answer.equals("yes")){
					Armour previousArmour = this.player.equipArmour(newArmour);
					if(previousArmour != null)
						this.player.addItem(previousArmour, choice);
					else
						this.player.destroyItem(choice);
				}
			}
			else if(item instanceof Shield){
				Shield newShield = (Shield) item;
				if(this.player.isEquippedShield()){
					System.out.println("Current Shield");
					System.out.println(this.player.getShield());					
				}
				System.out.println("New Shield");
				System.out.println(newShield);
				System.out.println("Are you sure you want to equip " + newShield +"(yes/no)?");
				String answer = this.keyboard.next();
				if(answer.equals("yes")){
					Shield previousShield = this.player.equipShield(newShield);
					if(previousShield != null)
						this.player.addItem(previousShield, choice);
					else
						this.player.destroyItem(choice);
				}				
			}
			else if(item instanceof Weapon){
				Weapon newWeapon = (Weapon) item;
				if(this.player.isEquippedWeapon()){
					System.out.println("Current Weapon");
					System.out.println(this.player.getWeapon());					
				}
				System.out.println("New Weapon");
				System.out.println(newWeapon);
				System.out.println("Are you sure you want to equip " + newWeapon +"(yes/no)?");
				String answer = this.keyboard.next();
				if(answer.equals("yes")){
					Weapon previousWeapon = this.player.equipWeapon(newWeapon);
					if(previousWeapon != null)
						this.player.addItem(previousWeapon, choice);
					else
						this.player.destroyItem(choice);
				}				
			}
			this.player.showInventory();
		}
	}
	
	/**
	 * In FindItems you will perform some inventory management.
	 * Allow the character to add, remove and equip items.
	 */
	public void findItems(){
		if(this.inventoryStatus == 1) //Use items
			this.useItems();
		else if(this.inventoryStatus == 2) //Drop items
			this.dropItems();
		else if(this.inventoryStatus == 3) //Equip items
			this.equipItems();
	}
	
	/**
	 * This method is the entry point to the game.
	 * This method should be responsible for initializing most of the 
	 * initial items and equipment. The play game method should simply
	 * call the battle() and findItems() methods.
	 * Play game should continue to call these methods while the player is alive.
	 */
	public void playGame(){
		System.out.println("Adventure Game Starts!");
		this.battle();
	}
	
	public static void main(String[] args){
		String playerName = "Player";
		String enemyName = "Computer";
		System.out.println("Welcome to the Adventure Game.");
		System.out.println("What would you like to call the player?");
		BufferedReader stdin = new BufferedReader(new InputStreamReader(System.in));
		try {
			playerName = stdin.readLine();
			System.out.println("And the enemy is?");
			enemyName = stdin.readLine();
		} 
		catch (IOException e) {
			e.printStackTrace();
		}
		
		System.out.println(playerName);
		System.out.println(enemyName);
		
		Adventurer player = new Adventurer(playerName, 1000);
		Adventurer computer = new Adventurer(enemyName, 500);
		
		Game game = new Game(player, computer);
		System.out.println(game.enemy.getArmour());
		System.out.println(game.enemy.getShield());
		System.out.println(game.enemy.getWeapon());
		game.playGame();
	}	
}

