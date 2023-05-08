from flask import Flask, request, render_template, session, url_for, redirect

app = Flask(__name__)
app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'
userinfo = {'Elice': '1q2w3e4r!!'}


@app.route("/")
def home():
    if session.get('logged_in'):
        return render_template('loggedin.html')
    else:
        return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        name = request.form['username']
        password = request.form['password']
        try:
            if (name in userinfo):
                # 2번을 해보세요!
                session["logged_in"] = True
                # 3번을 해보세요!
                return render_template('loggedin.html')
                # 4번을 해보세요!
            else:
                return '비밀번호가 틀립니다.'
            return '아이디가 없습니다.'
        except:
            return 'Dont login'
    else:
        return render_template('login.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # 4번을 해보세요!
        name = request.form['username']
        password = request.form['password']
        userinfo[name] = password

        return redirect(url_for('login'))
    else:
        return render_template('register.html')


@app.route("/logout")
def logout():
    session['logged_in'] = False
    return render_template('index.html')


if __name__ == '__main__':
    app.run()