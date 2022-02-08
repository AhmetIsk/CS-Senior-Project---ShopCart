from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# TODO: Fix all of this


# we will look at http://m.barkodoku.com/
options = Options()
options.headless = True

url = "http://m.barkodoku.com/" + barcode
driver = webdriver.Chrome(executable_path="chromedriver/chromedriver.exe", options=options)
driver.get(url)
products = driver.find_element_by_id('lblSonuclar')
product_name = products.find_element_by_tag_name('a').text

# finding the photo for the product
# we will look at https://www.cimri.com
url = "https://www.cimri.com/arama?q=" + product_name
driver.get(url)
photo = driver.find_elements_by_class_name('image-wrapper')[1].find_element_by_tag_name('img')

# saving the photo
# urllib.request.urlretrieve(photo.get_attribute('src'), "captcha.png")

driver.close()

# adding the new product to the products database
new_product = ProductBase.objects.create(barcode=barcode, name=product_name)