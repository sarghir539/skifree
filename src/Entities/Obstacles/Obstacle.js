import * as Constants from "../../Constants";

import { Entity } from "../Entity";
import { randomInt } from '../../Core/Utils';

const assetTypes = [
    Constants.TREE,
    Constants.TREE_CLUSTER,
    Constants.ROCK1,
    Constants.ROCK2,
    Constants.RAMP,
];

export class Obstacle extends Entity {
    constructor(x, y) {
        super(x, y);

        const assetIdx = randomInt(0, assetTypes.length - 1);
        this.assetName = assetTypes[assetIdx];
        this.jumpable = (this.assetName === Constants.ROCK1) || (this.assetName === Constants.ROCK2);
    }

    draw(canvas, assetManager) {
        super.draw(canvas, assetManager, this.assetName === Constants.RAMP ? 2 : 1);
    }
}