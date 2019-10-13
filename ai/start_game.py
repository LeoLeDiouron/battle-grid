# _______ IMPORTS _______

from send_request import send_get_request as get, send_post_request as post

# _______ GLOBALS _______

BASE_URL = "http://localhost:8080/api"

# _______ FUNCTIONS _______

def load_config():
    response = get(BASE_URL + "/config")
    return response['config']

def get_id_player():
    response = get(BASE_URL + "/id_player")
    return response['idPlayer']

def join_random_room(id_player):
    response = get(BASE_URL + "/random_room?idPlayer=" + id_player)
    return response['idRoom']

def create_army(id_room, id_player):
    body = {
        "leader": "ulfrik_the_terror",
        "army": {
            "peasant":0,"shieldman":0,"soldier":0,"bowman":0,"ninja":0,"crossbowman":1,"doctor":0,"knight":3,"necromancer":0
        }
    }
    post(BASE_URL + "/create_army/" + id_room + "?idPlayer=" + id_player, body)

def start_game():
    id_player = get_id_player()
    id_room = join_random_room(id_player)
    config = load_config()
    create_army(id_room, id_player)
    return id_player, id_room, config

