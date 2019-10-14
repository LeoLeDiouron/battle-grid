# _______ IMPORTS _______

import sys

from start_game import start_game
from play_game import play_game

# _______ GLOBALS _______

id_player = None
id_room = None
config = None

# _______ FUNCTIONS _______


def run(args):
    # redefine globals
    global id_player
    global config
    global id_room
    id_player, id_room, config = start_game()
    play_game(id_player, id_room, config)


# _______ MAIN _______

if __name__ == "__main__":
    run(sys.argv[1:])