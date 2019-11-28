import * as Constants from "../Constants";

import { Rect, intersectTwoRects } from "../Core/Utils";

import { Entity } from "./Entity";
import { Jump } from "../Animations/Jump";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;
    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;
    collisionEntity = null;
    isJumping = false;
    jumpAnimation = new Jump();
    
    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    updateAsset() {
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

    // ARG: update jumping asset based on the current asset from jump animation
    updateJumpingAsset() {
        this.assetName = this.jumpAnimation.getAsset();
    }

    move() {
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }

        // ARG: update skier asset for the jumping sequence        
        if (this.isJumping) {
            this.jumpAnimation.frame();
            if (this.jumpAnimation.isRunning()) {
                this.updateJumpingAsset();
            } else {
                this.isJumping = false;
                this.updateAsset();
            }
        }
    }

    moveSkierLeft() {
        this.x -= this.speed;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += this.speed;
    }

    moveSkierUp() {
        this.y -= this.speed;
    }

    turnLeft() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        }
        else {
            if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
                this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);    
            } else {
                this.setDirection(this.direction - 1);
            }            
        }
    }

    turnRight() {
        if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        }
        else {
            if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
                this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);    
            } else {
                this.setDirection(this.direction + 1);
            }            
        }
    }

    turnUp() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    // ARG: start jumping animation
    jumpStart() {
        this.jumpAnimation.start();
        this.isJumping = true;
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        const skierBounds = this.getAssetBounds(assetManager);
        const collision = obstacleManager.getObstacles().find((obstacle) => this.getCollision(skierBounds, obstacle, assetManager));
        if (collision) {
            // if obstacle is a ramp - jump
            if (this.collisionEntity.getAssetName() === Constants.RAMP) {
                this.jumpStart();
            } else {
                // if skier is not jumping or obstacle is not jumpable - crash
                if (!this.isJumping || !this.collisionEntity.jumpable) {
                    this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
                    return true;
                }
            }
        }
        return false;
    };

    // detect skier/obstacle collision
    getCollision(skierBounds, obstacle, assetManager) {
        const obstacleBounds = obstacle.getAssetBounds(assetManager);
            
        // check for collision only if there isn't already an existing collision 
        if (!this.collisionEntity || 
            (this.collisionEntity &&
            this.collisionEntity.getIdentifier() !== obstacle.getIdentifier())) {
                const isCollision = intersectTwoRects(skierBounds, obstacleBounds);
                if (isCollision) {
                    this.collisionEntity = obstacle;
                }
                return isCollision;
            }
        return false;
    }
}