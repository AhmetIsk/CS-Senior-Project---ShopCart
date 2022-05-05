import traceback
import urllib.request
import urllib.parse

import requests
from bs4 import BeautifulSoup as bs
import re
import json


# returns name, store{name: price}, photo url, category, msg
def scrape_barcode(barcode):
    # First scrape amazon, then cimri, and then firatavm
    amazon_result = amazon_scrape(barcode)
    marketkarsilastir_result = marketkarsilastir_scrape(barcode)
    cimri_result = scrape_cimri(barcode)
    firat_result = firatavm_scrape(barcode)
    results = [amazon_result, marketkarsilastir_result, cimri_result, firat_result]
    # Remove None vals
    results = [r for r in results if r and r['msg'] == 'Successful.']

    if len(results) == 0:
        return

    # Get min price
    min_priced_item = min(results, key=lambda x: x['store']['price'])
    if not min_priced_item['category']:
        min_priced_item['category'] = [r for r in results if r['category'] is not None][0]['category']

    return min_priced_item


def scrape_cimri(barcode):
    url = "http://m.barkodoku.com/" + barcode

    # scraping barkodoku.com and finding the name of the product
    request = urllib.request.Request(url)
    request.add_header("User-agent",
                       "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36")
    barcodesite = urllib.request.urlopen(request)
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

    result = None
    try:
        for i in range(3):
            if jsons_type[i] == "breadcrumb":
                category = jsons[i]["itemListElement"][2]["item"]["name"]
            elif jsons_type[i] == "product":
                photo_url = jsons[i]["image"][0]
                price = float(jsons[i]["offers"]["lowPrice"])
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
            "product_url": product_url,
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
        for i in range(int(words_len / 2)):
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


# searches the amazon.com.tr site
def amazon_scrape(barcode):
    try:
        url = "https://www.amazon.com.tr/s?k=" + barcode

        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
            "content-encoding": "gzip", }

        barcodesite = requests.get(url, headers=headers).content

        barcodesoup = bs(barcodesite, 'html.parser')
        barcodesoup = barcodesoup.find("div", {"cel_widget_id": "MAIN-SEARCH_RESULTS-1"})

        sitesoup = barcodesoup.find("span", {"data-component-type": "s-product-image"})
        imagesoup = sitesoup.find("img")
        photo_url = imagesoup["src"]

        # the price is in format: "3,4 TL", this code will replace this with a float
        price = barcodesoup.find("span", {"class": "a-offscreen"}).text
        # print('Price: ', barcodesoup.find("span", {"class": "a-offscreen"}))
        price = float(price[:-3].replace(",", "."))

        site = sitesoup.find("a")["href"]
        siteurl = "https://www.amazon.com.tr" + site

        request = urllib.request.Request(siteurl)
        request.add_header("User-agent",
                           "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36")
        productsite = urllib.request.urlopen(request)
        productsoup = bs(productsite.read(), 'html.parser')
        categorysoup = productsoup.find("div", {"id": "nav-subnav"})
        categorysoup = categorysoup.find_all("a")[-1]
        category = categorysoup.find("span").text.strip()
        product_name = productsoup.find("span", {"id": "productTitle"}).text.strip()
    except Exception as e:
        print("SCRAPER")
        print(e)
        return

    return {
        "name": product_name,
        "store": {
            "store_name": "amazon",
            "price": price
        },
        "photo_url": photo_url,
        "product_url": siteurl,
        "category": category,
        "msg": "Successful."
    }


# searches firatavm as it contains barcode data
def firatavm_scrape(barcode):
    try:
        url = "https://www.firatavm.com.tr/arama?k=" + barcode

        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
            "content-encoding": "gzip", }

        barcodesite = requests.get(url, headers=headers).content

        barcodesoup = bs(barcodesite, 'html.parser')
        photosoup = barcodesoup.find("div", {"class": "card-product-inner"})
        photo_url = photosoup.find("img", {"class": "lazy-load"})["data-src"]

        product_name = barcodesoup.find("a", {"class": "c-p-i-link"})["title"]

        product_url = barcodesoup.find("div", {"class": "image-wrapper"}).find("a", {"class": "c-p-i-link"})["href"]
        product_site = bs(requests.get(product_url, headers=headers).content, 'html.parser')
        category = \
            [item.text for item in product_site.find("ul", {"class": "product-profile-info"})][2].split('Kategori: \n')[
                1].strip()

        # the price is in format: "3,4 TL", this code will replace this with a float
        price = barcodesoup.find("div", {"class": "sale-price"}).text
        # print('Price: ', barcodesoup.find("span", {"class": "a-offscreen"}))
        price = float(price[:-3].replace(",", "."))
    except Exception as e:
        print("SCRAPER")
        print(e)
        return

    return {
        "name": product_name,
        "store": {
            "store_name": "Firat AVM",
            "price": price
        },
        "photo_url": photo_url,
        "product_url": product_url,
        "category": category,
        "msg": "Successful."
    }


def marketkarsilastir_scrape(barcode):
    try:
        url = "https://marketkarsilastir.com/ara/" + barcode

        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
            "content-encoding": "gzip", }

        barcodesite = requests.get(url, headers=headers).content

        barcodesoup = bs(barcodesite, 'html.parser')
        photo_url = barcodesoup.find("a", {"class": "product-img d-flex align-items-center"}).find("img")["src"]

        product_name = barcodesoup.find("a", {"class": "pi-name mt-1"}).text.strip()

        product_url = "https://marketkarsilastir.com/" + \
                      barcodesoup.find("a", {"class": "product-img d-flex align-items-center"})['href']
        product_site = bs(requests.get(product_url, headers=headers).content, 'html.parser')

        store_name = product_site.find('th', {'scope': 'row'}).find_next_sibling("td").find("img")["title"].strip()
        category = None
        price = float(
            product_site.find('th', {'scope': 'row'}).find_next_sibling("td").find_next_sibling("td").find_next_sibling(
                "td").text.strip().replace(',', '.'))
    except Exception as e:
        print("SCRAPER")
        print(e)
        return

    return {
        "name": product_name,
        "store": {
            "store_name": store_name,
            "price": price
        },
        "photo_url": photo_url,
        "product_url": product_url,
        "category": category,
        "msg": "Successful."
    }


def google_search(barcode):
    search_url = "https://www.google.com/search?q=" + str(barcode) + "&tbm=isch"
    request = urllib.request.Request(search_url)
    request.add_header("User-agent",
                       "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36")
    search_site = urllib.request.urlopen(request)
    searchsoup = bs(search_site.read(), 'html.parser')

    cardsoup = searchsoup.find("div", {"data-ictx": "1"})
    product_name = cardsoup.find("h3").text
    base_photo_url = cardsoup.find("img")["src"]
    print(base_photo_url)

    return {
        "name": product_name,
        "store": {
            "store_name": "",
            "price": -1
        },
        "photo_url": photo_url,
        "category": [],
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
if __name__ == '__main__':
    # print(scrape_barcode("8690787401019"))
    # print(scrape_barcode("8690555511520"))
    # print(scrape_barcode("8690637035067"))
    # print(scrape_barcode("8690526019949"))
    # print(scrape_barcode("8690504186687"))
    # print(scrape_barcode("8690637805202"))
    # print(amazon_scrape("8690637805202"))
    # print(scrape_barcode("8690504186687"))
    # print(scrape_barcode("8690525060010"))
    # print(scrape_barcode("8690506517663"))
    #print(scrape_barcode("90004407"))
    print(scrape_barcode("8690637035067"))


    # print(google_search("8690637805202"))
