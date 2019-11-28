import { Rect } from "../Core/Utils";

export class Entity {
    x = 0;
    y = 0;

    assetName = '';

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getAssetName() {
        return this.assetName;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    getAssetBounds(assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        return new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y + asset.height / 2
        );
    }

    // entity identifier based on asset name and current position
    // although this does not guarantee uniqueness, it should reasonably identify entities
    getIdentifier() {
        return `${this.assetName}.${this.x}.${this.y}`;
    }

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