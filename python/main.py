from flask import Flask, request, render_template
import mysql.connector
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    database="hubbler"
)

@app.route('/', methods=['GET', 'POST'])
def index():
    res = {}
    mycursor = mydb.cursor()
    mycursor.execute("select * from Forms")
    for x in mycursor:
        res["firstName"] = x[0]
        res["lastName"] = x[1].decode('utf-8').replace("\n","")
    return res


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
    app.run()