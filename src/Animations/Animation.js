export class Animation {
    constructor(maxFrames, framesPerAsset, loop) {
        this.maxFrames = maxFrames;
        this.framesPerAsset = framesPerAsset;
        this.loop = loop;
        this.frameCounter = 0;
        this.animationRunning = false;
    }

    getFrameCounter() { 
        return this.frameCounter;
    }

    isRunning() {
        return this.animationRunning;
    }

    frame() {
        this.frameCounter++;
        if (this.frameCounter >= this.maxFrames) {
            this.stop();
        }
    }

    start() {
        this.frameCounter = 0;
        this.animationRunning = true;
    }

    stop() {
        this.frameCounter = 0;
        if (!this.loop) {
            this.animationRunning = false;
        }
    }
}