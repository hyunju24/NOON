import sqlite3
from flask import Flask, render_template, abort, jsonify, Response, request
from flask_cors import CORS
from Models import recommend


app = Flask(__name__)
cors = CORS(app, resources={r"/api/": {"origins": ""}})

conn = sqlite3.connect('./webtoonInfo.db', check_same_thread=False)
cur = conn.cursor()


@app.route('/sql_read_col')
def sql_read_col():
    cur.execute("select titleId, title, imgPath from webtoonInfo")
    rows = cur.fetchall()

    titleId = [row[0] for row in rows]
    titles = [row[1] for row in rows]
    imgPaths = [row[2] for row in rows]

    items = [{'titleId': titleId, 'title': title, 'imgPath': imgPath} for titleId, title, imgPath in zip(titleId, titles, imgPaths)]

    return jsonify(items)


# 프론트로 입력값 받기, 추천 결과 프론트로 전달
@app.route('/get_webtoon', methods=['POST'])
def get_webtoon():
    # 프론트에서 titleID 5개 받아옴
    selected_webtoons = request.get_json()

    result1, result2 = recommend.recommend(selected_webtoons)

    # 줄거리 유사도 결과 DB
    # SQL문에서 IN 연산자를 사용하여 titleId 리스트에 해당하는 정보만 추출
    cur.execute("SELECT titleId, title, imgPath FROM webtoonInfo WHERE titleId IN ({})".format(','.join(map(str,result1))))
    rows1 = cur.fetchall()

    # 추출된 열(column) 값들을 딕셔너리로 묶기
    items1 = [{'titleId': row[0], 'title': row[1], 'imgPath': row[2]} for row in rows1]
    
    # 그림체 유사도 결과 DB
    cur.execute("SELECT titleId, title, imgPath FROM webtoonInfo WHERE titleId IN ({})".format(','.join(map(str,result2))))
    rows2 = cur.fetchall()

    items2 = [{'titleId': row[0], 'title': row[1], 'imgPath': row[2]} for row in rows2]

    return jsonify({'items1': items1, 'items2': items2})


# 인기웹툰 상위 5개 출력
@app.route('/top_web', methods=['GET'])
def top_web():
    cur.execute("select titleId, title, imgPath, interested_user_cnt from webtoonInfo ORDER BY interested_user_cnt DESC LIMIT 5")
    rows = cur.fetchall()

    # 열(column)의 값 추출
    titleId = [row[0] for row in rows]
    titles = [row[1] for row in rows]
    imgPaths = [row[2] for row in rows]

    # 추출된 열(column) 값들을 딕셔너리로 묶기
    items2 = [{'titleId': titleId, 'title': title, 'imgPath': imgPath} for titleId, title, imgPath in zip(titleId, titles, imgPaths)]
    
    # # 추출된 열(column) 값들을 딕셔너리로 묶기
    # items = [{'titleId': row[0], 'title': row[1], 'imgPath': row[2], 'interested_user_cnt': row[3]} for row in rows]

    return jsonify(items2)



if __name__=="__main__":
    app.run(host='0.0.0.0', port=8000)