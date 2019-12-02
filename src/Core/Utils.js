/** 
 * Generates a random number between a minimum and a maximum value
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @returns {number}
 */
export function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 
 * Verifies if two rectangles surfaces intersect
 * @param {Rect} rect1 first rectangle
 * @param {Rect} rect2 second rectangle
 * @returns {boolean}
 */
export function intersectTwoRects(rect1, rect2) {
    return !(rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top);
}

/** 
 * Defines a rectangle class as a set of 4 coordinates: left, top, right, bottom
 */
export class Rect {
    left = 0;
    top = 0;
    right = 0;
    bottom = 0;

    /** 
     * @constructor
     * @param {number} left left coordinate
     * @param {number} top top coordinate
     * @param {number} right right coordinate
     * @param {number} bottom bottom coordinate
     */
    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
}