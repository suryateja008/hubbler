$(document).ready(function() {

    $("#create-form").click(function(){
        $.post("http://ec2-3-82-250-109.compute-1.amazonaws.com:80/insertform", $("#form-data").val(), function(data) {
            alert(data);
            window.location.href = "/";
        });
    });

});


