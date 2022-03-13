import urllib.request
import urllib.parse
from bs4 import BeautifulSoup as bs
import re
import json

# returns name, store{url: price}, photo url
def scrape_barcode(barcode):
    url = "http://m.barkodoku.com/" + barcode

    # scraping barkodoku.com and finding the name of the product
    barcodesite = urllib.request.urlopen(url)
    barcodesoup = bs(barcodesite.read(), 'html.parser')
    product_name = barcodesoup.find(id="lblSonuclar").find("a").text

    # searching the cimri.com
    url = "https://www.cimri.com/arama?q=" + product_name
    url = url.replace(" ","&")
    cimrisite = urllib.request.urlopen(url)
    cimrisoup = bs(cimrisite.read(), 'html.parser')

    product = cimrisoup.find_all(class_="link-detail")[0]["href"]
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
        elif jsons_type[i] == "string":
            # this is not a correct json this is a string so we will use regex
            result = re.search(r'(?<=merchantName:)(.)(?=,)', jsons[i])
            print(result)


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

### test
scrape_barcode("8690973030450")