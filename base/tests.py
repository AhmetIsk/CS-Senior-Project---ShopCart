import base64
import json

from django.test import TestCase
import requests

HOST = 'http://127.0.0.1:8000'


def register_user():
    # Register a user
    r = requests.post("{}/authorization/register/".format(HOST),
                      data={'username': 'testqwerty', 'password': 'testqwerty', 'password2': 'testqwerty',
                            'email': 'testqwerty@e.com',
                            'first_name': 'test_first', 'last_name': 'test_last'})

    print(json.loads(r.text))


def get_token():
    # Get Access Token
    r = requests.post("{}/authorization/login/".format(HOST),
                      data={'username': 'testqwerty', 'password': 'testqwerty'})
    print(json.loads(r.text))
    access_token = json.loads(r.text)['access']
    return access_token


def add_product_with_local_image():
    access_token = get_token()
    # Add a base product
    image_file = '../static/images/products/nivea-soft-krem.jpg'
    data = {'barcode': '4005900009371', 'name': 'Nivea Soft Krem 300 ml'}
    r = requests.post("{}/base/productBases/".format(HOST),
                      headers={'Authorization': 'Bearer {}'.format(access_token)},
                      data=data, files={'photo': open(image_file, 'rb')})
    print(json.loads(r.text))

    image_file = '../static/images/products/pinar_su.jpg'
    data = {'barcode': '8690525041316', 'name': 'Pınar 1.5 lt su'}
    r = requests.post("{}/base/productBases/".format(HOST),
                      headers={'Authorization': 'Bearer {}'.format(access_token)},
                      data=data, files={'photo': open(image_file, 'rb')})
    print(json.loads(r.text))


def add_product(product_data, barcode):
    access_token = get_token()

    # Add the Store
    data = {'name': product_data['store']['store_name']}
    r = requests.post("{}/base/stores/".format(HOST),
                      headers={'Authorization': 'Bearer {}'.format(access_token)},
                      data=data)
    print(json.loads(r.text))


    # Add a base product
    data = {'barcode': barcode, 'name': product_data['name'], 'category': product_data['category'],
            'external_photo_url': product_data['photo_url']}
    r = requests.post("{}/base/productBases/".format(HOST),
                      headers={'Authorization': 'Bearer {}'.format(access_token)},
                      data=data)
    print(json.loads(r.text))


# def insert_mock_data():


# Add a base product into shopping cart
# data = {'barcode': "12123123", 'quantity': 2}
# r = requests.post("http://{}:8000/productManager/add_product_to_cart/".format(IP_ADDRESS),
#                   headers={'Authorization': 'Bearer {}'.format(access_token)},
#                   data=data)
# print(json.loads(r.text))
# data = {'product_id': 2, 'quantity': 2}
# r = requests.post("http://{}:8000/productManager/add_product_to_cart/".format(IP_ADDRESS),
#                   headers={'Authorization': 'Bearer {}'.format(access_token)},
#                   data=data)
# print(json.loads(r.text))

# # Get contents of shopping cart
# r = requests.get("http://{}:8000/productManager/get_shopping_cart/".format(IP_ADDRESS),
#                  headers={'Authorization': 'Bearer {}'.format(access_token)})
# print(json.loads(r.text))
