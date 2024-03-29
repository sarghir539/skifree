export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const SKIER_JUMP_1 = 'skierJump1';
export const SKIER_JUMP_2 = 'skierJump2';
export const SKIER_JUMP_3 = 'skierJump3';
export const SKIER_JUMP_4 = 'skierJump4';
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const RAMP = 'ramp';
export const RHINO = 'rhino';
export const RHINO_EAT_1 = 'rhinoEat1';
export const RHINO_EAT_2 = 'rhinoEat2';
export const RHINO_EAT_3 = 'rhinoEat3';
export const RHINO_EAT_4 = 'rhinoEat4';
export const RHINO_EAT_5 = 'rhinoEat5';
export const RHINO_EAT_6 = 'rhinoEat6';
export const RHINO_RUN_1 = 'rhinoRun1';
export const RHINO_RUN_2 = 'rhinoRun2';
export const POWERUP_PIZZA = 'powerupPizza';
export const POWERUP_COCOA = 'powerupCocoa';
export const POWERUP_SHIELD = 'powerupShield';
export const POWERUP_TROPHY = 'powerupTrophy';

export const SKIER_STARTING_SPEED = 5;
export const SKIER_STARTING_LIVES = 10;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;
export const SKIER_IMMUNITY_TIME_MS = 10000;
export const RHINO_CHASE_DELAY_TIME_MS = 10000;
export const RHINO_STARTING_SPEED = 4;
export const DEFAULT_FRAMES_PER_ASSET = 10;
export const POWERUP_TROPHY_POINTS = 10000;

const imagePath = require.context('../img', true);
export const ASSETS = {
    [SKIER_CRASH]: imagePath('./skier_crash.png'),
    [SKIER_LEFT]: imagePath('./skier_left.png'),
    [SKIER_LEFTDOWN]: imagePath('./skier_left_down.png'),
    [SKIER_DOWN]: imagePath('./skier_down.png'),
    [SKIER_RIGHTDOWN]: imagePath('./skier_right_down.png'),
    [SKIER_RIGHT]: imagePath('./skier_right.png'),
    [SKIER_JUMP_1]: imagePath('./skier_jump_1.png'),
    [SKIER_JUMP_2]: imagePath('./skier_jump_2.png'),
    [SKIER_JUMP_3]: imagePath('./skier_jump_3.png'),
    [SKIER_JUMP_4]: imagePath('./skier_jump_4.png'),
    [TREE]: imagePath('./tree_1.png'),
    [TREE_CLUSTER]: imagePath('./tree_cluster.png'),
    [ROCK1]: imagePath('./rock_1.png'),
    [ROCK2]: imagePath('./rock_2.png'),
    [RAMP]: imagePath('./jump_ramp.png'),
    [RHINO]: imagePath('./rhino_default.png'),
    [RHINO_EAT_1]: imagePath('./rhino_lift.png'),
    [RHINO_EAT_2]: imagePath('./rhino_lift_mouth_open.png'),
    [RHINO_EAT_3]: imagePath('./rhino_lift_eat_1.png'),
    [RHINO_EAT_4]: imagePath('./rhino_lift_eat_2.png'),
    [RHINO_EAT_5]: imagePath('./rhino_lift_eat_3.png'),
    [RHINO_EAT_6]: imagePath('./rhino_lift_eat_4.png'),
    [RHINO_RUN_1]: imagePath('./rhino_run_left.png'),
    [RHINO_RUN_2]: imagePath('./rhino_run_left_2.png'),
    [POWERUP_PIZZA]: imagePath('./powerup_pizza.png'),
    [POWERUP_COCOA]: imagePath('./powerup_cocoa.png'),
    [POWERUP_SHIELD]: imagePath('./powerup_shield.png'),
    [POWERUP_TROPHY]: imagePath('./powerup_trophy.png')
};

export const SKIER_DIRECTIONS = {
    CRASH : 0,
    LEFT : 1,
    LEFT_DOWN : 2,
    DOWN : 3,
    RIGHT_DOWN : 4,
    RIGHT : 5
};

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH] : SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT] : SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN] : SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT] : SKIER_RIGHT
};

export const KEYS = {
    LEFT : 37,  // move left
    RIGHT : 39, // move right
    UP : 38,    // move up
    DOWN : 40,  // move down
    SPACE: 32,  // jump
    P: 80,      // pause game
    C: 67,      // toggle game overlay 
    S: 83       // start game
};

export const GAME_STATE = {
    NOT_STARTED: 0,
    INITIALIZED: 1,
    RUNNING: 2,
    PAUSED: 3,
    OVER: 4
}

export const SPLASH_MESSAGES = {
    START_GAME: `Press 'S' to start...`,
    GAME_OVER: 'GAME OVER!',
    EXTRA_LIFE: 'Extra Life!',
    CRASH_IMMUNITY: 'Crash Immunity!',
    EXTRA_POINTS: 'Extra Points!'
}

export const CRASH_MESSAGES = [
    'Bump!',
    'Ouch!',
    'That hurt.',
    'Oops!',
    'Whoops!'
];
