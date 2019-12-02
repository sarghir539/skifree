import * as Constants from "../Constants";

import { Animation } from "./Animation";

const RHINO_RUN_ASSETS = [
    Constants.RHINO_RUN_1,
    Constants.RHINO_RUN_2
];

/**
 * Animation that depicts the rhino running
 * Uses assets rendered in a loop
 */
export class RhinoRun extends Animation {
    /**
     * @constructor
     * @param {number} speed animation speed as frames per asset
     */
    constructor(speed = Constants.DEFAULT_FRAMES_PER_ASSET / 2) {
        super(RHINO_RUN_ASSETS, speed, true);
    }
}