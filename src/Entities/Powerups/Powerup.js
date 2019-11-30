import * as Constants from "../../Constants";

import { Entity } from "../Entity";
import { randomInt } from '../../Core/Utils';

const assetTypes = [
    Constants.POWERUP_PIZZA,
    Constants.POWERUP_COCOA,
    Constants.POWERUP_SHIELD
];

export class Powerup extends Entity {
    constructor(x, y) {
        super(x, y);

        const assetIdx = randomInt(0, assetTypes.length - 1);
        this.assetName = assetTypes[assetIdx];
        this.frame = 0;
    }
}