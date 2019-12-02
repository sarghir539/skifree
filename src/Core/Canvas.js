/** 
 * Implements image drawing functionality using a 2d canvas element 
 */
export class Canvas {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    drawOffset = {
        x: 0,
        y: 0
    };
    ctx = null;

    /**
     * @constructor
     * @param {number} width canvas width
     * @param {number} height canvas height
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.createCanvas();
    }

    /**
     * Creates a canvas element and appends it to DOM
     */
    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = "skiCanvas";
        canvas.width = this.width * window.devicePixelRatio;
        canvas.height = this.height * window.devicePixelRatio;
        canvas.style.width = this.width + 'px';
        canvas.style.height = this.height + 'px';

        this.ctx = canvas.getContext("2d");
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        document.body.appendChild(canvas);
    }

    /**
     * Clears canvas contents
     */
    clearCanvas() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    /**
     * Sets the draw offset
     * @param {number} x horizontal position
     * @param {number} y vertical position
     */
    setDrawOffset(x, y) {
        this.drawOffset.x = x;
        this.drawOffset.y = y;
    }

    /**
     * Draws an image onto the canvas
     * @param {object} image element to draw into the canvas context
     * @param {number} x image horizontal position
     * @param {number} y image vertical position
     * @param {number} width image width
     * @param {number} height image height
     */
    drawImage(image, x, y, width, height) {
        x -= this.drawOffset.x;
        y -= this.drawOffset.y;

        this.ctx.drawImage(image, x, y, width, height);
    }
}