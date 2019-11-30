import * as Constants from "../Constants";

import { Animation } from "./Animation";

const RHINO_RUN_ASSETS = [
    Constants.RHINO_RUN_1,
    Constants.RHINO_RUN_2
];

export class RhinoRun extends Animation {
    constructor(speed = Constants.DEFAULT_FRAMES_PER_ASSET / 2, loop = true) {
        super(RHINO_RUN_ASSETS, speed, loop);
    }
}