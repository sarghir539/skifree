import "babel-polyfill";

import { AssetManager } from "../../Core/AssetManager";
import { Entity } from "../../Entities/Entity";
import { Rect } from '../../Core/Utils';

describe('Entity tests', () => {
    
    const assetManager = new AssetManager();
    assetManager.loadedAssets = {
        [1]: new Image(200, 200),
        [2]: new Image(300, 300),
        [3]: new Image(400, 400)
    };
    assetManager.loadSingleAsset()
    let entity;
    beforeEach(() => {
        entity = new Entity(100, 100);
    });

    test('constructor', () => {
        expect(entity.getPosition()).toEqual({ x: 100, y:100 });
    });

    test('getAssetName', () => {
        entity.assetName = 'test';
        expect(entity.getAssetName()).toEqual('test');
    });
    
    test('getPosition', () => {
        entity.x = 200;
        entity.y = 200;

        expect(entity.getPosition()).toEqual({x: 200, y: 200});
    });

    test('getAssetBounds', () => {
        entity.assetName = '1'; 
        expect(entity.getAssetBounds(assetManager)).toEqual(new Rect(0, 0, 200, 200));
    });

    test('getIdentifier', () => {
        entity.assetName = 'test'; 
        expect(entity.getIdentifier()).toEqual('test_100_100');
    });

    test('draw image', () => {
        //TODO
    });
});
