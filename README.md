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
