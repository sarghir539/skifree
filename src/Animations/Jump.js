import * as Constants from "../Constants";

import { Animation } from "./Animation";

const SKIER_JUMPING_ASSETS = [
    Constants.SKIER_JUMP_1,
    Constants.SKIER_JUMP_2,
    Constants.SKIER_JUMP_3,
    Constants.SKIER_JUMP_4
];

export class Jump extends Animation {
    constructor(speed = Constants.DEFAULT_FRAMES_PER_ASSET, loop = false) {
        super(SKIER_JUMPING_ASSETS, speed, loop);
    }
}