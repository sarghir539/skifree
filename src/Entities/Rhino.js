import * as Constants from "../Constants";

import { Entity } from "./Entity";
import { RhinoEat } from "../Animations/RhinoEat";
import { RhinoRun } from "../Animations/RhinoRun";
import { intersectTwoRects } from "../Core/Utils";

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
            this.eatAnimation.nextFrame();
            this.assetName = this.eatAnimation.getAsset();
        } else {
            let xDistance = target.x - this.x;
            let yDistance = target.y - this.y;
            const distance = Math.hypot(xDistance, yDistance);
            if (distance) {
                xDistance /= distance;
                yDistance /= distance;
            }

            this.x += xDistance * this.speed;
            this.y += yDistance * this.speed;

            this.runAnimation.nextFrame();
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