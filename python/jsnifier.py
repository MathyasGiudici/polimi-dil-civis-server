import string 
import csv
import os
import re
import pandas as pd
import nltk
from nltk.corpus import stopwords
import shutil
import hunspell
from pattern.it import suggest
from tempfile import NamedTemporaryFile
import json

cwd = os.getcwd()
tweetsFile = "/DIL/DIL-New2.csv" #cambiare il path
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
        url = re.findall(regex,text)    
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
        List.append(json.dumps(myobject))
    #create json file
    with open('output.json', 'w') as jsnfile:
        obj = {
            "array": List,
        }
        json.dump(obj, jsnfile)