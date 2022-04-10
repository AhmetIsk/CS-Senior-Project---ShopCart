# Website

You can reach the details of the app from the following url:
https://ahmetisk.github.io/CS-Senior-Project---ShopCart/Website/

# Installation guide

# Setup Frontend

first open an android emulator from android studio

1. cd frontend
2. npm install
3. npm start
4. press a to open android

# Setup Backend

1. Backend is [hosted on Heroku](https://shopcart-s.herokuapp.com/), so there is no need to run it locally.
    * Admin Username = "test", Password = "0000"

-----------

# To See "base" Endpoints:

1. Go to `"/admin"` and login.
2. Visit `"/base"`.

# Testing API Endpoints (curl):

Getting Product Base:

* `curl -H "Authorization: Bearer <ACCESS_TOKEN>" https://shopcart-s.herokuapp.com/productManager/get_product_base/<barcode>`
  OR
* Login with your admin account and visit `"https://shopcart-s.herokuapp.com/productManager/get_product_base/"`

Adding new product into shopping cart:

 * `POST /productManager/add_product_to_cart/ '{"barcode": "12123123", "quantity": 2, "id": id_of_shopping_cart}'`

Getting current users' shopping cart(s):

* `GET /base/currentUsersShoppingCart/`

Getting a particular shopping cart:

* `GET /base/shoppingCart/shopping-cart-id/`

Add New Shopping Cart for the current user:

* `POST http://127.0.0.1:8000/base/currentUsersShoppingCart/ '{"name": "name", "priority": "High | Medium | Low", (optional) "communities": [
  {"id": 2}, {"id": 3}
  ]}'` 