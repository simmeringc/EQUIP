function loadDefaultParams(){
  labels = ["Name", "Age", "Race", "Gender"]
  {"defaultParameters":[
    "age":[
      {""}
    ]
]}
  var formContainer = document.getElementById("row");
  for (i=0;i<4;i++){
      container.appendChild(document.createTextNode("Parameter " + (i+1)));
      var inputLabel = document.createElement("input");
      inputLabel.type = "text";
      inputLabel.id = "label" + i+1;
      inputLabel.className = "form-control"
      inputLabel.value = labels[i]
      container.appendChild(inputLabel);
      var inputParameters = document.createElement("input");
      inputParameters.type = "text";
      inputParameters.id = "parameters" + i+1;
      inputParameters.className = "form-control"
      container.appendChild(inputParameters);
      container.appendChild(document.createElement("br"));
    }
}

Template.editParameters.events({
'click .paramsGoBack': function(e) {
   e.preventDefault();
   Router.go('environmentList');
 },
 'click #addParams': function(e) {
    e.preventDefault();
    addFields();
  },
  'click #load_default_subject_params': function(e) {
     e.preventDefault();
     loadDefaultParams();
   }
});
