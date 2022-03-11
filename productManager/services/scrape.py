import urllib.request
from bs4 import BeautifulSoup as bs
import re

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
    product_url = "https://www.cimri.com/" + product

    productsite = urllib.request.urlopen(product_url)
    productsoup = bs(productsite.read(), 'html.parser')

    # finding the photo which is 240px
    photo = productsoup.find("img", {"sizes": "240px"})
    photo = "https:" + photo["src"]

    # this downloads the photo and saves it
    # urllib.request.urlretrieve(photo, "photo.png")

    # scraping the categories
    categories = []
    for category in productsoup.findAll(id=re.compile("^breadcrumbList")):
        categories.append(category.find("a").text)
    categories = categories[1:-1]

    # finding the cheapest store, the site name and the price
    storesoup = productsoup.find("span", string="Şu an en ucuz")

    store_name = storesoup.findNext("span")
    
    # this gives price per unit
    price = store_name.findNext("span")
    price = price.findNext("span")

    print(price)

    store = {
        store_name.text: price.text
    }

    return {
        "name": product_name,
        "store": store,
        "photo": photo
    }

### test
print(scrape_barcode("8690973030450"))