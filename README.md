# Ceros Ski Code Challenge

Welcome to the Ceros Code Challenge - Ski Edition!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here: 
http://ceros-ski.herokuapp.com/  

Or deploy it locally by running:
```
npm install
npm run dev
```

There is no exact time limit on this challenge and we understand that everyone has varying levels of free time. We'd 
rather you take the time and produce a solution up to your ability than rush and turn in a suboptimal challenge. Please 
look through the requirements below and let us know when you will have something for us to look at. If anything is 
unclear, don't hesitate to reach out.

**Requirements**

* **Fix a bug:**

  There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it.
  * Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  * Expected Result: The skier gets up and is facing to the left
  * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)
  
* **Write unit tests:**

  The base code has Jest, a unit testing framework, installed. Write some unit tests to ensure that the above mentioned
  bug does not come back.
  
* **Extend existing functionality:**

  We want to see your ability to extend upon a part of the game that already exists. Add in the ability for the skier to 
  jump. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included some jump 
  trick assets if you wanted to get really fancy!
  * Have the skier jump by either pressing a key or use the ramp asset to have the skier jump whenever he hits a ramp.
  * The skier should be able to jump over some obstacles while in the air. 
    * Rocks can be jumped over
    * Trees can NOT be jumped over
  * Anything else you'd like to add to the skier's jumping ability, go for it!
   
* **Build something new:**

  Now it's time to add something completely new. In the original Ski Free game, if you skied for too long, 
  a yeti would chase you down and eat you. In Ceros Ski, we've provided assets for a Rhino to run after the skier,
  catch him and eat him.
  * The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.
  * If the rhino catches the skier, it's game over and the rhino should eat the skier. 

* **Documentation:**

  * Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
  * Provide a way for us to view the completed code and run it, either locally or through a cloud provider
  
* **Be original:**  
  * This should go without saying but don’t copy someone else’s game implementation!

**Grading** 

Your challenge will be graded based upon the following:

* How well you've followed the instructions. Did you do everything we said you should do?
* The quality of your code. We have a high standard for code quality and we expect all code to be up to production 
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
* The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
* The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
* How well you document your solution. We want to know what you did and why you did it.

**Bonus**

*Note: You won’t be marked down for excluding any of this, it’s purely bonus.  If you’re really up against the clock, 
make sure you complete all of the listed requirements and to focus on writing clean, well organized, and well documented 
code before taking on any of the bonus.*

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing 
how creative candidates get with this.
 
* Provide a way to reset the game once it's over
* Provide a way to pause and resume the game
* Add a score that increments as the skier skis further
* Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
* Deploy the game to a server so that we can play it without having to install it locally
* Write more unit tests for your code

We are looking forward to see what you come up with!


*************************************************

CHANGELOG

** 11/27/2019 **
* Bug fix: Fixed an issue in Skier.turnLeft() method where direction became invalid (-1) after a skier crashed and was moved to the left
* Bug fix: Fixed an issue in Skier.turnRight() to properly handle direction change after skier crashed and was moved to the right
* Added unit tests for Skier
* Added Animation class as a base class for all assets that need to be rendered in a sequence
* Added Jump as a Skier animation
* Added a new Ramp obstacle
* Added the ability for Skier to jump over some obstacles
* Added the ability for Skier to auto-jump when reaching a ramp
* Added a new entity Rhino to start chasing the skier after 10 seconds
* Added RhinoEat as a Rhino animation
* Added RhinoRun as a Rhino animation
* Added unit tests for Rhino
* Bug fix: added a counter property to ObstacleManager.calculateOpenPosition() to avoid infinite loops


** 11/28/2019 **
* Added pause functionality toggled by pressing the 'P' key
* Added game Overlay to display basic game info
* Added score to the game (based on distance)
* Added lives counter to the game (initially 10)
* Added zoom functionality for drawing assets
* Rhino is now twice as big (and twice as scary!)
* Added Animation unit tests

** 11/29/2019 **
* Added Powerup entities and a PowerupManager to the game
* Ramp is now twice as big to allow for easier jumps
* Added functionality to toggle the game overlay on and off by pressing the 'C' key
* Added ability to start and restart the game by pressing the 'S' key
* Rhino is now rendered on screen right behind the skier when the chase starts  
* Added Splash class to display dynamic game information (powerup, game over, etc)

** 11/30/2019 **
* Added a new trophy powerup to give extra scoring points when picked up
* Powerups are now displayed using a new bouncy animation

** 12/01/2019 **
* Known issue: sometimes obstacles are displayed too close and will be counted as multiple hits which causes the lives counter to drop to 0 almost instantly
* Known issue: skier and rhino speed decrease after the game is running for some time. This is unintended.
* Added some extra comments to the code
* Displayed extra information in the game overlay: shield immunity status and the collected trophy count

** 12/02/2019 **
* Added JSDoc style comments to all classes and functions
* Added many extra unit tests
* Fixed various issues affecting functionality:
  * overflowing app content is now hidden (no scrollbars anywhere)
  * increased the minimum distance between obstacles to make sure they are not too close together
* Removed unused code and cleaned some functions to make them more readable