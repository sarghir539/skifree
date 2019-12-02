import * as Constants from "../Constants";

import { Entity } from "./Entity";
import { RhinoEat } from "../Animations/RhinoEat";
import { RhinoRun } from "../Animations/RhinoRun";
import { intersectTwoRects } from "../Core/Utils";

/**
 * Implements logic for a moving entity that chases the skier
 * Uses two different animations: run and eat 
 */
export class Rhino extends Entity {
    assetName = Constants.RHINO;
    speed = Constants.RHINO_STARTING_SPEED;
    skierCaught = false;
    
    /**
     * @constructor
     * @param {number} x horizontal position
     * @param {number} y vertical position
     */ 
    constructor(x, y) {
        super(x, y);
        this.runAnimation = new RhinoRun();
        this.eatAnimation = new RhinoEat();   
    }

    /**
     * Sets the rhino speed
     * @param {number} speed new speed value
     */
    setSpeed(speed) {
        this.speed = speed;
    }

    /**
     * Selects the rhino asset based on the current chase state
     * When the chase is on and the skier was not caught the rhino will display the run animation
     * When the skier is caught the rhino will display the eat animation 
     * @param {Skier} skier skier entity
     */
    chase(skier) {
        // if skier is caught display the eat animation
        if (this.skierCaught) {
            this.eatAnimation.nextFrame();
            this.assetName = this.eatAnimation.getAsset();
        } else {
            const target = skier.getPosition();
            // find the sortest distance between the current rhino position and the target(skier) position 
            let xDistance = target.x - this.x;
            let yDistance = target.y - this.y;
            const distance = Math.hypot(xDistance, yDistance);
            if (distance) {
                xDistance /= distance;
                yDistance /= distance;
            }

            // update rhino position based on distance to skier and its current speed
            this.x += xDistance * this.speed;
            this.y += yDistance * this.speed;

            // display the run animation
            this.runAnimation.nextFrame();
            this.assetName = this.runAnimation.getAsset();
        }
        
    }

    /**
     * Verifies if skier was caught
     * @param {Skier} skier skier entity
     * @param {AssetManager} assetManager
     */
    checkIfSkierWasCaught(skier, assetManager) {
        const rhinoBounds = this.getAssetBounds(assetManager);
        const skierBounds = skier.getAssetBounds(assetManager);

        if (intersectTwoRects(rhinoBounds, skierBounds)) {
            this.skierCaught = true;            
        }
        return this.skierCaught;
    };
}