/**
 *
 *     __  __         ___                            ___  ___
 *    / /_/ /  ___   / _ \___ _    _____ ____  ___  / _/ / _ )___  ___ _______
 *   / __/ _ \/ -_) / ___/ _ \ |/|/ / -_) __/ / _ \/ _/ / _  / _ \(_-</ __/ _ \
 *   \__/_//_/\__/ /_/   \___/__,__/\__/_/    \___/_/  /____/\___/___/\__/\___/
 *
 *
 *
 */
bosco.start({
    "namespace": "monkeydance",
    "width": window.innerWidth * window.devicePixelRatio,
    "height": window.innerHeight * window.devicePixelRatio,
    "scale": false,
    "scaleType": "FILL",
    "stats": true,
    "storage": false,
    "options": {
        "antialiasing": false,
        "transparent": false,
        "resolution": window.devicePixelRatio,
        "autoResize": true,
        "backgroundColor": "0x3c3c3c"
    },
    "assets": {
        "images": (window.devicePixelRatio >= 2) ? "res/images@2x.json" : "res/images.json"
    },
    "resources": {
        "armsup" : {"path": "monkey_armsup.png"},
        "armsup_happy"  : {"path": "monkey_armsup_happy.png"},
        "dead"  : {"path": "monkey_dead.png"},
        "faceforward"  : {"path": "monkey_faceforward.png"},
        "idle"  : {"path": "monkey_idle.png"},
        "jump_1"  : {"path": "monkey_jump_1.png"},
        "jump_2"  : {"path": "monkey_jump_2.png"},
        "jump_3"  : {"path": "monkey_jump_3.png"},
        "jump_4"  : {"path": "monkey_jump_4.png"},
        "jump_swing_1"  : {"path": "monkey_jump_swing_.png"},
        "jump_swing_2"  : {"path": "monkey_jump_swing_2.png"},
        "jump_swing_3"  : {"path": "monkey_jump_swing_3.png"},
        "push_1"  : {"path": "monkey_push_1.png"},
        "push_2"  : {"path": "monkey_push2.png"},
        "run_1"  : {"path": "monkey_run_1.png"},
        "run_2"  : {"path": "monkey_run_2.png"},
        "run_3"  : {"path": "monkey_run_3.png"},
        "run_4"  : {"path": "monkey_run_4.png"},
        "run_5"  : {"path": "monkey_run_5.png"},
        "run_6"  : {"path": "monkey_run_6.png"},
        "run_7"  : {"path": "monkey_run_7.png"},
        "run_8"  : {"path": "monkey_run_8.png"},
        "throw_1"  : {"path": "monkey_throw_1.png"},
        "throw_2"  : {"path": "monkey_throw_2.png"},
        "walk_1"  : {"path": "monkey_walk_1.png"},
        "walk_2"  : {"path": "monkey_walk_2.png"},
        "walk_3"  : {"path": "monkey_walk_3.png"},
        "walk_4"  : {"path": "monkey_walk_4.png"},
        "walk_away_1"  : {"path": "monkey_walk_away_1.png"},
        "walk_away_2"  : {"path": "monkey_walk_away_2.png"},
        "walk_away_3"  : {"path": "monkey_walk_away_3.png"}
    },
    "frames": {
        "armsup": ["armsup", "armsup_happy"],
        "jump":["jump_1", "jump_2", "jump_3", "jump_4"],
        "swing":["jump_swing_1", "jump_swing_2", "jump_swing_3"],
        "push":["push_1", "push_2"],
        "run": ["run_1", "run_2", "run_3", "run_4", "run_5", "run_6", "run_7", "run_8"],
        "throw": ["throw_1", "throw_2"],
        "walk": ["walk_1", "walk_2", "walk_3", "walk_4"],
        "away":["walk_away_1", "walk_away_2", "walk_away_3"]
    },
    "sprites": ["armsup", "jump", "swing", "push", "run", "throw", "walk", "away"],
    "controllers": [
        "GameController",
        "InputController",
        "ScoreLabelController"
    ],
    "properties": {
        "skip": "false",
        "leaderboard": "off",
        "player": "",
        "userId": "",
        "playMusic": "true",
        "playSfx": "true"
    }
});

