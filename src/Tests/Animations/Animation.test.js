import { Animation } from "../../Animations/Animation";

describe('Animation tests', () => {
    
    const assets = ['1', '2', '3', '4'];
    test('constructor', () => {
        const animation = new Animation(assets, 10, false);
        expect(animation.frameCounter).toEqual(0);
        expect(animation.maxFrames).toEqual(40);
        expect(animation.framesPerAsset).toEqual(10);
        expect(animation.loop).toEqual(false);
        expect(animation.animationRunning).toEqual(false);
    });

    test('isRunning', () => {
        const animation = new Animation(assets, 10, false);
        animation.start();

        expect(animation.isRunning()).toEqual(true);
    });

    test('nextFrame when frame counter is less than maxFrames and loop is false', () => {
        const animation = new Animation(assets, 10, false);
        animation.start();
        expect(animation.frameCounter).toEqual(0);
        animation.nextFrame();
        expect(animation.frameCounter).toEqual(1);
        animation.nextFrame();
        expect(animation.frameCounter).toEqual(2);
    });

    test('nextFrame when frame counter is less than maxFrames and loop is true', () => {
        const animation = new Animation(assets, 10, true);
        animation.start();
        expect(animation.frameCounter).toEqual(0);
        animation.nextFrame();
        expect(animation.frameCounter).toEqual(1);
        animation.nextFrame();
        expect(animation.frameCounter).toEqual(2);
    });

    test('nextFrame when frame counter is equal to maxFrames and loop is false', () => {
        const animation = new Animation(assets, 10, false);
        animation.start();
        expect(animation.frameCounter).toEqual(0);
        for (let i = 0; i <= animation.maxFrames; i++) {
            animation.nextFrame();
        }
        expect(animation.frameCounter).toEqual(39);
        expect(animation.isRunning()).toEqual(false);
    });

    test('nextFrame when frame counter is equal to maxFrames and loop is true', () => {
        const animation = new Animation(assets, 10, true);
        animation.start();
        expect(animation.frameCounter).toEqual(0);
        for (let i = 0; i < animation.maxFrames; i++) {
            animation.nextFrame();
        }
        expect(animation.frameCounter).toEqual(0);
        expect(animation.isRunning()).toEqual(true);
    });

    test('start', () => {
        const animation = new Animation(assets, 10, true);
        animation.start();
        expect(animation.isRunning()).toEqual(true);
    });

    test('stop when loop is false', () => {
        const animation = new Animation(assets, 10, false);
        animation.start();
        animation.stop();

        expect(animation.isRunning()).toEqual(false);
    });

    test('stop when loop is true', () => {
        const animation = new Animation(assets, 10, true);
        animation.start();
        animation.stop();

        expect(animation.isRunning()).toEqual(true);
        expect(animation.frameCounter).toEqual(0);
    });
});
