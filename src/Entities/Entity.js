import { Rect } from "../Core/Utils";

/**
 * Base class for all game entities
 */
export class Entity {
    x = 0;
    y = 0;

    assetName = '';

    /**
     * @constructor
     * @param {number} x entity horizontal position
     * @param {number} y entity vertical position
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Returns the name of the entity asset
     * @returns {string}
     */
    getAssetName() {
        return this.assetName;
    }

    /**
     * Returns the current position of the asset
     * @returns {object}
     */
    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    /**
     * Returns the bounds of the asset
     * @param {AssetManager} assetManager
     * @returns {Rect}
     */
    getAssetBounds(assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        if (!asset) {
            console.log(`INVALID ASSET: ${this.assetName}`);
            return;
        }
        return new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y + asset.height / 2
        );
    }

    /**
     * Returns an identifier for of the asset based on the asset name and current position
     * Although it does not guarantee uniqueness, it should reasonably identify entities
     * @returns {string}
     */
    getIdentifier() {
        return `${this.assetName}_${this.x}_${this.y}`;
    }

    /**
     * Renders the current entity asset
     * @param {Canvas} canvas current canvas
     * @param {AssetManager} assetManager
     * @param {number} zoom multiplier factor for asset width and height - default 1
     */
    draw(canvas, assetManager, zoom = 1) {
        const asset = assetManager.getAsset(this.assetName);
        if (!asset) {
            console.log(`INVALID ASSET: ${this.assetName}`);
            return;
        }
        const drawX = this.x - asset.width / 2;
        const drawY = this.y - asset.height / 2;

        canvas.drawImage(asset, drawX, drawY, zoom * asset.width, zoom * asset.height);
    }
}