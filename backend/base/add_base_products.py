import csv

if __name__ == '__main__':
    with open('market-barkod-listesi.csv', newline='') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=';', quotechar='|')

        for row in csvreader:
            barcode = row[0]
            product_name = row[1]
            print('Barcode: {}, Product Name: {}'.format(barcode, product_name))


