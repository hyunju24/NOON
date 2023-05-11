import pickle
import os

path = os.getcwd()

def recommend_thumbnail(input_lst):
    with open('Models/thumbnail_output.pkl', 'rb') as f:
        thumbnail_outputs = pickle.load(f)
    with open('Data/Result/Thumbnails.pkl', 'rb') as f:
        predictions = pickle.load(f)
    
    pred = predictions[input_lst[0]]
    for i in range(1, 5):
        pred += predictions[input_lst[i]]
    top10 = pred.argsort()[::-1][:10]
    top10 = [thumbnail_outputs[i] for i in top10 if thumbnail_outputs[i] not in input_lst]
    return top10[:5]


def recommend_sentence(input_lst):
    with open('Models/titleIds.pkl', 'rb') as f:
        sentence_outputs = pickle.load(f)
    with open('Data/Result/Sentence.pkl', 'rb') as f:
        predictions = pickle.load(f)
    # print(predictions)
    pred = predictions[input_lst[0]]
    for i in range(1, 5):
        pred += predictions[input_lst[i]]
    top10 = pred.argsort()[::-1][:10]
    top10 = [sentence_outputs[i] for i in top10 if sentence_outputs[i] not in input_lst]
    return top10[:5]


def recommend(input_lst):
    thumbnail = recommend_thumbnail(input_lst)
    sentence = recommend_sentence(input_lst)
    return sentence, thumbnail
    # return sentence, sentence