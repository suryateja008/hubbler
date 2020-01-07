$(document).ready(function () {
    var serverUrl = "http://localhost";
    var url_string =  window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");

    $.post( serverUrl+"/formdata", id, function( data ) {
        var jsondata = JSON.parse(data);
        printForm(jsondata);
    });

    $("#update-form").click(function(){
        $.post(serverUrl+"/insertform", $("#formdata").val(), function(data) {
            $.post(serverUrl+"/deleteform",id, function(data) {
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

