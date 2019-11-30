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
        this.frame = 0;
    }

    draw(canvas, assetManager, zoom = 1) {
        const current = this.getPosition();
        if (this.frame < 40) {
            this.y -= 5 * Math.floor(this.frame / 10);
            this.frame++;     
        } else {
            this.frame = 0;
        }
        super.draw(canvas, assetManager, zoom);
        this.y = current.y;
    }
}