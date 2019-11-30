import * as Constants from "../Constants";

const OVERLAY_FIELDS = {
    TITLE: 0,
    SCORE: 1,
    LIVES: 2,
    CHASE: 3,
    KEYMAPPING: 4
};

export class Overlay {
    
    constructor(className, rowClassName) {
        this.className = className;
        this.rowClassName = rowClassName;

        this.createOverlay();
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = "gameOverlay";
        overlay.className = this.className;
        
        this.overlay = document.body.appendChild(overlay);
        this.addInfoHeader(OVERLAY_FIELDS.TITLE, 'SkiFree');
        this.addSeparator();
        this.addInfoRow(OVERLAY_FIELDS.LIVES, 'Lives', Constants.SKIER_STARTING_LIVES);
        this.addInfoRow(OVERLAY_FIELDS.SCORE, 'Score', 0);
        this.addInfoRow(OVERLAY_FIELDS.CHASE, 'Chase starts', `${Constants.RHINO_CHASE_DELAY_TIME_MS / 1000} sec`);
        this.addSeparator();
        this.addInfoRow(OVERLAY_FIELDS.KEYMAPPING, 'Key Mapping');
        this.addInfoRow(OVERLAY_FIELDS.KEYMAPPING, 'ARROW KEYS', 'Move');
        this.addInfoRow(OVERLAY_FIELDS.KEYMAPPING, 'SPACE', 'Jump');
        this.addInfoRow(OVERLAY_FIELDS.KEYMAPPING, 'S', 'Start Game');
        this.addInfoRow(OVERLAY_FIELDS.KEYMAPPING, 'P', 'Pause Game');
        this.addInfoRow(OVERLAY_FIELDS.KEYMAPPING, 'C', 'Toggle Overlay');
    }

    show(on = true) {
        this.overlay.style.display = on ? 'block' : 'none';
    }

    toggle() {
        if (this.overlay.style.display === 'none') {
            this.overlay.style.display = 'block';
        } else {
            this.overlay.style.display = 'none';
        }
        
    }

    addInfoHeader(id, name) {
        const newRow = document.createElement('h2');
        newRow.className = this.rowClassName;
        newRow.id = id;
        newRow.innerText = `${name}`;
        this.overlay.appendChild(newRow);
    }

    addInfoRow(id, name, value = '') {
        const newRow = document.createElement('div');
        newRow.className = this.rowClassName;
        newRow.id = id;
        newRow.innerText = `${name}${value !== undefined ? ': ': ''}${value !== undefined ? value : ''}`;
        this.overlay.appendChild(newRow);
    }

    addSeparator() {
        const separator = document.createElement('hr');
        this.overlay.appendChild(separator);
    }
    updateInfoRow(id, name, value) {
        const infoRow = document.getElementById(id);
        infoRow.innerText = `${name}${value !== undefined ? ': ': ''}${value !== undefined ? value : ''}`;
    }

    updateScoreInfo(score) {
        this.updateInfoRow(OVERLAY_FIELDS.SCORE, 'Score', score);
    }

    updateLivesInfo(lives) {
        this.updateInfoRow(OVERLAY_FIELDS.LIVES, 'Lives', lives);
    }

    updateGameInfo(game) {
        this.updateScoreInfo(game.score);
        this.updateLivesInfo(game.lives);

        const timePassed = performance.now() - game.startTime;
        if (timePassed > Constants.RHINO_CHASE_DELAY_TIME_MS) {
            this.updateInfoRow(OVERLAY_FIELDS.CHASE, 'Rhino is chasing!');    
        } else {
            this.updateInfoRow(OVERLAY_FIELDS.CHASE, 'Chase starts in', 
            `${Math.ceil((Constants.RHINO_CHASE_DELAY_TIME_MS - timePassed) / 1000)} sec`);
        }
    }
}