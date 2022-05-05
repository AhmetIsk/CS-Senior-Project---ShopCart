import os 
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from tqdm import tqdm 
from google_images_download import google_images_download


directory = "imgs/"
response = google_images_download.googleimagesdownload()

names = []
for filename in os.listdir(directory): 
    if filename.endswith(".png"):
        names.append(filename.split('.')[0])


def query_constructor(namelist):
    queries = []
    for item in names:
        queries.append(item)
    return queries

def download_image(query):
    arguments = {"keywords" : query,
                 "format" : "svg",
                 "limit" : 1,
                 "aspect_ratio" : "square",
                 "no_directory" : True,
                 "prefix" : query}
    try:
        response.download(arguments)
    except FileNotFoundError:
        arguments = {"keywords" : query,
                     "format" : "jpg",
                     "limit" : 1,
                     "aspect-ratio" : "square",
                     "no_directory" : True,
                     "prefix" : query}
        try:
            response.download(arguments)
        except:
            pass

def download_all_images(querylist):
    for query in querylist:
        download_image(query)

queries = query_constructor(names)
download_all_images(queries)