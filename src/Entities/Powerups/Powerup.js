import * as Constants from "../../Constants";

import { Entity } from "../Entity";
import { randomInt } from '../../Core/Utils';

const assetTypes = [
    Constants.POWERUP_PIZZA,
    Constants.POWERUP_COCOA,
    Constants.POWERUP_SHIELD,
    Constants.POWERUP_TROPHY
];

export class Powerup extends Entity {
    constructor(x, y) {
        super(x, y);

        const assetIdx = randomInt(0, assetTypes.length - 1);
        this.assetName = assetTypes[assetIdx];
        this.bounceFrame = 0;
        this.bounceDirection = 1;
    }

    // draw an image bouncing vertically between 0 and bouncHeight
    bounce(canvas, assetManager, bounceHeight, zoom = 1) {
        const asset = assetManager.getAsset(this.assetName);
        if (!asset) {
            console.log(`INVALID ASSET: ${this.assetName}`);
            return;
        }
        const drawX = this.x - asset.width / 2;
        const drawY = this.y - asset.height / 2  - Math.floor(this.bounceFrame / 2);
        if (this.bounceDirection === 1) {
            if (this.bounceFrame === bounceHeight) {
                this.bounceDirection = -1;
            }
            this.bounceFrame++;
        } else {
            if (this.bounceFrame === 0) {
                this.bounceDirection = 1;
            }
            this.bounceFrame--;
        }

        canvas.drawImage(asset, drawX, drawY, zoom * asset.width, zoom * asset.height);
    }
}