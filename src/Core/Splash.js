const SPLASH_DISPLAY_TIMEOUT_MS = 2000;

/** 
 * Implements a small frame that displays various messages to the user
 */
export class Splash {
    
    /** 
     * @constructor
     * @param {string} className css class to apply to the splash
     * @param {string} message text to display in the splash element 
     */
    constructor(className, message) {
        this.className = className;
        this.createSplash(message);
    }

    /** 
     * Creates the splash div element and adds it to the document
     * @param {string} message text to display in the splash element
     */
    createSplash(message) {
        const splash = document.createElement('div');
        splash.id = "gameSplash";
        splash.className = this.className;
        splash.innerText = message;
        this.splash = document.body.appendChild(splash);
    }

    /** 
     * Shows the splash and optionally auto-hides it after a timeout
     * @param {boolean} autoHide optional parameter - if true splash will be hidden after a timeout
     */
    show(autoHide = false) {
        this.splash.style.display = 'block';
        if (autoHide) {
            setTimeout(() => this.hide(), SPLASH_DISPLAY_TIMEOUT_MS);    
        }
    }

    /** 
     * Hides the splash
     */
    hide() {
        this.splash.style.display = 'none';
    }

    /** 
     * Displays a message in the splash
     * @param {string} message text to display
     * @param {boolean} autoHide optional parameter - if true splash will be hidden after a timeout
     */
    displayMessage(message, autoHide = false) {
        this.splash.innerText = message;
        this.show(autoHide);
    }
}