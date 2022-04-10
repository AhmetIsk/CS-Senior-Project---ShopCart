import urllib.request
import urllib.parse
from bs4 import BeautifulSoup as bs
import re
import json

# returns name, store{name: price}, photo url, category, msg
def scrape_barcode(barcode):
    url = "http://m.barkodoku.com/" + barcode

    # scraping barkodoku.com and finding the name of the product
    barcodesite = urllib.request.urlopen(url)
    barcodesoup = bs(barcodesite.read(), 'html.parser')
    try:
        product_name = barcodesoup.find(id="lblSonuclar").find("a").text
    except AttributeError:
        return {
            "name": "",
            "store": {
                "store_name": "",
                "price": -1
            },
            "photo_url": "",
            "category": "",
            "msg": "Please enter manually."
        }

    # searching the cimri.com
    # searching the market
    url = "https://www.cimri.com/market/arama?q=" + urllib.parse.quote(product_name)
    url = url.replace(" ","&")
    cimrisite = urllib.request.urlopen(url)
    cimrisoup = bs(cimrisite.read(), 'html.parser')

    # without market in url
    # product = cimrisoup.find_all(class_="link-detail")[0]["href"]
    try:
        product = cimrisoup.find(class_="Wrapper_productCard__1act7")
        product = product.find("a")["href"]
    except AttributeError:
        product = iterative_search(product_name)

    product_url = "https://www.cimri.com/" + urllib.parse.quote(product)

    productsite = urllib.request.urlopen(product_url)
    productsoup = bs(productsite.read(), 'html.parser')

    jsons = []

    for x in productsoup.find_all("script", {"type": "application/ld+json"}):
        jsons.append(json.loads(x.contents[0]))

    jsons.append(productsoup.find("script", {"type": "application/json"}).contents[0])

    # breadcrumb, product, string
    jsons_type = [0, 0, 0]

    for i in range(3):
        try:
            if jsons[i]["@type"] == "BreadcrumbList":
                jsons_type[i] = "breadcrumb"
            elif jsons[i]["@type"] == "Product":
                jsons_type[i] = "product" 
        
        except TypeError:
            jsons_type[i] = "string"

    for i in range(3):
        if jsons_type[i] == "breadcrumb":
            category = jsons[i]["itemListElement"][2]["item"]["name"]
        elif jsons_type[i] == "product":
            photo_url = jsons[i]["image"][0]
            price = jsons[i]["offers"]["lowPrice"]
        elif jsons_type[i] == "string":
            # this is not a correct json this is a string so we will use regex
            # ?<= look behind, ?= look ahead, .+? is not greedy
            result = re.findall(r'(?<="merchantUrl":"https://www.)(.+?)(?=.com)', jsons[i])
            # print(result)
            # print(result[0])

    return {
        "name": product_name,
        "store": {
            "store_name": result[0],
            "price": price
        },
        "photo_url": photo_url,
        "category": category,
        "msg": "Successful."
    }

# this function splits the name of a product and iteratively looks for the name starting from the
# least significant word to the most significant
def iterative_search(product_name):
    splitting = product_name.split(" ")
    words_len = len(splitting)
    for i in range(words_len - 1):
        try:
            search_product = " ".join(splitting[:(words_len - i - 1)])
            url = "https://www.cimri.com/market/arama?q=" + urllib.parse.quote(search_product)
            url = url.replace(" ","&")
            cimrisite = urllib.request.urlopen(url)
            cimrisoup = bs(cimrisite.read(), 'html.parser')
            product = cimrisoup.find(class_="Wrapper_productCard__1act7")
            product = product.find("a")["href"]
        except AttributeError:
            continue
        
        return product

#### Old Version
# # finding the photo which is 240px
# photo = productsoup.find("img", {"sizes": "240px"})
# photo = "https:" + photo["src"]

# # this downloads the photo and saves it
# # urllib.request.urlretrieve(photo, "photo.png")

# # scraping the categories
# categories = []
# for category in productsoup.findAll(id=re.compile("^breadcrumbList")):
#     categories.append(category.find("a").text)
# categories = categories[1:-1]

# # finding the cheapest store, the site name and the price
# storesoup = productsoup.find("span", string="Şu an en ucuz")

# store_name = storesoup.findNext("span")

# # this gives price per unit
# price = store_name.findNext("span")
# price = price.findNext("span")

# print(price)

# store = {
#     store_name.text: price.text
# }

# return {
#     "name": product_name,
#     "store": store,
#     "photo": photo
# }

# TODO
### test - write the barcode here
print(scrape_barcode("3014230021404"))