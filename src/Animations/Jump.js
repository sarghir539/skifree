import * as Constants from "../Constants";

import { Animation } from "./Animation";

const SKIER_JUMPING_ASSETS = [
    Constants.SKIER_JUMP_1,
    Constants.SKIER_JUMP_2,
    Constants.SKIER_JUMP_3,
    Constants.SKIER_JUMP_4
];

/**
 * Animation class for skier jumping
 * Renders assets in a non-loop sequence using the default frame speed
 */
export class Jump extends Animation {
    /**
     * @constructor
     * @param {number} speed animation speed as frames per asset
     * @param {boolean} loop flag to set animation to a loop - default false
     */
    constructor(speed = Constants.DEFAULT_FRAMES_PER_ASSET, loop = false) {
        super(SKIER_JUMPING_ASSETS, speed, loop);
    }
}