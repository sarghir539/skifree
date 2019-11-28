import * as Constants from "../Constants";

import { Animation } from "./Animation";

export const RHINO_EAT_ASSET = [
    Constants.RHINO_EAT_1,
    Constants.RHINO_EAT_2,
    Constants.RHINO_EAT_3,
    Constants.RHINO_EAT_4,
    Constants.RHINO_EAT_5,
    Constants.RHINO_EAT_6
];

export class RhinoEat extends Animation {
    constructor() {
        super(60, 10);
    }

    getAsset() {
        return RHINO_EAT_ASSET[Math.floor(this.frameCounter/this.framesPerAsset)]
    }

}