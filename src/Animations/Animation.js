export class Animation {
    constructor(assets, framesPerAsset, loop) {
        this.framesPerAsset = framesPerAsset;
        this.loop = loop;
        this.frameCounter = 0;
        this.animationRunning = false;
        this.assets = assets;
        this.maxFrames = framesPerAsset * assets.length;
    }

    isRunning() {
        return this.animationRunning;
    }

    getAsset() {
        return this.assets[Math.floor(this.frameCounter/this.framesPerAsset)]
    }

    nextFrame() {
        if (this.frameCounter >= this.maxFrames - 1) {
            this.stop();
        } else {
            this.frameCounter++;
        }
    }

    start() {
        this.frameCounter = 0;
        this.animationRunning = true;
    }

    stop() {
        if (this.loop) {
            this.frameCounter = 0;
        } else {
            this.animationRunning = false;
        }
    }
}