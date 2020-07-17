import os
import csv
import string
import re
import json
import preprocessor as p
import random

cwd = os.getcwd()
tweetsFile = "/datasets/DIL-New2.csv"
path = cwd + tweetsFile
List = []
with open(path, 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar="\"")
    next(reader)

    home_randoms = [ 1, 2, 3, 4, 5 ,6, 7, 8, 9, 10]
    count=0
    #row corrispondenti al csv
    for row in reader:
        text = row[4]
        text = re.sub(pattern=re.compile(r'b\w*'), repl='', string=text)
        text = re.sub(pattern=re.compile(r'(RT|FAV|VIA)'), repl='', string=text)
        auth = row[0]
        date = row[3]
        date = list(date)
        date[10] = 'T'
        date = "".join(date)
        date = date + 'Z'
        topic = 'topic'
        url = re.search("(?P<url>https?://[^\s]+)", text)
        #print(url)
        if(url == None):
            url = ''
        else:
            url = url.group("url")

        if((url != '') and (len(home_randoms) != 0)):
            isHome = True
            home_randoms.pop(0)
        else:
            isHome = False

        text = p.clean(text)

        #dictionary object
        myobject = {
          "id": count,
          "title": text.split('\n')[0] ,
          "text": text,
          "topic": topic,
          "likesCount": 0,
          "commentsCount": 0,
          "timestamp": date,
          "statistics": '',
          "isHome": isHome,
          "sourceName": auth,
          "sourceUrl": url,
        }

        count+=1
        List.append(myobject)
    #create json file
    with open('datasets/output.json', 'w') as jsnfile:
        obj = {
            "array": List,
        }
        json.dump(obj, jsnfile)
