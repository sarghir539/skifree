import * as Constants from "../Constants";

import { Entity } from "./Entity";
import { Jump } from "../Animations/Jump";
import { intersectTwoRects } from "../Core/Utils";

/**
 * Implements logic for a moving entity that can be controlled by the user
 * Can crash into obstacles, pick up powerups and use jumping animation 
 */
export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;
    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;
    immunity = false;
    collisionEntity = null;
    isJumping = false;
    
    /**
     * @constructor
     * @param {number} x horizontal position
     * @param {number} y vertical position
     */
    constructor(x, y) {
        super(x, y);
        this.jumpAnimation = new Jump();
    }

    /**
     * Sets the current skier direction and updates the asset correspondingly
     * @param {number} direction new direction
     */
    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    /**
     * Sets the skier speed
     * @param {number} speed new speed value
     */
    setSpeed(speed) {
        this.speed = speed;
    }

    /**
     * Makes the skier immune to obstacle crashing for a duration
     * @param {number} duration immunity duration 
     */
    setImmunity(duration) {
        this.immunity = true;
        setTimeout(() => { this.immunity = false; }, duration)
    }

    /**
     * Checks if the skier is immune to obstacle crashing
     * @returns {boolean} 
     */
    hasImmunity() {
        return this.immunity;
    }
    
    /**
     * Updates the skier asset based on the current direction
     */
    updateAsset() {
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

    /**
     * Updates the skier asset based on the current jump animation frame
     */
    updateJumpingAsset() {
        this.assetName = this.jumpAnimation.getAsset();
    }

    /**
     * Updates the skier position based on user actions
     */
    move() {
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }

        // update skier asset for the jumping sequence        
        if (this.isJumping) {
            this.jumpAnimation.nextFrame();
            if (this.jumpAnimation.isRunning()) {
                this.updateJumpingAsset();
            } else {
                this.isJumping = false;
                this.updateAsset();
            }
        }
    }

    /**
     * Moves the skier to the left
     */
    moveSkierLeft() {
        this.x -= this.speed;
    }

    /**
     * Moves the skier to the left and down
     */
    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    /**
     * Moves the skier down
     */
    moveSkierDown() {
        this.y += this.speed;
    }

    /**
     * Moves the skier to the right and down
     */
    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    /**
     * Moves the skier to the right
     */
    moveSkierRight() {
        this.x += this.speed;
    }

    /**
     * Moves the skier up
     */
    moveSkierUp() {
        this.y -= this.speed;
    }

    /**
     * Turn skier to the left
     */
    turnLeft() {
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        }
        else {
            if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
                this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);    
            } else {
                this.setDirection(this.direction - 1);
            }            
        }
    }

    /**
     * Turn skier to the right
     */
    turnRight() {
        if (this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        }
        else {
            if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
                this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);    
            } else {
                this.setDirection(this.direction + 1);
            }            
        }
    }

    /**
     * Turn skier up
     */
    turnUp() {
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    /**
     * Turn skier down
     */
    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    /**
     * Starts jumping animation
     */
    jumpStart() {
        this.jumpAnimation.start();
        this.isJumping = true;
    }

    /**
     * Verifies if skier hit any obstacle
     * @param {ObstacleManager} obstacleManager
     * @param {AssetManager} assetManager
     */
    checkIfSkierHitObstacle(obstacleManager, assetManager) {

        // skip check if skier has immunity
        if (this.hasImmunity()) {
            return false;
        }
            
        // get skier bounds
        const skierBounds = this.getAssetBounds(assetManager);
        
        const collision = obstacleManager.getObstacles().find((obstacle) => {
            // skip collision check if there is already a collision with the same entity
            if (this.collisionEntity &&
                this.collisionEntity.getIdentifier() === obstacle.getIdentifier()) {
                return false;
            }
            // get obstacle bounds
            const obstacleBounds = obstacle.getAssetBounds(assetManager);

            // check for skier-obstacle collision
            if (intersectTwoRects(skierBounds, obstacleBounds)) {
                this.collisionEntity = obstacle;
                return true;
            }
            return false;
        });

        // process collision
        if (collision) {
            // if obstacle is a ramp - jump
            if (this.collisionEntity.getAssetName() === Constants.RAMP) {
                this.jumpStart();
            } else {
                // if skier is not jumping or obstacle is not jumpable - crash
                if (!this.isJumping || !this.collisionEntity.jumpable) {
                    this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
                    return true;
                }
            }
        }
        return false;
    };

    /**
     * Verifies if skier picked up any powerups
     * @param {PowerupManager} powerupManager
     * @param {AssetManager} assetManager
     */
    checkIfSkierHitPowerup(powerupManager, assetManager) {
        const skierBounds = this.getAssetBounds(assetManager);
        const hitPowerup = powerupManager.getPowerups().find((powerup) => {
            const powerupBounds = powerup.getAssetBounds(assetManager);
            return intersectTwoRects(skierBounds, powerupBounds);
        });
        if (hitPowerup) {
            // remove powerup if picked up
            powerupManager.removePowerup(hitPowerup);
            return hitPowerup.getAssetName();
        }
        return null;
    };

    /**
     * Overrides draw method to render a double size skier if it has immunity 
     * @param {Canvas} canvas current canvas
     * @param {AssetManager} assetManager
     */
    draw(canvas, assetManager) {
        super.draw(canvas, assetManager, this.hasImmunity() ? 2 : 1);
    }
}