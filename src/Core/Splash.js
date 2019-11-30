const SPLASH_DISPLAY_TIMEOUT_MS = 3000;

export class Splash {
    
    constructor(className, title) {
        this.className = className;
        this.createSplash(title);
    }

    createSplash(title) {
        const splash = document.createElement('div');
        splash.id = "gameSplash";
        splash.className = this.className;
        splash.innerText = title;
        this.splash = document.body.appendChild(splash);
    }

    show(autoHide = false) {
        this.splash.style.display = 'block';
        if (autoHide) {
            setTimeout(() => this.hide(), SPLASH_DISPLAY_TIMEOUT_MS);    
        }
    }

    hide() {
        this.splash.style.display = 'none';
    }

    displayInfo(info, autoHide = false) {
        this.splash.innerText = info;
        this.show(autoHide);
    }
}