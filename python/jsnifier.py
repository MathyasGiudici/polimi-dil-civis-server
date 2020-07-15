import os
import csv
import string
import re
import json

cwd = os.getcwd()
tweetsFile = "/datasets/DIL-New2.csv"
path = cwd + tweetsFile
List = []
with open(path, 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar="\"")
    next(reader)
    count=0
    #row corrispondenti al csv
    for row in reader:
        text = row[4]
        text = re.sub(pattern=re.compile(r'b\w*'), repl='', string=text)
        auth = row[0]
        date = row[3]
        date = list(date)
        date[10] = 'T'
        date = "".join(date)
        date = date + 'Z'

        topic = 'topic'
        isHome = False
        regex = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"
        url = re.findall(regex,text)[0]
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
          "isHome": False,
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
