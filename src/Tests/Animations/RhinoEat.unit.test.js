import "babel-polyfill";

import * as Constants from "../../Constants";

import { RhinoEat } from "../../Animations/RhinoEat";

describe('RhinoEat animation tests', () => {
    
    test('constructor', () => {
        const rhinoEatAnimation = new RhinoEat(20, true);

        expect(rhinoEatAnimation.assets.length).toEqual(6);
        expect(rhinoEatAnimation.frameCounter).toEqual(0);
        expect(rhinoEatAnimation.framesPerAsset).toEqual(20);
        expect(rhinoEatAnimation.loop).toEqual(true);
        expect(rhinoEatAnimation.animationRunning).toEqual(false);
    });

    test('constructor with default loop flag', () => {
        const rhinoEatAnimation = new RhinoEat(30);

        expect(rhinoEatAnimation.assets.length).toEqual(6);
        expect(rhinoEatAnimation.frameCounter).toEqual(0);
        expect(rhinoEatAnimation.framesPerAsset).toEqual(30);
        expect(rhinoEatAnimation.loop).toEqual(false);
        expect(rhinoEatAnimation.animationRunning).toEqual(false);
    });

    test('constructor with all default parameters', () => {
        const rhinoEatAnimation = new RhinoEat();

        expect(rhinoEatAnimation.assets.length).toEqual(6);
        expect(rhinoEatAnimation.frameCounter).toEqual(0);
        expect(rhinoEatAnimation.framesPerAsset).toEqual(Constants.DEFAULT_FRAMES_PER_ASSET);
        expect(rhinoEatAnimation.loop).toEqual(false);
        expect(rhinoEatAnimation.animationRunning).toEqual(false);
    });
});
