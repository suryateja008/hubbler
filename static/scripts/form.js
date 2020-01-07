$(document).ready(function () {
    var url = "http://ec2-3-82-250-109.compute-1.amazonaws.com/";
    $.get( url+"/formlist", function( data ) {
        var jsondata = JSON.parse(data);
        printFormList(jsondata);
    });
});


function printFormList(data) {
    var space = $("#showData");
    space.text("");
    $("#totalForms").text(data.length);
    for(var i=0; i < data.length; i++) {
        var para = document.createElement("p");
        var edithref = document.createElement("a");
        var inputhref = document.createElement("a");
        edithref.setAttribute("class","btn btn-primary btn-sm edit-button");
        inputhref.setAttribute("class","btn btn-primary btn-sm edit-button");
        para.setAttribute("class","cust-data");
        var id = data[i]['id'];
        inputhref.innerHTML= "Input";
        edithref.innerHTML="Edit";
        edithref.setAttribute("href","/edit?id="+id);
        inputhref.setAttribute("href","/input?id="+id);
        var formdata = data[i]["formdata"].replace(/'/g,"\"");
        formdata = JSON.parse(formdata);
        para.append(formdata['form-name']);
        para.append(edithref);
        para.append(inputhref);
        para.append(document.createElement('br'));
        space.append(para);
    }
}