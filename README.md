# Installation guide

First,
1. Change "<YOUR_IP_ADDRESS>" to your actual IP address from [backend/backend/settings.py](backend/backend/settings.py) and [frontend/api/index.js](frontend/api/index.js).

#Setup Backend
1. cd backend
2. pip install -r requirements.txt
3. python manage.py createsuperuser
4. python manage.py makemigrations
5. python manage.py migrate
6. python manage.py runserver <YOUR_IP_ADDRESS>:8000

#Setup Frontend
first open an android emulator from android studio
1. cd frontend
2. npm install
3. npm start
4. press a to open android


-----------
#To Add Mock Data:
1. Run `backend/base/tests.py` after starting up the server (Change the IP address in that file to your own IP). Created users' username & password is: "testqwerty". Do not forget to migrate before.

#To See "base" Endpoints:
1. Go to `"/admin"` and login.
2. Visit `"/base"`.

#Testing API Endpoints (curl):
Getting Product Base:
* `curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://<YOUR_IP_ADDRESS>:8000/productManager/get_product_base/<barcode>`
OR
* Login with your admin account and visit `"http://<YOUR_IP_ADDRESS>:8000/productManager/get_product_base/"`

Adding new product into shopping cart:
* `curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://<YOUR_IP_ADDRESS>:8000/productManager/add_product_to_cart/ -X POST -d 'barcode=12123123&quantity=2'`
OR
* Login with your admin account and visit `"http://<YOUR_IP_ADDRESS>:8000/productManager/add_product_to_cart/"`

Getting current users' shopping cart:
* `curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://<YOUR_IP_ADDRESS>:8000/productManager/get_shopping_cart/`
OR
* Login with your admin account and visit `"http://<YOUR_IP_ADDRESS>:8000/productManager/get_shopping_cart/"`