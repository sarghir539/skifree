import * as Constants from '../../Constants';

import { Obstacle } from "./Obstacle";
import { randomInt } from '../../Core/Utils';

const DISTANCE_BETWEEN_OBSTACLES = 100;
const STARTING_OBSTACLE_GAP = 100;
const STARTING_OBSTACLE_REDUCER = 300;
const NEW_OBSTACLE_CHANCE = 8;
const CALCULATE_POSITION_TRIES = 10;

/**
 * Implements a manager for obstacle entities 
 */
export class ObstacleManager {
    obstacles = [];

    /**
     * Returns the current list of obstacles
     * @returns {Array} 
     */
    getObstacles() {
        return this.obstacles;
    }

    /**
     * Renders all obstacles onto the canvas
     * @param {Canvas} canvas current drawing canvas
     * @param {AssetManager} assetManager 
     */
    drawObstacles(canvas, assetManager) {
        this.obstacles.forEach((obstacle) => {
            obstacle.draw(canvas, assetManager);
        });
    }

    /**
     * Generates a number of initial obstacles 
     */
    placeInitialObstacles() {
        const numberObstacles = Math.ceil((Constants.GAME_WIDTH / STARTING_OBSTACLE_REDUCER) * (Constants.GAME_HEIGHT / STARTING_OBSTACLE_REDUCER));

        const minX = -Constants.GAME_WIDTH / 2;
        const maxX = Constants.GAME_WIDTH / 2;
        const minY = STARTING_OBSTACLE_GAP;
        const maxY = Constants.GAME_HEIGHT / 2;

        for(let i = 0; i < numberObstacles; i++) {
            this.placeRandomObstacle(minX, maxX, minY, maxY);
        }

        this.obstacles.sort((obstacle1, obstacle2) => {
            return obstacle1.getPosition().y - obstacle2.getPosition().y;
        });
    }

    /**
     * Generates a new obstacle entity
     * Obstacle position is determined by the current game viewport - if skier is moving to the left
     * the obstacle will be positioned to the left
     * @param {Rect} gameWindow current frame viewport
     * @param {Rect} previousGameWindow previous frame viewport 
     */
    placeNewObstacle(gameWindow, previousGameWindow) {
        const shouldPlaceObstacle = randomInt(1, NEW_OBSTACLE_CHANCE);
        if (shouldPlaceObstacle !== NEW_OBSTACLE_CHANCE) {
            return;
        }

        if (previousGameWindow) {
            if (gameWindow.left < previousGameWindow.left) {
                this.placeObstacleLeft(gameWindow);
            }
            else if (gameWindow.left > previousGameWindow.left) {
                this.placeObstacleRight(gameWindow);
            }
    
            if (gameWindow.top < previousGameWindow.top) {
                this.placeObstacleTop(gameWindow);
            }
            else if (gameWindow.top > previousGameWindow.top) {
                this.placeObstacleBottom(gameWindow);
            }
        }        
    };

    /**
     * Generates a new obstacle and place it randomly to the left of the viewport
     * @param {Rect} gameWindow current frame viewport 
     */
    placeObstacleLeft(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.left, gameWindow.top, gameWindow.bottom);
    }

    /**
     * Generates a new obstacle and place it randomly to the right of the viewport
     * @param {Rect} gameWindow current frame viewport 
     */
    placeObstacleRight(gameWindow) {
        this.placeRandomObstacle(gameWindow.right, gameWindow.right, gameWindow.top, gameWindow.bottom);
    }

    /**
     * Generates a new obstacle and place it randomly to the top of the viewport
     * @param {Rect} gameWindow current frame viewport 
     */
    placeObstacleTop(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.right, gameWindow.top, gameWindow.top);
    }

    /**
     * Generates a new obstacle and place it randomly to the bottom of the viewport
     * @param {Rect} gameWindow current frame viewport 
     */
    placeObstacleBottom(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.right, gameWindow.bottom, gameWindow.bottom);
    }

    /**
     * Generates a new obstacle with a random position inside a specified rectangle
     * @param {number} minX minimum horizontal position
     * @param {number} maxX maximum horizontal position
     * @param {number} minY minimum vertical position
     * @param {number} maxY maximum vertical position
     */
    placeRandomObstacle(minX, maxX, minY, maxY) {
        const position = this.calculateOpenPosition(minX, maxX, minY, maxY, 0);
        if (position) {
            const newObstacle = new Obstacle(position.x, position.y);
            this.obstacles.push(newObstacle);
        }
    }

    /**
     * Finds an open space inside a rectangle to place the new obstacle
     * Obstacles cannot overlap and there needs to be a minimal distance between them
     * @param {number} minX rectangle left position
     * @param {number} maxX rectangle right position
     * @param {number} minY rectangle top position
     * @param {number} maxY rectangle bottom position
     * @param {number} counter number of tries to look for an open space (default 10)
     */
    calculateOpenPosition(minX, maxX, minY, maxY, counter) {
        if (counter > CALCULATE_POSITION_TRIES) {
            return null;
        }
        const x = randomInt(minX, maxX);
        const y = randomInt(minY, maxY);
        
        const foundCollision = this.obstacles.find((obstacle) => {
            return (
                x > (obstacle.x - DISTANCE_BETWEEN_OBSTACLES) &&
                x < (obstacle.x + DISTANCE_BETWEEN_OBSTACLES) &&
                y > (obstacle.y - DISTANCE_BETWEEN_OBSTACLES) &&
                y < (obstacle.y + DISTANCE_BETWEEN_OBSTACLES)
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