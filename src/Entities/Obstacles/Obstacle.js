import * as Constants from "../../Constants";

import { Entity } from "../Entity";
import { randomInt } from '../../Core/Utils';

/**
 * Obstacle types 
 */
const assetTypes = [
    Constants.TREE,
    Constants.TREE_CLUSTER,
    Constants.ROCK1,
    Constants.ROCK2,
    Constants.RAMP,
];

/**
 * Implements an entity with a fixed position with no animation that can interract with the skier 
 */
export class Obstacle extends Entity {
    /**
     * @constructor
     * @param {number} x horizontal position
     * @param {number} y vertical position
     */
    constructor(x, y) {
        super(x, y);

        const assetIdx = randomInt(0, assetTypes.length - 1);
        this.assetName = assetTypes[assetIdx];
        this.jumpable = (this.assetName === Constants.ROCK1) || (this.assetName === Constants.ROCK2);
    }

    /**
     * Draws an obstacle onto the canvas
     * Overrides base implementation to zoom in obstacles of type RAMP
     */
    draw(canvas, assetManager) {
        super.draw(canvas, assetManager, this.assetName === Constants.RAMP ? 2 : 1);
    }
}