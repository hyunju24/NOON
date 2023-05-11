import warnings
warnings.filterwarnings(action='ignore')
import pickle
import numpy as np
import pandas as pd
import re

from sentence_transformers import SentenceTransformer, util

# 데이터 전처리 함수
def preprocessing_data(data):
    # 줄거리 불필요 문자 삭제
    data['intro'] = [re.sub("[^ 0-9가-힣A-Za-z]", "", data['intro'][b]) for b in range(len(data))]

    # 해시태그 불필요 문자 삭제 + 리스트로 담아주기
    data['tags'] = [re.sub("[^#0-9가-힣A-Za-z]","", data['tags'][i]).split('#')[1:] for i in range(len(data))]
    
    # 출현빈도 2개 이하인 해시태그 삭제
    tags_cnt = {}
    for i in range(len(data)):
        for j in data['tags'][i]:
            if tags_cnt.get(j, 0):
                tags_cnt[j] += 1
            else:
                tags_cnt[j] = 1
    del_tag = [tit for tit, cnt in tags_cnt.items() if cnt<=2]
    return data, del_tag

# 해시태그에서 장르 / 해시태그 구분하기
def genre_classification(data, del_tag):
    genre_list = ['스릴러', '드라마', '판타지', 'SF', '액션', '무협사극', '로맨스', '학원물', '개그', '일상', '스포츠', '범죄', '느와르', '타입슬립', '퓨전사극', '감성']
    data['genre'] = 'Nan'

    for i in range(len(data)):
        tag_temp = []
        genre_temp = []
        for tag in data['tags'][i]:

            # 해시태그 중 '최강'/'공모전' 들어있는 경우 삭제 + 빈도 수가 2개 이하인 해시태그 삭제
            if ('최강' in tag) or ('공모전' in tag) or (tag in del_tag):
                continue

            # 장르 나누기
            elif tag in genre_list:
                genre_temp.append(tag)
                continue
                
            # 학원 로맨스의 경우 => 로맨스, 학원물로 판단.
            elif tag == '학원로맨스':
                genre_temp.extend(['학원물', '로맨스'])
                continue
            elif tag == '판무':
                genre_temp.extend(['판타지', '무협'])
                continue
            elif tag == '감성드라마':
                genre_temp.extend(['감성', '드라마'])
                continue
                
            # '로맨스'나 '드라마'라는 글자가 포함된 경우, 로맨스 / 드라마로 판단
            flag = False
            for genres in genre_list:
                if genres in tag:
                    genre_temp.append(genres)
                    flag = True
                    continue

            if flag : continue
            else:
                tag_temp.append(tag)

        data['tags'][i] = tag_temp
        data['genre'][i] = set(genre_temp)

    return data

# 소개글 유사도 판단 함수
def story_sim(story1, story2):
    model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS')
    story1_vec = model.encode(story1, show_progress_bar=True)
    story2_vec = model.encode(story2, show_progress_bar=True)
    story_sim = util.cos_sim(story1_vec, story2_vec)
    return story_sim

# 장르 유사도 판단 함수
def genre_sim(data):
    genre_sim_list = []
    for i in range(len(data)):
        temp = []
        for j in range(len(data)):
            cnt = 0
            for genre in data.iloc[j]['genre']:
                if genre in data.iloc[i]['genre']:
                    cnt += 1
            temp.append(cnt / len(data.iloc[i]['genre']))
        genre_sim_list.append(temp)
    return genre_sim_list

# 태그 유사도 판단 함수
def tag_sim(data):
    tag_sim_list = []
    for i in range(len(data)):
        temp = []
        if (data.iloc[i]['tags']):
            for j in range(len(data)):
                cnt = 0
                for tag in data.iloc[j]['tags']:
                    if tag in data.iloc[i]['tags']:
                        cnt += 1
                temp.append(cnt / len(data['tags'][i]))
        else : 
            temp = [0] * len(data)
        tag_sim_list.append(temp)
    return tag_sim_list

# 줄거리 유사도 점수 내기
def get_sim_score(data):
    base_story_list = [data.iloc[b]['intro'] for b in range(len(data))]
    compare_story_list = [data.iloc[b]['intro'] for b in range(len(data))]
    similarity_list = story_sim(base_story_list, compare_story_list)
    
    # 태그 유사도
    tag_similar = tag_sim(data)
    # 장르 유사도
    genre_similar = genre_sim(data)
    
    plot_weight = 0.4
    tag_weight = 0.2
    genre_weight = 0.4

    result = {}
    title_no_list = data['titleID']
    for base_idx in range(len(data)):
        sims = []
        for compare_idx in range(len(data)):
            if base_idx == compare_idx:
                sims.append(0)
            tt = plot_weight * similarity_list[base_idx][compare_idx] + tag_weight * tag_similar[base_idx][compare_idx] + genre_weight * genre_similar[base_idx][compare_idx]
            sims.append(float(tt))
        result[title_no_list[base_idx]] = np.array(sims)

    with open('../Data/Result/Sentence.pkl', 'wb') as f:
        pickle.dump(result, f, pickle.HIGHEST_PROTOCOL)

    return

# 총괄 함수
def calc_similarity():
    print("Sentence Model Updating...")
    df = pd.read_csv("../Data/webtoonInfo.csv")
    df, del_tag_list = preprocessing_data(df)
    df = genre_classification(df, del_tag_list)
    # pickle로 저장
    get_sim_score(df)
