import * as Constants from "../Constants";

import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Overlay } from "./Overlay";
import { PowerupManager } from "../Entities/Powerups/PowerupManager";
import { Rect } from './Utils';
import { Rhino } from "../Entities/Rhino";
import { Skier } from "../Entities/Skier";

export class Game {
    gameWindow = null;

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.overlay = new Overlay('overlay', 'overlay-row');
        this.skier = new Skier(0, 0);
        this.rhino = new Rhino(-100, 0);
        this.obstacleManager = new ObstacleManager();
        this.powerupManager = new PowerupManager();
        this.gameState = Constants.GAME_STATE.RUNNING;
        this.score = 0;
        this.skierCaught = false;
        this.lives = Constants.SKIER_STARTING_LIVES;
        
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
        this.overlay.show();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
            this.canvas.clearCanvas();

            this.updateGameWindow();
            this.drawGameWindow();
            if (this.gameState === Constants.GAME_STATE.RUNNING) {
                requestAnimationFrame(this.run.bind(this));
            }
    }

    setLives(lives) {
        this.lives = lives;
        this.overlay.updateLivesInfo(this.lives);
    }
    updateScore(score) {
        this.score += score;
        this.overlay.updateScoreInfo(this.score);
    }

    updateGameWindow() {

        if (this.lives > 0 && !this.skierCaught) {
            const initialPosition = this.skier.getPosition();        
            this.skier.move();
            // update game score based on y distance
            this.updateScore(Math.floor(this.skier.getPosition().y - initialPosition.y));
        }
        
        setTimeout(() => {
            // start rhino chase after a delay
            this.rhino.chase(this.skier.getPosition());
            // if skier was caught set lives to 0
            if (this.rhino.checkIfSkierWasCaught(this.skier, this.assetManager)) {
                this.setLives(0);
                this.skierCaught = true;
            }
        }, Constants.RHINO_CHASE_DELAY_TIME_MS);

        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);
        this.powerupManager.placeNewPowerup(this.gameWindow, previousGameWindow);
        
        if (this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager)) {
            // update lives for each crash - game is over when lives counter reaches 0
            this.setLives(this.lives - 1);
            if (this.lives === 0) {
                this.gameState = Constants.GAME_STATE.OVER;
            }
        }

        if (this.skier.checkIfSkierHitPowerup(this.powerupManager, this.assetManager)) {
            // increase lives counter if powerup was hit
            // TODO: add handling of shield powerup (skier immunity to crash, rhino)
            this.setLives(this.lives + 1);
        }
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

        if (!this.skierCaught) {
            this.skier.draw(this.canvas, this.assetManager);    
        }
        this.rhino.draw(this.canvas, this.assetManager, 2);
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
        }
    }
}