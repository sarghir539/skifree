/** 
 * Class that implements asset management functionality 
 * asyncronous asset loading and asset lookup 
 */
export class AssetManager {
    loadedAssets = [];

    /**
     * Loads an array of assets asynchronously
     * @param {Array} assets array of assets to load
     */
    async loadAssets(assets) {
        const assetPromises = [];

        for (const [assetName, assetUrl] of Object.entries(assets)) {
            const assetPromise = this.loadSingleAsset(assetUrl, assetName);
            assetPromises.push(assetPromise);
        }

        await Promise.all(assetPromises);
    }

    /**
     * Loads a single asset asynchronously
     * @param {string} assetUrl url of asset to load
     * @param {string} assetName name of asset to load
     */
    loadSingleAsset(assetUrl, assetName) {
        return new Promise((resolve) => {
            const assetImage = new Image();
            assetImage.onload = () => {
                assetImage.width /= 2;
                assetImage.height /= 2;

                this.loadedAssets[assetName] = assetImage;
                resolve();
            };
            assetImage.src = assetUrl;
        });
    }

    /**
     * Returns the asset with the specified name 
     * @param {string} assetName asset to lookup
     */
    getAsset(assetName) {
        return this.loadedAssets[assetName];
    }
}