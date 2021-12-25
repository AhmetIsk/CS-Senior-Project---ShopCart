import base64
import json

from django.test import TestCase
import requests

IP_ADDRESS = '139.179.203.62'


def insert_mock_data():
    # Register a user
    r = requests.post("http://{}:8000/authorization/register/".format(IP_ADDRESS),
                      data={'username': 'testqwerty', 'password': 'testqwerty', 'password2': 'testqwerty',
                            'email': 'testqwerty@e.com',
                            'first_name': 'test_first', 'last_name': 'test_last'})

    print(json.loads(r.text))

    # Get Access Token
    r = requests.post("http://{}:8000/authorization/login/".format(IP_ADDRESS),
                      data={'username': 'testqwerty', 'password':'testqwerty'})
    print(json.loads(r.text))
    access_token = json.loads(r.text)['access']

    # Add a base product
    image_file = '../static/images/products/Screen_Shot_2021-12-22_at_14.39.58.png'
    data = {'barcode': '12123123', 'name': 'Erikli'}
    r = requests.post("http://{}:8000/base/productBases/".format(IP_ADDRESS),
                      headers={'Authorization': 'Bearer {}'.format(access_token)},
                      data=data, files={'photo': open(image_file, 'rb')})
    print(json.loads(r.text))

    image_file = '../static/images/products/pinar_su.jpg'
    data = {'barcode': '8690525041316', 'name': 'Pınar 1.5 lt su'}
    r = requests.post("http://{}:8000/base/productBases/".format(IP_ADDRESS),
                      headers={'Authorization': 'Bearer {}'.format(access_token)},
                      data=data, files={'photo': open(image_file, 'rb')})
    print(json.loads(r.text))

    # Add a base product into shopping cart
    data = {'barcode': "12123123", 'quantity': 2}
    r = requests.post("http://{}:8000/productManager/add_product_to_cart/".format(IP_ADDRESS),
                      headers={'Authorization': 'Bearer {}'.format(access_token)},
                      data=data)
    print(json.loads(r.text))
    # data = {'product_id': 2, 'quantity': 2}
    # r = requests.post("http://{}:8000/productManager/add_product_to_cart/".format(IP_ADDRESS),
    #                   headers={'Authorization': 'Bearer {}'.format(access_token)},
    #                   data=data)
    # print(json.loads(r.text))

    # # Get contents of shopping cart
    # r = requests.get("http://{}:8000/productManager/get_shopping_cart/".format(IP_ADDRESS),
    #                  headers={'Authorization': 'Bearer {}'.format(access_token)})
    # print(json.loads(r.text))


insert_mock_data()
