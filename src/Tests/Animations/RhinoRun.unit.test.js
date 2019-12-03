import "babel-polyfill";

import * as Constants from "../../Constants";

import { RhinoRun } from "../../Animations/RhinoRun";

describe('RhinoRun animation tests', () => {
    
    test('constructor', () => {
        const rhinoRunAnimation = new RhinoRun(20);

        expect(rhinoRunAnimation.assets.length).toEqual(2);
        expect(rhinoRunAnimation.frameCounter).toEqual(0);
        expect(rhinoRunAnimation.framesPerAsset).toEqual(20);
        expect(rhinoRunAnimation.loop).toEqual(true);
        expect(rhinoRunAnimation.animationRunning).toEqual(false);
    });

    test('constructor with default parameters', () => {
        const rhinoRunAnimation = new RhinoRun();

        expect(rhinoRunAnimation.assets.length).toEqual(2);
        expect(rhinoRunAnimation.frameCounter).toEqual(0);
        expect(rhinoRunAnimation.framesPerAsset).toEqual(Constants.DEFAULT_FRAMES_PER_ASSET / 2);
        expect(rhinoRunAnimation.loop).toEqual(true);
        expect(rhinoRunAnimation.animationRunning).toEqual(false);
    });
});
