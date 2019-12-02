import * as Constants from "../Constants";

import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Overlay } from "./Overlay";
import { PowerupManager } from "../Entities/Powerups/PowerupManager";
import { Rect } from './Utils';
import { Rhino } from "../Entities/Rhino";
import { Skier } from "../Entities/Skier";
import { Splash } from "./Splash";
import { randomInt } from '../Core/Utils';

/** 
 * Class that implements the game logic
 * maintains the game loop
 * updates the game state (lives, score)
 * updates information displayed to user through the game overlay and the splash screen 
 * handles keyboard events and translates them into game actions 
 */
export class Game {
    gameWindow = null;

    /** 
     * @constructor Game 
     */
    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.overlay = new Overlay('overlay', 'overlay-row');
        this.splash = new Splash('splash', Constants.SPLASH_MESSAGES.START_GAME); 
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.gameState = Constants.GAME_STATE.NOT_STARTED;
    }

    /** 
     * Resets all game data to initial values 
     */
    init() {
        // make sure this is not called mre than once before starting a new game
        if (this.gameState === Constants.GAME_STATE.INITIALIZED) {
            return;
        }
        this.skier = new Skier(0, 0);
        this.rhino = null;
        this.score = 0;
        this.skierCaught = false;
        this.chaseStarted = false;
        this.lives = Constants.SKIER_STARTING_LIVES;
        this.gameState = Constants.GAME_STATE.INITIALIZED;
        this.startTime = performance.now();
        
        this.obstacleManager = new ObstacleManager();
        this.obstacleManager.placeInitialObstacles();

        this.powerupManager = new PowerupManager();
        
        this.overlay.show();
        cancelAnimationFrame(this.requestAnimationId);
    }

    /** 
     * Load all game assets 
     */
    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    /** 
     * THE game loop 
     */
    run() {
        this.canvas.clearCanvas();

        this.updateGameWindow();
        this.drawGameWindow();

        if (this.gameState === Constants.GAME_STATE.RUNNING) {
            this.requestAnimationId = requestAnimationFrame(this.run.bind(this));
        }
    }

    /** 
     * Starts or restarts the game  
     */
    start() {
        // reset game data
        this.init();
        // hide splash screen
        this.splash.hide();
        // record start time (we need this to know when to start the rhino chase)
        this.startTime = performance.now();
        // set game state to RUNNING
        this.gameState = Constants.GAME_STATE.RUNNING;
        // and start game loop
        this.run();
    }

    /** 
     * Returns an existing Rhino entity or creates one if it doesn't exist
     * Note: Rhino entity is not rendered until the chase starts so it 
     * doesn't need to be created when game starts 
     * @returns {Rhino}
     */
    getRhino() {
        if (!this.rhino) {
            this.rhino = new Rhino(this.skier.getPosition().x, this.skier.getPosition().y - 200);
        }
        return this.rhino;
    }

    /** 
     * Returns true if the rhino chase started
     * It is based on the difference between the current game time and the start game time
     * @returns {boolean}    
     */
    isChaseStarted() {
        const currentTime = performance.now();
        return currentTime - this.startTime > Constants.RHINO_CHASE_DELAY_TIME_MS;
    }

    /** 
     * Updates the game score
     * @param {number} addedScore  
     */
    updateScore(addedScore) {
        this.score += addedScore;
    }

    /** 
     * Updates the game state each frame  
     */
    updateGameWindow() {
        if (this.gameState === Constants.GAME_STATE.RUNNING) {
            // move skier only if lives is greater than 0 and skier was not caught
            if (this.lives > 0 && !this.skierCaught) {
                const initialPosition = this.skier.getPosition();
                this.skier.move();
                // update game score based on the y distance
                this.updateScore(Math.floor(this.skier.getPosition().y - initialPosition.y))
            }
            
            // start rhino chase after a delay
            if (this.isChaseStarted()) {
                this.getRhino().chase(this.skier.getPosition());
                // if skier is caught set lives to 0, display splash info
                if (this.getRhino().checkIfSkierWasCaught(this.skier, this.assetManager)) {
                    this.lives = 0;
                    this.skierCaught = true;
                    this.splash.displayMessage(Constants.SPLASH_MESSAGES.GAME_OVER);
                }
            }    
        }
        
        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        // try to place a new obstacle
        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);
        // try to place a new powerup
        this.powerupManager.placeNewPowerup(this.gameWindow, previousGameWindow);
        
        // check for obstacle collision - unless skier has immunity to crashes
        if (!this.skier.hasImmunity() &&
            this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager)) {
            // update lives for each crash - game is over when lives counter reaches 0
            this.lives--;
            // if lives counter reaches 0 it's game over, otherwise display a random crash splash message
            if (this.lives === 0) {
                this.gameState = Constants.GAME_STATE.OVER;
                this.splash.displayMessage(Constants.SPLASH_MESSAGES.GAME_OVER);
            } else { 
                const index = randomInt(0, Constants.CRASH_MESSAGES.length - 1);
                this.splash.displayMessage(Constants.CRASH_MESSAGES[index], true);
            }
        }

        // check for powerup collision
        const powerup = this.skier.checkIfSkierHitPowerup(this.powerupManager, this.assetManager) 
        if (powerup) {
            // update game state based on the powerup that was hit
            this.handlePowerup(powerup);
        }

        // update game overlay with the current game data
        this.overlay.updateGameInfo(this);
    }

    /** 
     * Updates the game state when a powerup is hit
     * @param {string} powerup
     */
    handlePowerup(powerup) {
        switch (powerup) {
            case Constants.POWERUP_COCOA:
            case Constants.POWERUP_PIZZA:
                // give one extra life
                if (this.lives < Constants.SKIER_STARTING_LIVES) {
                    this.lives++;
                    this.splash.displayMessage(Constants.SPLASH_MESSAGES.EXTRA_LIFE, true);
                }
                break;
            case Constants.POWERUP_SHIELD:
                // set immunity to crashes
                this.skier.setImmunity(Constants.SKIER_IMMUNITY_TIME_MS);
                this.splash.displayMessage(Constants.SPLASH_MESSAGES.CRASH_IMMUNITY, true);
                break;
            case Constants.POWERUP_TROPHY:
                // give extra score
                this.updateScore(Constants.POWERUP_TROPHY_POINTS);
                this.splash.displayMessage(Constants.SPLASH_MESSAGES.EXTRA_POINTS, true);
                break;            
        }
    }

    /** 
     * Draws game entities on canvas for each frame
     */
    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

        if (!this.skierCaught) {
            this.skier.draw(this.canvas, this.assetManager);    
        }
        if (this.isChaseStarted()) {
            this.getRhino().draw(this.canvas, this.assetManager, 2);
        }
        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
        this.powerupManager.drawPowerups(this.canvas, this.assetManager);
    }

    /** 
     * Calculates the game viewport based on skier current position
     */
    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    /** 
     * Pause/unpause the game 
     */
    togglePause() {
        this.gameState = (this.gameState === Constants.GAME_STATE.PAUSED
            ? Constants.GAME_STATE.RUNNING
            : Constants.GAME_STATE.PAUSED);
        this.run();    
    }

    /** 
     * Toggle the game info overlay on or off 
     */
    toggleOverlay() {
        this.overlay.toggle();
    }

    /** 
     * Handles keyboard events by translating them into game actions
     * @param {KeyboardEvent} event
     */
    handleKeyDown(event) {
        switch(event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                event.preventDefault();
                break;
            case Constants.KEYS.SPACE:
                this.skier.jumpStart();
                event.preventDefault();
                break;
            case Constants.KEYS.P:
                this.togglePause();
                event.preventDefault();
                break;
            case Constants.KEYS.C:
                this.toggleOverlay();
                event.preventDefault();
                break;
            case Constants.KEYS.S:
                this.start();
                event.preventDefault();
                break;                
        }
    }
}