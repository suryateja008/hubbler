$(document).ready(function () {
    $.get( "http://localhost:5000/formlist", function( data ) {
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
        var href = document.createElement("a");
        href.setAttribute("class","btn btn-primary btn-sm edit-button");
        para.setAttribute("class","cust-data");
        var id = data[i]['id'];
        href.innerHTML="Edit";
        href.setAttribute("href","edit.html?id="+id);
        var formdata = data[i]["formdata"].replace(/'/g,"\"");
        formdata = JSON.parse(formdata);
        para.append(formdata['form-name']);
        para.append(href);
        para.append(document.createElement('br'));
        space.append(para);
    }
}