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

    display(on = true, autoHide = false) {
        this.splash.style.display = on ? 'block' : 'none';
        if (on && autoHide) {
            setTimeout(() => { this.display(false); }, SPLASH_DISPLAY_TIMEOUT_MS);    
        }
    }

    setTitle(title, autoHide = false) {
        this.splash.innerText = title;
        this.display(true, autoHide);
    }
}