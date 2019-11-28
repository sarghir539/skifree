import "babel-polyfill";
import * as Constants from "../../Constants";
import { Rhino } from "../../Entities/Rhino";

describe('Rhino tests', () => {
    
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
        rhino.chase({x: 200, y: 200});

        expect(rhino.getPosition().x).toBeCloseTo(170.71, 2);
        expect(rhino.getPosition().y).toBeCloseTo(170.71, 2);
        expect(rhino.assetName).toEqual(Constants.RHINO_RUN_1);
    });
});
