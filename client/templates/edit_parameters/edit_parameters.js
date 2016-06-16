var serialize = require('form-serialize');

function loadDefaultParams(){
  labels = ["Name", "Age", "Race", "Gender"]
  var container = document.getElementById("formRow");
  for (i=0;i<4;i++){
      var formCounter = $("#container input").length;
      container.appendChild(document.createTextNode("Parameter " + ((formCounter/2) - 0.5)));
      var remove = container.appendChild(document.createElement("BUTTON"));
      remove.id = "remove" + ((formCounter/2) - 0.5);
      remove.innerHTML = "x";
      remove.className = "remove-button btn btn-xs btn-danger"
      var inputLabel = document.createElement("input");
      inputLabel.type = "text";
      inputLabel.name = "label" + ((formCounter/2) - 0.5);
      inputLabel.className = "form-control"
      inputLabel.value = labels[i]
      container.appendChild(inputLabel);
      var inputParameters = document.createElement("input");
      inputParameters.type = "text";
      inputParameters.name = "parameters" + ((formCounter/2) - 0.5);
      inputParameters.className = "form-control"
      if (labels[i] == "Name") {
        inputParameters.placeholder = "Leave blank to allow for any text input"
      }
      if (labels[i] == "Age") {
        inputParameters.value = "0 - 10,10 - 15,15 - 20,20 - 25,Unknown"
      }
      if (labels[i] == "Race") {
        inputParameters.value = "American Indian or Alaska Native,Asian,Black or African American,Native Hawaiian or Other Pacific Islander,White,Hispanic or Latino,Unknown"
      }
      if (labels[i] == "Gender") {
        inputParameters.value = "Male,Female,Other,Unknown"
      }
      container.appendChild(inputParameters);
      container.appendChild(document.createElement("br"));
    }
}

function addFields(){
  var formCounter = $("#container input").length;
  var container = document.getElementById("formRow");
  var paramText = container.appendChild(document.createTextNode("Parameter " + ((formCounter/2) - 0.5)));
  var remove = container.appendChild(document.createElement("BUTTON"));
  remove.id = "remove" + ((formCounter/2) - 0.5);
  remove.innerHTML = "x";
  remove.className = "remove-button btn btn-xs btn-danger"
  var inputLabel = document.createElement("input");
  inputLabel.type = "text";
  inputLabel.name = "label" + ((formCounter/2) - 0.5);
  inputLabel.className = "form-control"
  inputLabel.placeholder = "Enter the name of the parameter"
  container.appendChild(inputLabel);
  var inputParameters = document.createElement("input");
  inputParameters.type = "text";
  inputParameters.name = "parameters" + (((formCounter/2) - 0.5));
  inputParameters.className = "form-control"
  inputParameters.placeholder = "Enter selection options for the parameter"
  container.appendChild(inputParameters);
  container.appendChild(document.createElement("br"));
}

Template.editParameters.events({
'click .paramsGoBack': function(e) {
   e.preventDefault();
   Router.go('environmentList');
 },
'click #add_subject_params': function(e) {
  e.preventDefault();
  addFields();
 },
'click #load_default_subject_params': function(e) {
  e.preventDefault();
  loadDefaultParams();
},
'click #remove_all_params': function(e) {
  e.preventDefault();
  $("#formRow").remove();
  $("#container").append("<form id=formRow></form>");
},
'click .remove-button': function(e) {
  e.preventDefault();
  alert("Using raw JS instead of items");
},
'click #save_subj_all': function(e) {
  e.preventDefault();
  var form = document.querySelector('#formRow');
  var obj = serialize(form, { hash: true });
  Meteor.call('envSubjCollectionCreate', obj, function(error, result) {
    return 0;
  });
}
});
