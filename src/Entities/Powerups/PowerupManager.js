import { Powerup } from "./Powerup";
import { randomInt } from '../../Core/Utils';

const DISTANCE_BETWEEN_POWERUPS = 100000;
const NEW_POWERUP_CHANCE = 300;
const BOUNCE_DISTANCE = 40; // bounce height in px

export class PowerupManager {
    powerups = [];

    constructor() {
    }

    getPowerups() {
        return this.powerups;
    }

    removePowerup(powerup) {
        this.powerups = this.powerups.filter(p => p.getIdentifier() !== powerup.getIdentifier());
    }

    drawPowerups(canvas, assetManager) {
        this.powerups.forEach((powerup) => {
            powerup.bounce(canvas, assetManager, BOUNCE_DISTANCE);
        });
    }

    placeNewPowerup(gameWindow, previousGameWindow) {
        const shouldPlacePowerup = randomInt(1, NEW_POWERUP_CHANCE);
        if(shouldPlacePowerup !== NEW_POWERUP_CHANCE) {
            return;
        }

        if (previousGameWindow) {
            if(gameWindow.left < previousGameWindow.left) {
                this.placeRandomPowerup(gameWindow.left, gameWindow.left, gameWindow.top, gameWindow.bottom);
            }
            else if(gameWindow.left > previousGameWindow.left) {
                this.placeRandomPowerup(gameWindow.right, gameWindow.right, gameWindow.top, gameWindow.bottom);
            }
    
            if(gameWindow.top < previousGameWindow.top) {
                this.placeRandomPowerup(gameWindow.left, gameWindow.right, gameWindow.top, gameWindow.top);
            }
            else if(gameWindow.top > previousGameWindow.top) {
                this.placeRandomPowerup(gameWindow.left, gameWindow.right, gameWindow.bottom, gameWindow.bottom);
            }
        }        
    };

    placeRandomPowerup(minX, maxX, minY, maxY) {
        const position = this.calculateOpenPosition(minX, maxX, minY, maxY, 0);
        if (position) {
            const newPowerup = new Powerup(position.x, position.y);
            this.powerups.push(newPowerup);
        }
    }

    calculateOpenPosition(minX, maxX, minY, maxY, counter) {
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

        if(foundCollision && counter < 10) {
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