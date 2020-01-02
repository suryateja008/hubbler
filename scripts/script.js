$(document).ready(function() {
    document.getElementById("addNewBtn").addEventListener("click", addNew);
    printLocalData();
});

var localDataStore = [];
var dynamicFormFields = [
    {'field-name':'name', 'type':'text', 'required':true},
    {'field-name':'age', 'type':'number', 'min':18, 'max':65},
    {'field-name':'address', 'type':'multiline'}
];

function addNew() {
    createDynamicForm();
}


function createDynamicForm() {
    var form = $("#dynamicForm");
    form.html('');
    var formCard = document.createElement("div");
    formCard.setAttribute("class","card");
    var formBody = document.createElement("div");
    formBody.setAttribute("class","card-body form-space");
    form.append(formCard);formCard.append(formBody);
    var tempForm= document.createElement("form");
    tempForm.setAttribute("id","form1");
    tempForm.setAttribute("method","get");
    tempForm.setAttribute("onsubmit","return validateForm()");
    for(var i=0; i<dynamicFormFields.length;i++){
        var field = dynamicFormFields[i];
        switch (field["type"]) {
                case "text":
                    tempForm.append(buildFormField(field));
                break;
                case "number":
                    tempForm.append(buildFormField(field));
                break;
                case "multiline":
                    tempForm.append(buildInputMultiline(field));
                break;
                default:
        }
    }
    tempForm.append(submitButton());
    formBody.append(tempForm);
}

function validateForm() {
    var formData = {};
    var formFields = $("#form1").serializeArray();
    $.each(formFields, function(i, field){
        formData[field.name] = field.value;
    });
    console.log(formData);
    localDataStore.push(formData);
    printLocalData();
    return false;

}

function printLocalData() {
    var space = $("#showData");
    space.text("");
    for(var i = 0 ; i < localDataStore.length;i++) {
        var para = document.createElement("p");
        para.setAttribute("class","cust-data");
        para.append("Name:"+localDataStore[i].name);
        para.append(document.createElement('br'));
        if(localDataStore[i].age)
            para.append("Age:"+localDataStore[i].age);
        space.append(para);
    }
    $("#totalCount").text(localDataStore.length);
    $("#dynamicForm").html("");
}

function submitButton() {
    var para = document.createElement("p");
    var button = document.createElement("input");
    button.setAttribute("type","submit");
    button.setAttribute("class","btn btn-primary cust-add");
    para.append(button);
    return para
}

function buildFormField(fieldParam) {
    var para = document.createElement("p");
    para.setAttribute("class","cust-data");
    var input = document.createElement("input");
    if(fieldParam["field-name"])
        input.setAttribute("name",fieldParam["field-name"]);
    if(fieldParam["type"])
        input.setAttribute("type",fieldParam["type"]);
    if(fieldParam["required"])
        input.setAttribute("required",fieldParam["required"]);
    if(fieldParam["min"])
        input.setAttribute("min",fieldParam["min"]);
    if(fieldParam["max"])
        input.setAttribute("max",fieldParam["max"]);

    input.setAttribute("class",'form-control');
    para.append(fieldParam["field-name"].toUpperCase());
    para.append(document.createElement('br'));
    para.append(input);
    return para;

}

function buildInputMultiline(fieldParam) {
    var para = document.createElement("p");
    para.setAttribute("class","cust-data");
    var input = document.createElement("textarea");
    if(fieldParam["field-name"])
        input.setAttribute("name",fieldParam["field-name"]);
    if(fieldParam["required"])
        input.setAttribute("required",fieldParam["required"]);
    input.setAttribute("row",20);
    input.setAttribute("col",30);

    input.setAttribute("class",'form-control');
    para.append(fieldParam["field-name"].toUpperCase());
    para.append(document.createElement('br'));
    para.append(input);
    return para;
}

function buildDropDown() {
    
}