# _______ IMPORTS _______

import sys
import time

from send_request import send_get_request as get, send_post_request as post
from start_game import start_game

# _______ GLOBALS _______

BASE_URL = "http://localhost:8080/api"

id_player = None
id_room = None
config = None

# _______ FUNCTIONS _______

def play():
    while True:
        print("play")
        status_room = get(BASE_URL + "/status_room/" + id_room)
        if status_room['status'] == 3:
            status_game = get(BASE_URL + "/status_game/" + id_room + "?idPlayer=" + id_player)
            if status_game['turnPlayer'] == id_player:
                get(BASE_URL + "/turn_over/" + id_room + "?idPlayer=" + id_player)
        time.sleep(1)

def run(args):
    # redefine globals
    global id_player
    global config
    global id_room
    id_player, id_room, config = start_game()
    play()


# _______ MAIN _______

if __name__ == "__main__":
    run(sys.argv[1:])