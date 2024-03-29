import * as Constants from "../Constants";

import { Animation } from "./Animation";

const RHINO_EAT_ASSETS = [
    Constants.RHINO_EAT_1,
    Constants.RHINO_EAT_2,
    Constants.RHINO_EAT_3,
    Constants.RHINO_EAT_4,
    Constants.RHINO_EAT_5,
    Constants.RHINO_EAT_6
];

/**
 * Animation that depicts the rhino eating the skier
 */
export class RhinoEat extends Animation {
    /**
     * @constructor
     * @param {number} speed animation speed as frames per asset
     * @param {boolean} loop flag to set animation to a loop - default false
     */
    constructor(speed = Constants.DEFAULT_FRAMES_PER_ASSET, loop = false) {
        super(RHINO_EAT_ASSETS, speed, loop);
    }
}