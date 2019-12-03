import "babel-polyfill";

import * as Constants from "../../Constants";

import { Jump } from "../../Animations/Jump";

describe('Jump animation tests', () => {
    
    test('constructor', () => {
        const jumpAnimation = new Jump(20, true);

        expect(jumpAnimation.assets.length).toEqual(4);
        expect(jumpAnimation.frameCounter).toEqual(0);
        expect(jumpAnimation.framesPerAsset).toEqual(20);
        expect(jumpAnimation.loop).toEqual(true);
        expect(jumpAnimation.animationRunning).toEqual(false);
    });

    test('constructor with default loop flag', () => {
        const jumpAnimation = new Jump(30);

        expect(jumpAnimation.assets.length).toEqual(4);
        expect(jumpAnimation.frameCounter).toEqual(0);
        expect(jumpAnimation.framesPerAsset).toEqual(30);
        expect(jumpAnimation.loop).toEqual(false);
        expect(jumpAnimation.animationRunning).toEqual(false);
    });

    test('constructor with all default parameters', () => {
        const jumpAnimation = new Jump();

        expect(jumpAnimation.assets.length).toEqual(4);
        expect(jumpAnimation.frameCounter).toEqual(0);
        expect(jumpAnimation.framesPerAsset).toEqual(Constants.DEFAULT_FRAMES_PER_ASSET);
        expect(jumpAnimation.loop).toEqual(false);
        expect(jumpAnimation.animationRunning).toEqual(false);
    });
});
