import * as Constants from "../Constants";

/**
 * Overlay field types
 */
const OVERLAY_FIELDS = {
    TITLE: 0,
    SCORE: 1,
    LIVES: 2,
    CHASE: 3,
    KEYMAPPING: 4,
    POWERUPS: 5,
    POWERUP_SHIELD: 6,
    POWERUP_TROPHY: 7
};

//TODO: move all strings displayed in the overlay into a separate structure
 
/** 
 * Displays game information into a div overlay with appearance controlled through css styles
 */
export class Overlay {
    
    /** 
     * @constructor
     * @param {string} className css class to apply to the overlay
     * @param {string} rowClassName css class to apply to the overlay info row
     */
    constructor(className, rowClassName) {
        this.className = className;
        this.rowClassName = rowClassName;

        this.createOverlay();
    }

    /** 
     * Creates the overlay div element and adds it to the document
     */
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
        this.addInfoRow(OVERLAY_FIELDS.KEYMAPPING, 'Move', 'ARROW KEYS');
        this.addInfoRow(OVERLAY_FIELDS.KEYMAPPING, 'Jump', 'SPACE');
        this.addInfoRow(OVERLAY_FIELDS.KEYMAPPING, 'Start Game', 'S');
        this.addInfoRow(OVERLAY_FIELDS.KEYMAPPING, 'Pause Game', 'P');
        this.addInfoRow(OVERLAY_FIELDS.KEYMAPPING, 'Toggle Overlay', 'C');
        this.addSeparator();
        this.addInfoRow(OVERLAY_FIELDS.POWERUPS, 'Powerups');
        this.addInfoRow(OVERLAY_FIELDS.POWERUP_SHIELD, 'Shield', 'OFF');
        this.addInfoRow(OVERLAY_FIELDS.POWERUP_TROPHY, 'Trophies', 0);
    }

    /** 
     * Shows or hides the div overlay
     * @param {boolean} on
     */
    show(on = true) {
        this.overlay.style.display = on ? 'block' : 'none';
    }

    /** 
     * Toggles the game overlay
     */
    toggle() {
        if (this.overlay.style.display === 'none') {
            this.overlay.style.display = 'block';
        } else {
            this.overlay.style.display = 'none';
        }
    }

    /** 
     * Adds an <h2> element as an overlay child
     * @param {string} id element identifier
     * @param {string} text element text   
     */
    addInfoHeader(id, text) {
        const newRow = document.createElement('h2');
        newRow.className = this.rowClassName;
        newRow.id = id;
        newRow.innerText = `${text}`;
        this.overlay.appendChild(newRow);
    }

    /** 
     * Adds a <div> element as an overlay child which displays a name/value string pair
     * e.g Lives: 10
     * @param {string} id element identifier
     * @param {string} name
     * @param {string} value default undefined   
     */
    addInfoRow(id, name, value = undefined) {
        const newRow = document.createElement('div');
        newRow.className = this.rowClassName;
        newRow.id = id;
        newRow.innerText = `${name}${value !== undefined ? ': ': ''}${value !== undefined ? value : ''}`;
        this.overlay.appendChild(newRow);
    }

    /** 
     * Adds a separator element (<hr>) as an overlay child   
     */
    addSeparator() {
        const separator = document.createElement('hr');
        this.overlay.appendChild(separator);
    }

    /** 
     * Updates the specified info row with new values
     * @param {string} id element identifier
     * @param {string} name new name
     * @param {string} value new value   
     */
    updateInfoRow(id, name, value) {
        const infoRow = document.getElementById(id);
        infoRow.innerText = `${name}${value !== undefined ? ': ': ''}${value !== undefined ? value : ''}`;
    }

    /** 
     * Updates the overlay with the game info
     * This method is called for each rendering frame
     * @param {Game} game game instance   
     */
    updateGameInfo(game) {
        this.updateInfoRow(OVERLAY_FIELDS.SCORE, 'Score', game.score);
        this.updateInfoRow(OVERLAY_FIELDS.LIVES, 'Lives', game.lives);
        
        const timePassed = performance.now() - game.startTime;
        if (timePassed > Constants.RHINO_CHASE_DELAY_TIME_MS) {
            this.updateInfoRow(OVERLAY_FIELDS.CHASE, 'Rhino is chasing!');    
        } else {
            this.updateInfoRow(OVERLAY_FIELDS.CHASE, 'Chase starts in', 
            `${Math.ceil((Constants.RHINO_CHASE_DELAY_TIME_MS - timePassed) / 1000)} sec`);
        }

        this.updateInfoRow(OVERLAY_FIELDS.POWERUP_SHIELD, 'Shield', game.skier.hasImmunity() ? 'ON' : 'OFF');
        this.updateInfoRow(OVERLAY_FIELDS.POWERUP_TROPHY, 'Trophies', game.trophyCount);
        
    }
}