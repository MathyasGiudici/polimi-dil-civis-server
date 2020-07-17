import sys
import csv
import time
import os
import tweepy
import logging

#Get your Twitter API credentials and enter them here


def get_retweets():

    cwd = os.getcwd()
    articles = "/DIL-New2.csv"
    replies=[]
    auth = tweepy.AppAuthHandler(CONSUMER_KEY2, CONSUMER_SECRET2)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    path = cwd + articles
    numOfReplies = 50
#--------------------------open CSV tweets----------------------   
    with open(path, 'r') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar="\"")
        next(reader)
        count=1
        for row in reader:
            tweet_id = row[2]
            userName = row[0]
            print("Dealing with Article {0}".format(count))
            try: 
                replies=[]
                for tweet in tweepy.Cursor(api.search,q='to:'+userName, result_type='recent', timeout=999999).items(numOfReplies):
                    if hasattr(tweet, 'in_reply_to_status_id_str'):
                        if (tweet.in_reply_to_status_id_str==tweet_id):
                            replies.append(tweet)
                with open('article_{0}.csv'.format(count), 'w') as f:
                    csv_writer = csv.writer(f,  quoting=csv.QUOTE_ALL)
                    csv_writer.writerow(["article_number","id_article", "text", "id_reply", "text"])
                    tweets_for_csv = [[count, tweet_id, status.user.screen_name, status.id_str, status.text.encode("utf-8")] for status in replies]
                    csv_writer.writerows(tweets_for_csv)
                count+=1
            except tweepy.TweepError as e:
                    print("Failed to retrieve Replies for Article {0}- Reason: {1}".format(count, e))
                    #dealing with error code 429
                    if e.response.status_code == 429:
                        print("Sleeping...")
                        time.sleep(60 * 15)
            
#--------------------------end function----------------------   
#main for script
if __name__ == '__main__':

    get_retweets()
