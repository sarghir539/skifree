/** 
* Base class that implements the logic to render an array of assets in sequence
* Extended classes will provide the specific asset list 
*/
export class Animation {
    /**
    * @constructor
    * @param {Array} assets: array of assets to render
    * @param {number} framesPerAsset: number of frames to render each asset
    * @param {boolean} loop: flag to run the animation in a loop
    */
    constructor(assets, framesPerAsset, loop) {
        this.framesPerAsset = framesPerAsset;
        this.loop = loop;
        this.frameCounter = 0;
        this.animationRunning = false;
        this.assets = assets;
        this.maxFrames = framesPerAsset * assets.length;
    }

    /**
    * Returns true if animation is running, false otherwise
    * @returns {boolean}
    */
    isRunning() {
        return this.animationRunning;
    }

    /**
    * Returns the asset name corresponding to the current frame
    * @returns {string}
    */
    getAsset() {
        return this.assets[Math.floor(this.frameCounter/this.framesPerAsset)]
    }

    /**
    * Updates animation frame counter
    * Stops animation if the counter is equal to the max number of frames 
    */
    nextFrame() {
        if (this.frameCounter >= this.framesPerAsset * this.assets.length - 1) {
            this.stop();
        } else {
            this.frameCounter++;
        }
    }

    /**
    * Starts animation by setting the frame counter to 0
    */
    start() {
        this.frameCounter = 0;
        this.animationRunning = true;
    }

    /**
    * Stops animation if loop is false or sets the frame counter to 0 if it's true
    */
    stop() {
        if (this.loop) {
            this.frameCounter = 0;
        } else {
            this.animationRunning = false;
        }
    }
}