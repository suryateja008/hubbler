$(document).ready(function() {
    var url ="http://localhost";
    $("#create-form").click(function(){
        $.post(url+"/insertform", $("#form-data").val(), function(data) {
            alert(data);
            window.location.href = "/";
        });
    });

});


