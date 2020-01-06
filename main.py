from flask import Flask, request, render_template
import mysql.connector
from flask_cors import CORS
import json

app = Flask(__name__ , template_folder='templates')
CORS(app)

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    database="hubbler"
)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template("index.html")

@app.route('/edit', methods=['GET', 'POST'])
def editView():
    return render_template("edit.html")

@app.route('/create', methods=['GET', 'POST'])
def createView():
    return render_template("create.html")


@app.route('/formlist', methods=['GET'])
def formListData():
    list = []
    mycursor = mydb.cursor()
    mycursor.execute("select * from Forms")
    for x in mycursor:
        res = {}
        res["id"] = x[0]
        res["formdata"] = x[1].decode('utf-8').replace("\n","")
        list.append(res)
    return json.dumps(list)

@app.route('/formdata', methods=['POST'])
def formData():
    mycursor = mydb.cursor()
    id = request.get_data();
    mycursor.execute("select * from Forms where FormID="+id)
    for x in mycursor:
        res = {}
        res["id"] = x[0]
        res["formdata"] = x[1].decode('utf-8').replace("\n","")
    return json.dumps(res)


@app.route('/deleteform',methods=['POST'])
def deleteForm():
    formData = request.get_data()
    print formData
    mycursor = mydb.cursor()
    mycursor.execute("DELETE FROM Forms where FORMID="+formData)
    mydb.commit()
    mycursor.close()
    return "Success"

@app.route('/insertform',methods=['POST'])
def insertForm():
    formData = request.get_data()
    print formData
    mycursor = mydb.cursor()
    mycursor.execute("INSERT INTO Forms(form_fields) VALUES ("+json.dumps(formData)+")")
    mydb.commit()
    mycursor.close()
    return "Success"

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80)