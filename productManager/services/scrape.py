import traceback
import urllib.request
import urllib.parse

import requests
from bs4 import BeautifulSoup as bs
import re
import json


# returns name, store{name: price}, photo url, category, msg
def scrape_barcode(barcode):
    url = "http://m.barkodoku.com/" + barcode

    # scraping barkodoku.com and finding the name of the product
    request = urllib.request.Request(url)
    request.add_header("User-agent",
                       "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36")
    barcodesite = urllib.request.urlopen(request)
    print("Barcodesite OK")

    barcodesoup = bs(barcodesite.read(), 'html.parser')
    print("bs OK")
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
    url = url.replace(" ", "&")
    try:
        request = urllib.request.Request(url)
        request.add_header("User-agent",
                           "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36")
        cimrisite = urllib.request.urlopen(request)
        print("Cimrisite OK")
        cimrisoup = bs(cimrisite.read(), 'html.parser')
    except Exception as e:
        traceback.print_exc()
        print(e)
        return

    # without market in url
    # product = cimrisoup.find_all(class_="link-detail")[0]["href"]
    try:
        product = cimrisoup.find(class_="Wrapper_productCard__1act7")
        product = product.find("a")["href"]
    except AttributeError:
        """
        # Look at cimri.com First, if DNE, do search
        url = "https://www.cimri.com/arama?q=" + urllib.parse.quote(product_name)
        url = url.replace(" ", "&")
        cimrisite = urllib.request.urlopen(url)
        cimrisoup = bs(cimrisite.read(), 'html.parser')
        product = cimrisoup.find(class_="top-offers").find(class_="s14oa9nh-0 lihtyI")

        if product:
            purchase_link = product["href"]
            product_store = str(product.find(class_="tag").contents[0])
            product_price = float(re.sub(r'[a-zA-Z ]+', '', str(product.find(class_="tag").next_sibling)).replace(',', '.'))
        else:
        """

        product = iterative_search(product_name)

    if product is None:
        return

    product_url = "https://www.cimri.com/" + urllib.parse.quote(product)

    request = urllib.request.Request(product_url)
    request.add_header("User-agent",
                       "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36")
    productsite = urllib.request.urlopen(request)
    print("productsite OK")
    productsoup = bs(productsite.read(), 'html.parser')

    jsons = []

    for x in productsoup.find_all("script", {"type": "application/ld+json"}):
        jsons.append(json.loads(x.contents[0]))

    jsons.append(productsoup.find("script", {"type": "application/json"}).contents[0])

    # breadcrumb, product, string
    jsons_type = [0, 0, 0]

    for i in range(3):
        try:
            try:
                if jsons[i]["@type"] == "BreadcrumbList":
                    jsons_type[i] = "breadcrumb"
                elif jsons[i]["@type"] == "Product":
                    jsons_type[i] = "product"
            except IndexError:
                return

        except TypeError:
            jsons_type[i] = "string"

    print(jsons)

    result = None
    try:
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
    except Exception as e:
        print(e)
        traceback.print_exc()
        return

    if result:
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
    else:
        return


# this function splits the name of a product and iteratively looks for the name starting from the
# least significant word to the most significant
def iterative_search(product_name):
    splitting = product_name.split(" ")
    words_len = len(splitting)

    product = None
    try:
        for i in range(words_len - 1):
            if product is None:
                search_product = " ".join(splitting[:(words_len - i - 1)])
                url = "https://www.cimri.com/market/arama?q=" + urllib.parse.quote(search_product)
                url = url.replace(" ", "&")

                request = urllib.request.Request(url)
                request.add_header("User-agent",
                                   "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36")
                cimrisite = urllib.request.urlopen(request)
                cimrisoup = bs(cimrisite.read(), 'html.parser')
                product = cimrisoup.find(class_="Wrapper_productCard__1act7")
                if product is not None:
                    product = product.find("a")["href"]

                # Search regular cimri too
                if product is None:
                    url = "https://www.cimri.com/arama?q=" + urllib.parse.quote(search_product)
                    url = url.replace(" ", "&")

                    request = urllib.request.Request(url)
                    request.add_header("User-agent",
                                       "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36")
                    cimrisite = urllib.request.urlopen(request)
                    cimrisoup = bs(cimrisite.read(), 'html.parser')
                    product = cimrisoup.find(class_="z7ntrt-0 cLlfW s1a29zcm-11 ggOMjb")
                    if product is not None:
                        product = product.find("a")["href"]
    except Exception as e:
        print(e)
        return None

    return product

def amazon_scrape(barcode):
    url = "https://www.amazon.com.tr/s?k=" + barcode

    request = urllib.request.Request(url)
    request.add_header("User-agent",
                       "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36")
    barcodesite = urllib.request.urlopen(request)
    print("Amazon OK")

    barcodesoup = bs(barcodesite.read(), 'html.parser')
    barcodesoup = barcodesoup.find("div", {"cel_widget_id": "MAIN-SEARCH_RESULTS-1"})

    imagesoup = barcodesoup.find("span", {"data-component-type": "s-product-image"})
    imagesoup = imagesoup.find("img")
    photo_url = imagesoup["src"]

    price = barcodesoup.find("span", {"class": "a-offscreen"}).text

    return {
            "name": product_name,
            "store": {
                "store_name": "amazon",
                "price": price
            },
            "photo_url": photo_url,
            "category": category,
            "msg": "Successful."
        }

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
# print(scrape_barcode("8690787401019"))
# print(scrape_barcode("8690555511520"))
# print(scrape_barcode("8690637035067"))
# print(scrape_barcode("8690526019949"))
# print(scrape_barcode("8690504186687"))
# print(scrape_barcode("8690637805202"))
# amazon_scrape("8690555511520")
