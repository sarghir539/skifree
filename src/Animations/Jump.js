import * as Constants from "../Constants";

import { Animation } from "./Animation";

export const SKIER_JUMPING_ASSET = [
    Constants.SKIER_JUMP_1,
    Constants.SKIER_JUMP_2,
    Constants.SKIER_JUMP_3,
    Constants.SKIER_JUMP_4
];

export class Jump extends Animation {
    constructor() {
        super(40, 10);
    }

    getAsset() {
        return SKIER_JUMPING_ASSET[Math.floor(this.frameCounter/this.framesPerAsset)]
    }

}