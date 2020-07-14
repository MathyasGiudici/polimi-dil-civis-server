import sys
import csv
import time
import os
import tweepy
import logging


#method to get a user's last tweets
def get_tweets():
    #app auth
    auth = tweepy.AppAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    #auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)
    api = tweepy.API(auth, wait_on_rate_limit=True)

    #--------------------------Users----------------------
    users = ['BBCWorld','cnni', 'ABC']
    fields = ["text"]
    #--------------------------Tweets download----------------------
    #set count to however many tweets you want
    retrived_us = 0
    #open the output csv
    with open('DIL-New2.csv', 'w') as f:
        print("output CSV opened")
        wr = csv.writer(f, quoting=csv.QUOTE_ALL)
        wr.writerow(["screen_name","id_num","id_str", "created_at","text","retweet_count","favorite_count"])
        for userName in users:
            #get tweets
            tweets_for_csv = []
            print("Dealing with user {0}".format(userName))
            count = 0
            art = 1
            try:
                all_tweets = []
                new_tweets = api.user_timeline(screen_name = userName, count=50, tweet_mode="extended")
                all_tweets.extend(new_tweets)
                #saving for csv    
                retrived_us+=1
                print("Saved all tweets of user {0}. Retrived {1} users in total".format(userName,retrived_us))
                tweets_for_csv = [[userName, tweet.id, tweet.id_str, tweet.created_at, tweet.full_text.encode("utf-8"), tweet.retweet_count, tweet.favorite_count] for tweet in all_tweets]
                for tweet in all_tweets:
                    with open("article_{0}.csv".format(art), 'w') as outfile:
                        writer = csv.writer(outfile, quoting=csv.QUOTE_ALL)
                        writer.writerow(fields)
                #--------------------------output CSV ----------------------            
                wr.writerows(tweets_for_csv)
                print("OUTPUT CSV created")

            except tweepy.TweepError as e:
                print("Failed to retrieve {0} - Reason: {1}".format(userName, e))
                #dealing with error code 429
                if e.response.status_code == 429:
                    time.sleep(60 * 15)

#--------------------------end function----------------------   
#main for script
if __name__ == '__main__':

    get_tweets()
