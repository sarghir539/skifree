import * as Constants from "../Constants";

import { intersectTwoRects } from "../Core/Utils";

import { Entity } from "./Entity";
import { RhinoRun } from "../Animations/RhinoRun";
import { RhinoEat } from "../Animations/RhinoEat";

export class Rhino extends Entity {
    assetName = Constants.RHINO;
    speed = Constants.RHINO_STARTING_SPEED;
    runAnimation = new RhinoRun();
    eatAnimation = new RhinoEat();
    skierCaught = false;
    
    constructor(x, y) {
        super(x, y);        
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    chase(target) {
        if (this.skierCaught) {
            this.eatAnimation.frame();
            this.assetName = this.eatAnimation.getAsset();
        } else {
            var xDistance = target.x - this.x;
            var yDistance = target.y - this.y;
            var distance = Math.hypot(xDistance, yDistance);
            if (distance) {
                xDistance /= distance;
                yDistance /= distance;
            }

            this.x += xDistance * this.speed;
            this.y += yDistance * this.speed;

            this.runAnimation.frame();
            this.assetName = this.runAnimation.getAsset();
        }
        
    }

    checkIfSkierWasCaught(skier, assetManager) {
        const rhinoBounds = this.getAssetBounds(assetManager);
        const skierBounds = skier.getAssetBounds(assetManager);

        if (intersectTwoRects(rhinoBounds, skierBounds)) {
            this.skierCaught = true;            
        }
        return this.skierCaught;
    };
}