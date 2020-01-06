$(document).ready(function() {

    $("#create-form").click(function(){
        $.post("http://localhost:80/insertform", $("#form-data").val(), function(data) {
            alert(data);
            window.location.href = "/";
        });
    });

});


