from classy_classification import ClassyClassifier
import csv
import pickle

def read_csv(file_path):
    data = {}
    with open(file_path, "r", encoding = "ISO-8859-1") as file:
        reader = csv.reader(file)
        for row in reader:
            if len(row) == 2:
                item, category = row
                filled = data.setdefault(category, [])
                filled.append(item)
                print(f"Category: {category} Item: {item}")
    return data

data = read_csv("model/labels.csv")

print("Loading dataset...")
classifier = ClassyClassifier(data=data)
print("Loaded")


with open("model/classifier.pkl", "wb") as f:
    pickle.dump(classifier, f)
print("Saved!")