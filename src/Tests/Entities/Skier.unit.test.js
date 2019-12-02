import "babel-polyfill";

import * as Constants from "../../Constants";

import { AssetManager } from "../../Core/AssetManager";
import { Obstacle } from "../../Entities/Obstacles/Obstacle";
import { ObstacleManager } from "../../Entities/Obstacles/ObstacleManager";
import { Powerup } from "../../Entities/Powerups/Powerup";
import { PowerupManager } from "../../Entities/Powerups/PowerupManager";
import { Skier } from "../../Entities/Skier";

describe('Skier tests', () => {
    
    const assetManager = new AssetManager();
    assetManager.loadedAssets = {
        [Constants.SKIER_DOWN]: new Image(64, 64),
        [Constants.TREE]: new Image(64, 64),
        [Constants.TREE_CLUSTER]: new Image(64, 64),
        [Constants.ROCK1]: new Image(64, 64),
        [Constants.ROCK2]: new Image(64, 64),
        [Constants.RAMP]: new Image(64, 64),
        [Constants.POWERUP_PIZZA]: new Image(64, 64),
        [Constants.POWERUP_SHIELD]: new Image(64, 64),
        [Constants.POWERUP_COCOA]: new Image(64, 64),
        [Constants.POWERUP_TROPHY]: new Image(64, 64)
    };
    
    let skier;
    beforeEach(() => {
        skier = new Skier(100, 100);
        skier.setSpeed(10);
    });

    test('constructor', () => {
        expect(skier.getPosition()).toEqual({ x: 100, y:100 });
        expect(skier.getAssetName()).toEqual(Constants.SKIER_DOWN);
        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.DOWN);
        expect(skier.speed).toEqual(10);
        expect(skier.hasImmunity()).toEqual(false);
        expect(skier.collisionEntity).toEqual(null);
        expect(skier.isJumping).toEqual(false);
    });

    test('setDirection to SKIER_DIRECTIONS.LEFT', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT);
        expect(skier.getAssetName()).toEqual(
            Constants.SKIER_DIRECTION_ASSET[Constants.SKIER_DIRECTIONS.LEFT]
        );
    });

    test('setDirection to SKIER_DIRECTIONS.LEFT_DOWN', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
        expect(skier.getAssetName()).toEqual(
            Constants.SKIER_DIRECTION_ASSET[Constants.SKIER_DIRECTIONS.LEFT_DOWN]
        );
    });

    test('setDirection to SKIER_DIRECTIONS.DOWN', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.DOWN);
        expect(skier.getAssetName()).toEqual(
            Constants.SKIER_DIRECTION_ASSET[Constants.SKIER_DIRECTIONS.DOWN]
        );
    });

    test('setDirection to SKIER_DIRECTIONS.RIGHT', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT);
        expect(skier.getAssetName()).toEqual(
            Constants.SKIER_DIRECTION_ASSET[Constants.SKIER_DIRECTIONS.RIGHT]
        );
    });

    test('setDirection to SKIER_DIRECTIONS.RIGHT_DOWN', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        expect(skier.getAssetName()).toEqual(
            Constants.SKIER_DIRECTION_ASSET[Constants.SKIER_DIRECTIONS.RIGHT_DOWN]
        );
    });

    test('setSpeed', () => {
        skier.setSpeed(20);

        expect(skier.speed).toEqual(20);
    });

    test('updateAsset', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
        skier.updateAsset();

        expect(skier.getAssetName()).toEqual(Constants.SKIER_LEFTDOWN);
    });

    test('updateJumpingAsset', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.updateJumpingAsset();

        expect(skier.getAssetName()).toEqual(Constants.SKIER_JUMP_1);
    });

    test('move down', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);

        expect(skier.getPosition()).toEqual({x: 100, y: 100});
        skier.move();
        expect(skier.getPosition()).toEqual({x: 100, y: 110});
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

    test('turnLeft when direction is SKIER_DIRECTIONS.LEFT', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
        skier.turnLeft();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT);
        expect(skier.getPosition()).toEqual({ x: 90, y: 100 });
    });

    test('turnLeft when direction is SKIER_DIRECTIONS.LEFT_DOWN', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
        skier.turnLeft();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT);
        expect(skier.getPosition()).toEqual({ x: 100, y: 100 });
    });

    test('turnLeft when direction is SKIER_DIRECTIONS.DOWN', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.turnLeft();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
        expect(skier.getPosition()).toEqual({ x: 100, y: 100 });
    });

    test('turnLeft when direction is SKIER_DIRECTIONS.RIGHT_DOWN', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        skier.turnLeft();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.DOWN);
        expect(skier.getPosition()).toEqual({ x: 100, y: 100 });
    });

    test('turnLeft when direction is SKIER_DIRECTIONS.RIGHT', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
        skier.turnLeft();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        expect(skier.getPosition()).toEqual({ x: 100, y: 100 });
    });

    test('turnLeft after a crash', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        skier.turnLeft();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT);
        expect(skier.getPosition()).toEqual({ x: 100, y: 100 });
    });

    test('turnRight when direction is SKIER_DIRECTIONS.LEFT', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
        skier.turnRight();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
        expect(skier.getPosition()).toEqual({ x: 100, y: 100 });
    });

    test('turnRight when direction is SKIER_DIRECTIONS.LEFT_DOWN', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
        skier.turnRight();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.DOWN);
        expect(skier.getPosition()).toEqual({ x: 100, y: 100 });
    });

    test('turnRight when direction is SKIER_DIRECTIONS.DOWN', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.turnRight();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        expect(skier.getPosition()).toEqual({ x: 100, y: 100 });
    });

    test('turnRight when direction is SKIER_DIRECTIONS.RIGHT_DOWN', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        skier.turnRight();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT);
        expect(skier.getPosition()).toEqual({ x: 100, y: 100 });
    });

    test('turnRight when direction is SKIER_DIRECTIONS.RIGHT', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
        skier.turnRight();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT);
        expect(skier.getPosition()).toEqual({ x: 110, y: 100 });
    });

    test('turnRight after a crash', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        skier.turnRight();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT);
        expect(skier.getPosition()).toEqual({ x: 100, y: 100 });
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

    test('turnUp when direction is right', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
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

    test('checkIfSkierHitObstacle when there are no obstacles', () => {
        const obstacleManager = new ObstacleManager();
        expect(skier.checkIfSkierHitObstacle(obstacleManager, assetManager)).toEqual(false);
    });

    test('checkIfSkierHitObstacle when skier has immunity', () => {
        const obstacleManager = new ObstacleManager();
        obstacleManager.obstacles.push(new Obstacle(100, 100));
        obstacleManager.obstacles.push(new Obstacle(200, 200));
        
        skier.setImmunity(Constants.SKIER_IMMUNITY_TIME_MS);
        
        expect(skier.checkIfSkierHitObstacle(obstacleManager, assetManager)).toEqual(false);
    });

    test('checkIfSkierHitObstacle when skier and obstacles are far apart', () => {
        const obstacleManager = new ObstacleManager();
        obstacleManager.obstacles.push(new Obstacle(10000, 10000));
        obstacleManager.obstacles.push(new Obstacle(20000, 20000));
        
        expect(skier.checkIfSkierHitObstacle(obstacleManager, assetManager)).toEqual(false);
    });

    test('checkIfSkierHitObstacle when skier and obstacles are close but not colliding', () => {
        const obstacleManager = new ObstacleManager();
        obstacleManager.obstacles.push(new Obstacle(180, 180));
        obstacleManager.obstacles.push(new Obstacle(180, 240));
        
        expect(skier.checkIfSkierHitObstacle(obstacleManager, assetManager)).toEqual(false);
    });

    test('checkIfSkierHitObstacle when skier and an obstacle are colliding', () => {
        const obstacleManager = new ObstacleManager();
        obstacleManager.obstacles.push(new Obstacle(100, 100));
        obstacleManager.obstacles.push(new Obstacle(10000, 10000));
        
        expect(skier.checkIfSkierHitObstacle(obstacleManager, assetManager)).toEqual(true);
    });

    test('checkIfSkierHitPowerup when there is no powerup', () => {
        const powerupManager = new PowerupManager();
        expect(skier.checkIfSkierHitPowerup(powerupManager, assetManager)).toEqual(null);
    });

    test('checkIfSkierHitPowerup when skier and powerups are not colliding', () => {
        const powerupManager = new PowerupManager();
        const powerup = new Powerup(1000, 1000);
        powerup.assetName = Constants.POWERUP_SHIELD;
        powerupManager.powerups.push(powerup);
        
        expect(skier.checkIfSkierHitPowerup(powerupManager, assetManager)).toEqual(null);
    });

    test('checkIfSkierHitPowerup when skier and a powerup are colliding', () => {
        const powerupManager = new PowerupManager();
        const powerup = new Powerup(100, 100);
        powerup.assetName = Constants.POWERUP_SHIELD;
        powerupManager.powerups.push(powerup);
        
        expect(skier.checkIfSkierHitPowerup(powerupManager, assetManager)).toEqual(Constants.POWERUP_SHIELD);
    });
});
