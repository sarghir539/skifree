import * as Constants from "../Constants";

const OVERLAY_FIELDS = {
    TITLE: 0,
    SCORE: 1,
    LIVES: 2    
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
        this.addInfoRow(OVERLAY_FIELDS.TITLE, 'SkiFree');
        this.addInfoRow(OVERLAY_FIELDS.SCORE, 'SCORE', 0);
        this.addInfoRow(OVERLAY_FIELDS.LIVES, 'LIVES', Constants.SKIER_STARTING_LIVES);
    }

    show(display = true) {
        this.overlay.style.display = display ? 'block' : 'none';
    }

    addInfoRow(id, name, value = '') {
        const newRow = document.createElement('div');
        newRow.className = this.rowClassName;
        newRow.id = id;
        newRow.innerText = `${name}${value ? ': ': ''}${value}`;
        this.overlay.appendChild(newRow);
    }

    updateInfoRow(id, name, value) {
        const infoRow = document.getElementById(id);
        infoRow.innerText = `${name}: ${value}`;
    }

    updateScoreInfo(score) {
        this.updateInfoRow(OVERLAY_FIELDS.SCORE, 'SCORE', score);
    }

    updateLivesInfo(lives) {
        this.updateInfoRow(OVERLAY_FIELDS.LIVES, 'LIVES', lives);
    }
}