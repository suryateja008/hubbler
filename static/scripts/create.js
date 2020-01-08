$(document).ready(function() {
    var url ="http://ec2-3-82-250-109.compute-1.amazonaws.com";
    $("#create-form").click(function(){
        $.post(url+"/insertform", $("#form-data").val(), function(data) {
            window.location.href = "/";
        });
    });

});


