import "babel-polyfill";

import { AssetManager } from "../../Core/AssetManager";
import { Entity } from "../../Entities/Entity";
import { Rect } from '../../Core/Utils';

describe('Entity tests', () => {
    
    const assetManager = new AssetManager();
    assetManager.loadedAssets = {
        [1]: new Image(64, 64),
        [2]: new Image(64, 64),
        [3]: new Image(64, 64)
    };
    let entity;
    beforeEach(() => {
        entity = new Entity(100, 100);
    });

    test('constructor', () => {
        expect(entity.getPosition()).toEqual({ x: 100, y:100 });
    });

    test('getAssetName', () => {
        entity.assetName = '1';
        expect(entity.getAssetName()).toEqual('1');
    });
    
    test('getPosition', () => {
        entity.x = 200;
        entity.y = 200;

        expect(entity.getPosition()).toEqual({x: 200, y: 200});
    });

    test('getAssetBounds', () => {
        entity.assetName = '1';
        entity.setPosition(100, 100);
        expect(entity.getAssetBounds(assetManager)).toEqual(new Rect(68, 68, 132, 132));
    });

    test('getIdentifier', () => {
        entity.assetName = 'test'; 
        expect(entity.getIdentifier()).toEqual('test_100_100');
    });

    test('draw image', () => {
        //TODO
    });
});
