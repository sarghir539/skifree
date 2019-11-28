import * as Constants from "../../Constants";

import { Skier } from "../../Entities/Skier";

describe('Skier tests', () => {
    
    let skier;
    beforeEach(() => {
        skier = new Skier(100, 100);
        skier.setSpeed(10);
    });

    test('constructor', () => {
        expect(skier.getPosition()).toEqual({ x: 100, y:100 });
    });

    test('setDirection', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.DOWN);
    });

    test('setSpeed', () => {
        skier.setSpeed(20);

        expect(skier.speed).toEqual(20);
    });

    test('updateAsset', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.updateAsset();

        expect(skier.getAssetName()).toEqual(Constants.SKIER_DOWN);
    });

    test('updateJumpingAsset', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.updateJumpingAsset();

        expect(skier.getAssetName()).toEqual(Constants.SKIER_JUMP_1);
    });

    test('move down', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);

        expect(skier.getPosition().y).toEqual(100);
        skier.move();
        expect(skier.getPosition().y).toEqual(110);
    });

    test('move left-down', () => {
        const diagonalXY = skier.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);

        expect(skier.getPosition()).toEqual({ x: 100, y: 100 });
        skier.move();
        expect(skier.getPosition()).toEqual({ x: 100 - diagonalXY, y: 100 + diagonalXY });
    });

    test('move right-down', () => {
        const diagonalXY = skier.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);

        expect(skier.getPosition()).toEqual({ x: 100, y: 100 });
        skier.move();
        expect(skier.getPosition()).toEqual({ x: 100 + diagonalXY, y: 100 + diagonalXY });
    });

    test('moveSkierLeft', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        skier.moveSkierLeft();

        expect(skier.getPosition()).toEqual({ x: 90, y: 100 });
    });

    test('moveSkierRight', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        skier.moveSkierRight();

        expect(skier.getPosition()).toEqual({ x: 110, y: 100 });
    });

    test('moveSkierUp', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        skier.moveSkierUp();

        expect(skier.getPosition()).toEqual({ x: 100, y: 90 });
    });

    test('turnLeft when direction is down and there is no crash', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.turnLeft();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
    });

    test('turnLeft after a crash', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        skier.turnLeft();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT);
    });

    test('turnLeft when direction is already left', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
        skier.turnLeft();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT);
        expect(skier.getPosition()).toEqual({ x: 90, y: 100 });
    });

    test('turnRight when direction is down and there is no crash', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.turnRight();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
    });

    test('turnRight after a crash', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        skier.turnRight();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT);
    });

    test('turnRight when direction is already right', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
        skier.turnRight();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT);
        expect(skier.getPosition()).toEqual({ x: 110, y: 100 });
    });

    test('turnUp when direction is down', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.turnUp();

        expect(skier.getPosition()).toEqual({ x: 100, y: 100 });
    });

    test('turnUp when direction is left', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
        skier.turnUp();

        expect(skier.getPosition()).toEqual({ x: 100, y: 90 });
    });

    test('turnDown', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
        skier.turnDown();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.DOWN);        
    });

    test('jumpStart', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.jumpStart();

        expect(skier.isJumping).toEqual(true);        
    });
});
