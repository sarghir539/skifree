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

export class Game {
    gameWindow = null;

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.overlay = new Overlay('overlay', 'overlay-row');
        this.splash = new Splash('splash', `Press 'S' to start`); 
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    // reset all game data to initial values
    init() {
        this.skier = new Skier(0, 0);
        this.rhino = null;
        this.score = 0;
        this.skierCaught = false;
        this.chaseStarted = false;
        this.lives = Constants.SKIER_STARTING_LIVES;
        this.gameState = Constants.GAME_STATE.NOT_STARTED;
        this.startTime = 0;
        
        this.obstacleManager = new ObstacleManager();
        this.obstacleManager.placeInitialObstacles();

        this.powerupManager = new PowerupManager();
        
        this.overlay.show();
        cancelAnimationFrame(this.requestAnimationId);
    }

    // load assets
    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    // THE game loop 
    run() {
        this.canvas.clearCanvas();

        this.updateGameWindow();
        this.drawGameWindow();

        if (this.gameState === Constants.GAME_STATE.RUNNING) {
            this.requestAnimationId = requestAnimationFrame(this.run.bind(this));
        }
    }

    // (re)start game
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

    // creates or returns an existing rhino entity
    getRhino() {
        if (!this.rhino) {
            this.rhino = new Rhino(this.skier.getPosition().x, this.skier.getPosition().y - 200);
        }
        return this.rhino;
    }

    isChaseStarted() {
        const currentTime = performance.now();
        return currentTime - this.startTime > Constants.RHINO_CHASE_DELAY_TIME_MS;
    }

    // update game logic
    updateGameWindow() {
        if (this.gameState === Constants.GAME_STATE.RUNNING) {
            if (this.lives > 0 && !this.skierCaught) {
                const initialPosition = this.skier.getPosition();
                this.skier.move();
                // update game score based on y distance
                this.score += Math.floor(this.skier.getPosition().y - initialPosition.y);
            }
            
            // start rhino chase after a delay
            if (this.isChaseStarted()) {
                this.getRhino().chase(this.skier.getPosition());
                // if skier was caught set lives to 0
                if (this.getRhino().checkIfSkierWasCaught(this.skier, this.assetManager)) {
                    this.lives = 0;
                    this.skierCaught = true;
                    this.splash.displayInfo("GAME OVER!");
                }
            }    
        }
        
        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);
        this.powerupManager.placeNewPowerup(this.gameWindow, previousGameWindow);
        
        // check for obstacle collision unless skier has immunity to crashes
        if (!this.skier.hasImmunity() && this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager)) {
            // update lives for each crash - game is over when lives counter reaches 0
            this.lives--;
            if (this.lives === 0) {
                this.gameState = Constants.GAME_STATE.OVER;
                this.splash.displayInfo("GAME OVER!");
            }
        }

        const powerup = this.skier.checkIfSkierHitPowerup(this.powerupManager, this.assetManager) 
        if (powerup) {
            // update game state based on powerup
            this.handlePowerup(powerup);
        }

        this.overlay.updateGameInfo(this);
    }

    handlePowerup(powerup) {
        switch (powerup) {
            case Constants.POWERUP_COCOA:
            case Constants.POWERUP_PIZZA:
                // extra life
                if (this.lives < Constants.SKIER_STARTING_LIVES) {
                    this.lives++;
                    this.splash.displayInfo("EXTRA LIFE!", true);
                }
                break;
            case Constants.POWERUP_SHIELD:
                // immunity to crashes
                this.skier.setImmunity(Constants.SKIER_IMMUNITY_TIME_MS);
                this.splash.displayInfo(`CRASH IMMUNITY!`, true);
                break;
            case Constants.POWERUP_TROPHY:
                // extra score
                this.score += 10000;
                this.splash.displayInfo("EXTRA POINTS!", true);
                break;            
        }
    }

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

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    togglePause() {
        this.gameState = (this.gameState === Constants.GAME_STATE.PAUSED
            ? Constants.GAME_STATE.RUNNING
            : Constants.GAME_STATE.PAUSED);
        this.run();    
    }

    toggleOverlay() {
        this.overlay.toggle();
    }

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