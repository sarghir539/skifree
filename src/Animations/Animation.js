export class Animation {
    constructor(maxFrames, framesPerAsset, loop) {
        this.maxFrames = maxFrames;
        this.framesPerAsset = framesPerAsset;
        this.loop = loop;
        this.frameCounter = 0;
        this.animationRunning = false;
    }

    isRunning() {
        return this.animationRunning;
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