import * as Constants from "../Constants";

import { Animation } from "./Animation";

export const RHINO_RUN_ASSET = [
    Constants.RHINO_RUN_1,
    Constants.RHINO_RUN_2
];

export class RhinoRun extends Animation {
    constructor() {
        super(20, 10);
    }

    getAsset() {
        return RHINO_RUN_ASSET[Math.floor(this.frameCounter/this.framesPerAsset)]
    }

}