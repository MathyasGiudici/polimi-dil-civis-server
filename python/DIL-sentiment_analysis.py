from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import twitter_samples, stopwords
from nltk.tag import pos_tag
from nltk.tokenize import word_tokenize
from nltk import FreqDist, classify, NaiveBayesClassifier
import os, csv
import re, string, random

#Sentiment evaluator made by following:  https://www.digitalocean.com/community/tutorials/how-to-perform-sentiment-analysis-in-python-3-using-the-natural-language-toolkit-nltk
def remove_noise(tweet_tokens, stop_words = ()):

    cleaned_tokens = []

    for token, tag in pos_tag(tweet_tokens):
        token = re.sub('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+#]|[!*\(\),]|'\
                       '(?:%[0-9a-fA-F][0-9a-fA-F]))+','', token)
        token = re.sub("(@[A-Za-z0-9_]+)","", token)

        if tag.startswith("NN"):
            pos = 'n'
        elif tag.startswith('VB'):
            pos = 'v'
        else:
            pos = 'a'

        lemmatizer = WordNetLemmatizer()
        token = lemmatizer.lemmatize(token, pos)

        if len(token) > 0 and token not in string.punctuation and token.lower() not in stop_words:
            cleaned_tokens.append(token.lower())
    return cleaned_tokens

def get_all_words(cleaned_tokens_list):
    for tokens in cleaned_tokens_list:
        for token in tokens:
            yield token

def get_tweets_for_model(cleaned_tokens_list):
    for tweet_tokens in cleaned_tokens_list:
        yield dict([token, True] for token in tweet_tokens)

def sentiment():
#--------------------------Creation of the training dataset from Twitter samples----------------------   
    positive_cleaned_tokens_list = []
    negative_cleaned_tokens_list = []
    positive_tweets = twitter_samples.strings('positive_tweets.json')
    negative_tweets = twitter_samples.strings('negative_tweets.json')
    stop_words = stopwords.words('english')
    positive_tweet_tokens = twitter_samples.tokenized('positive_tweets.json')
    negative_tweet_tokens = twitter_samples.tokenized('negative_tweets.json')

    for tokens in positive_tweet_tokens:
        positive_cleaned_tokens_list.append(remove_noise(tokens, stop_words))

    for tokens in negative_tweet_tokens:
        negative_cleaned_tokens_list.append(remove_noise(tokens, stop_words))

    positive_tokens_for_model = get_tweets_for_model(positive_cleaned_tokens_list)
    negative_tokens_for_model = get_tweets_for_model(negative_cleaned_tokens_list)

    positive_dataset = [(tweet_dict, "Positive")
                         for tweet_dict in positive_tokens_for_model]

    negative_dataset = [(tweet_dict, "Negative")
                         for tweet_dict in negative_tokens_for_model]

    dataset = positive_dataset + negative_dataset

    random.shuffle(dataset)

    train_data = dataset[:7000]
    test_data = dataset[7000:]

#--------------------------Model and sentiment evaluation on tweets collected----------------------   

    classifier = NaiveBayesClassifier.train(train_data)
    print("Accuracy is:", classify.accuracy(classifier, test_data))

    List=[]
    cwd = os.getcwd()
    tweetsFile = "/DIL/article_12_preproc.csv" 
    path = cwd + tweetsFile
    with open(path, 'r') as csvfile:
        with open('article_12_sentiment.csv', 'w') as tempfile:
            writer = csv.writer(tempfile, quoting=csv.QUOTE_ALL)
            writer.writerow(["comment", "sentiment"])
            reader = csv.reader(csvfile, delimiter=',', quotechar="\"")   
            next(reader)
            for row in reader:
                tweet = row[2]
                tweet = word_tokenize(tweet)
                List.append(classifier.classify(dict([token, True] for token in tweet)))
                sent = List[-1]
                out_val = [tweet, sent]
                writer.writerow(out_val)
            counter = 0
            pos_counter = 0
            neg_counter = 0
            for i in List:
                curr_frequency = List.count(i) 
                if i == "Positive":
                    pos_counter = curr_frequency
                else: 
                    neg_counter = curr_frequency
                if(curr_frequency > counter): 
                    counter = curr_frequency 
                    com_sent = i
#--------------------------Output CSV----------------------   

            print("General sentiment: {0}".format(com_sent))
            pos_out = ["Positive", pos_counter]
            neg_out = ["Negative", neg_counter]
            writer.writerow(pos_out)
            writer.writerow(neg_out)
            writer.writerow(["general_sent"])
            gen_out = [com_sent]
            writer.writerow(gen_out)

#--------------------------End function----------------------   


if __name__ == '__main__':

    sentiment()
