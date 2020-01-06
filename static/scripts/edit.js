$(document).ready(function () {
    var url_string =  window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");

    $.post( "http://localhost:80/formdata", id, function( data ) {
        var jsondata = JSON.parse(data);
        printForm(jsondata);
    });

    $("#update-form").click(function(){
        $.post("http://localhost:80/insertform", $("#formdata").val(), function(data) {
            $.post("http://localhost:80/deleteform",id, function(data) {
                    alert(data);
                window.location.href = "/";
            });
        });
    });
});

function printForm(data) {
        var formdata = data["formdata"];
        $("#formdata").val(formdata);
}

