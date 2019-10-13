# _______ IMPORTS _______

import requests
import json

# _______ FUNCTIONS _______

def send_get_request(url):
    response = requests.get(url)
    # print(response.content)
    return json.loads(response.content)

def send_post_request(url, body):
    requests.post(url, json = body)