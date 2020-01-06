$(document).ready(function() {

    $("#create-form").click(function(){
        $.post("http://localhost:5000/insertform", $("#form-data").val(), function(data) {
            alert(data);
            window.location.href = "index.html";
        });
    });

});


