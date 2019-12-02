import "babel-polyfill";

import * as Constants from "../../Constants";

import { AssetManager } from "../../Core/AssetManager";
import { Rhino } from "../../Entities/Rhino";
import { Skier } from "../../Entities/Skier";

describe('Rhino tests', () => {
    
    const assetManager = new AssetManager();
    assetManager.loadedAssets = {
        ['skierDown']: new Image(64, 64),
        ['rhino']: new Image(64, 64)
    };
    
    let rhino;
    beforeEach(() => {
        rhino = new Rhino(100, 100);
        rhino.setSpeed(100);
    });

    test('constructor', () => {
        expect(rhino.getPosition()).toEqual({ x: 100, y:100 });
    });

    test('setSpeed', () => {
        rhino.setSpeed(20);

        expect(rhino.speed).toEqual(20);
    });
    
    test('chase', () => {
        const skier = new Skier(200, 200);
        rhino.chase(skier);

        expect(rhino.getPosition().x).toBeCloseTo(170.71, 2);
        expect(rhino.getPosition().y).toBeCloseTo(170.71, 2);
        expect(rhino.assetName).toEqual(Constants.RHINO_RUN_1);
    });

    test('checkIfSkierWasCaught when rhino and skier are far apart', () => {
        const skier = new Skier(10000, 10000);
        
        expect(rhino.checkIfSkierWasCaught(skier, assetManager)).toEqual(false);
    });

    test('checkIfSkierWasCaught when rhino and skier are close but not colliding', () => {
        const skier = new Skier(180, 180);
        
        expect(rhino.checkIfSkierWasCaught(skier, assetManager)).toEqual(false);
    });

    test('checkIfSkierWasCaught when rhino and skier bounds are intersecting', () => {
        const skier = new Skier(120, 120);
        
        expect(rhino.checkIfSkierWasCaught(skier, assetManager)).toEqual(true);
    });
});
