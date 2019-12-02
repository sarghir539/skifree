import { Powerup } from "./Powerup";
import { randomInt } from '../../Core/Utils';

const DISTANCE_BETWEEN_POWERUPS = 200;
const NEW_POWERUP_CHANCE = 100;
const BOUNCE_DISTANCE = 40; // bounce height in px

/**
 * Implements a manager for powerup entities 
 */
export class PowerupManager {
    powerups = [];

    /**
     * Returns the current list of powerups
     * @returns {Array} 
     */
    getPowerups() {
        return this.powerups;
    }

    /**
     * Removes the specified powerup from the list
     * @param {Powerup} powerup 
     */
    removePowerup(powerup) {
        this.powerups = this.powerups.filter(p => p.getIdentifier() !== powerup.getIdentifier());
    }

    /**
     * Renders all powerups onto the canvas
     * @param {Canvas} canvas current drawing canvas
     * @param {AssetManager} assetManager 
     */
    drawPowerups(canvas, assetManager) {
        this.powerups.forEach((powerup) => {
            powerup.bounce(canvas, assetManager, BOUNCE_DISTANCE);
        });
    }

    /**
     * Generates a new powerup entity
     * Powerup position is determined by the current game viewport - if skier is moving to the left
     * the powerup will be positioned to the left of the viewport
     * @param {Rect} gameWindow current frame viewport
     * @param {Rect} previousGameWindow previous frame viewport 
     */
    placeNewPowerup(gameWindow, previousGameWindow) {
        const shouldPlacePowerup = randomInt(1, NEW_POWERUP_CHANCE);
        if (shouldPlacePowerup !== NEW_POWERUP_CHANCE) {
            return;
        }

        if (previousGameWindow) {
            if (gameWindow.left < previousGameWindow.left) {
                this.placeRandomPowerup(gameWindow.left, gameWindow.left, gameWindow.top, gameWindow.bottom);
            }
            else if (gameWindow.left > previousGameWindow.left) {
                this.placeRandomPowerup(gameWindow.right, gameWindow.right, gameWindow.top, gameWindow.bottom);
            }
    
            if (gameWindow.top < previousGameWindow.top) {
                this.placeRandomPowerup(gameWindow.left, gameWindow.right, gameWindow.top, gameWindow.top);
            }
            else if (gameWindow.top > previousGameWindow.top) {
                this.placeRandomPowerup(gameWindow.left, gameWindow.right, gameWindow.bottom, gameWindow.bottom);
            }
        }        
    };

    /**
     * Generates a new powerup with a random position inside a specified rectangle
     * @param {number} minX minimum horizontal position
     * @param {number} maxX maximum horizontal position
     * @param {number} minY minimum vertical position
     * @param {number} maxY maximum vertical position
     */
    placeRandomPowerup(minX, maxX, minY, maxY) {
        const position = this.calculateOpenPosition(minX, maxX, minY, maxY, 0);
        if (position) {
            const newPowerup = new Powerup(position.x, position.y);
            this.powerups.push(newPowerup);
        }
    }

    /**
     * Finds an open space inside a rectangle to place the new powerup
     * powerups cannot overlap and there needs to be a minimal distance between them
     * @param {number} minX rectangle left position
     * @param {number} maxX rectangle right position
     * @param {number} minY rectangle top position
     * @param {number} maxY rectangle bottom position
     * @param {number} counter number of tries to look for an open space (default 10)
     */
    calculateOpenPosition(minX, maxX, minY, maxY, counter) {
        if (counter > 10) {
            return null;
        }
        const x = randomInt(minX, maxX);
        const y = randomInt(minY, maxY);
        
        const foundCollision = this.powerups.find((powerup) => {
            return (
                x > (powerup.x - DISTANCE_BETWEEN_POWERUPS) &&
                x < (powerup.x + DISTANCE_BETWEEN_POWERUPS) &&
                y > (powerup.y - DISTANCE_BETWEEN_POWERUPS) &&
                y < (powerup.y + DISTANCE_BETWEEN_POWERUPS)
            );
        });

        if (foundCollision) {
            return this.calculateOpenPosition(minX, maxX, minY, maxY, counter + 1);
        }
        else {
            return {
                x: x,
                y: y
            };
        }
    }
}