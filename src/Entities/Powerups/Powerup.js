import * as Constants from "../../Constants";

import { AssetManager } from "../../Core/AssetManager";
import { Entity } from "../Entity";
import { randomInt } from '../../Core/Utils';

/**
 * Powerup types 
 */
const assetTypes = [
    Constants.POWERUP_PIZZA,
    Constants.POWERUP_COCOA,
    Constants.POWERUP_SHIELD,
    Constants.POWERUP_TROPHY
];

/**
 * Bounce direction enum 
 */
const bounceDirection = {
    UP: 1,
    DOWN: -1
}

/**
 * Implements an entity with a fixed position with a bouncing animation that can interact with the skier
 * The interaction effect depends on the powerup type 
 */
export class Powerup extends Entity {
    /**
     * @constructor
     * @param {number} x horizontal position
     * @param {number} y vertical position
     */
    constructor(x, y) {
        super(x, y);

        const assetIdx = randomInt(0, assetTypes.length - 1);
        this.assetName = assetTypes[assetIdx];
        this.bounceFrame = 0;
        this.bounceDirection = bounceDirection.UP;
    }

    /**
     * Draws an asset using a bouncing animation between current vertical position and a specified height
     * @param {Canvas} canvas current drawing canvas
     * @param {AssetManager} assetManager 
     * @param {number} bounceHeight max bouncing height
     * @param {number} zoom zoom factor - default 1
     */
    // draw an image bouncing vertically between 0 and bounceHeight
    bounce(canvas, assetManager, bounceHeight, zoom = 1) {
        const asset = assetManager.getAsset(this.assetName);
        if (!asset) {
            console.log(`INVALID ASSET: ${this.assetName}`);
            return;
        }
        const drawX = this.x - asset.width / 2;
        const drawY = this.y - asset.height / 2  - Math.floor(this.bounceFrame / 2);
        if (this.bounceDirection === bounceDirection.UP) {
            if (this.bounceFrame === bounceHeight) {
                this.bounceDirection = bounceDirection.DOWN;
            }
            this.bounceFrame++;
        } else {
            if (this.bounceFrame === 0) {
                this.bounceDirection = bounceDirection.UP;
            }
            this.bounceFrame--;
        }

        canvas.drawImage(asset, drawX, drawY, zoom * asset.width, zoom * asset.height);
    }
}