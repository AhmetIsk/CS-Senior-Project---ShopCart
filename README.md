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

1. Backend is [hosted here](http://146.190.235.140/), so there is no need to run it locally.
    * Admin Username = "test", Password = "0000"

-----------

# To See "base" Endpoints:

1. Go to `/admin/` and login.
2. Visit `/base/`.

# Testing API Endpoints (curl):

Getting Product Base:

* `curl -H "Authorization: Bearer <ACCESS_TOKEN>" https://shopcart-s.herokuapp.com/productManager/get_product_base/<barcode>`
  OR
* Login with your admin account (`/admin/`) and visit `"https://shopcart-s.herokuapp.com/productManager/get_product_base/"`

---------------
Basic Endpoints:
For more, visit [swagger docs.](https://shopcart-s.herokuapp.com/swagger/)
---------------
BASE PRODUCTS
---------------
Seeing all Base Products:

* `GET /base/productBases/`

---------------
SHOPPING CARTS
---------------
Seeing all Shopping Carts:

* `GET /base/shoppingCart/`

Adding new product into shopping cart:

 * `POST /productManager/add_product_to_cart/ '{"barcode": "12123123", "quantity": 2, "id": <id_of_shopping_cart>}'`

Removing product from shopping cart:

 * `POST /productManager/add_product_to_cart/ '{"barcode": "12123123", "quantity": 2, "id": <id_of_shopping_cart>, [optional]"purchase": <true or false>}'`

Getting current users' shopping cart(s):

* `GET /base/currentUsersShoppingCart/`

Getting a particular shopping cart:

* `GET /base/shoppingCart/<shopping-cart-id>/`

Add New Shopping Cart for the current user:

* `POST /base/currentUsersShoppingCart/ '{"name": "name", "priority": "High | Medium | Low", (optional) "communities": [
  {"id": 2}, {"id": 3}
  ]}'` 
  
---------------
USERS
---------------
Get Users

* All users: `GET /users/`
* Particular user: `GET /users/<id>/`


---------------
COMMUNITIES
---------------
See all communities:
* `GET /base/communities/`

Create a community:
* `POST /base/communities/ '{"name": <community name>}'`

Add a user to a community:
* `POST /base/communities/add_user/ '{"user_id": <ID of user to add>, "community_id": <ID of Community>"}'`

Remove a user from a community:
* `POST /base/communities/remove_user/ '{"user_id": <ID of user to remove>, "community_id": <ID of Community>"}'`

Delete a community:
* `DELETE /base/communities/<community_id>/`

Get communities that the current user is a member of:
* `GET /base/communities/get_memberships/`

Get communities that the current user owns:
* `GET /base/communities/get_owned/`

Add a shopping cart to a community:
* `POST /base/communities/add_cart_to_community/ '{"community_id": <ID of community>, "cart_id": <ID of Shopping Cart to add>}'`

Remove shopping cart from a community:
* `POST /base/communities/remove_cart_from_community/ '{"community_id": <ID of community>, "cart_id": <ID of Shopping Cart to add>}'`

Get all shopping carts inside a community (p.s., do not put a trailing slash) (returns id, name and priority):
* `GET /base/communities/get_shopping_carts/?community_id=<ID of community>`