var serialize = require('form-serialize');

Template.subjectParameters.helpers({
  environment: function() {
     return Environments.find({_id:Router.current().params._envId});
  }
});

function loadDefaultSubjParams() {
  labels = ["Name", "Age", "Race", "Gender"]
  var container = document.getElementById("formRow");
  for (i=0;i<4;i++){
      var formCounter = $("#container input").length;
      container.appendChild(document.createTextNode("Parameter " + (formCounter/2)));
      var remove = container.appendChild(document.createElement("BUTTON"));
      remove.id = "remove" + (formCounter/2);
      remove.innerHTML = "x";
      remove.className = "remove-button btn btn-xs btn-danger"
      var inputLabel = document.createElement("input");
      inputLabel.type = "text";
      inputLabel.name = "label" + (formCounter/2);
      inputLabel.className = "form-control"
      inputLabel.value = labels[i]
      container.appendChild(inputLabel);
      var inputParameters = document.createElement("input");
      inputParameters.type = "text";
      inputParameters.name = "parameter" + (formCounter/2);
      inputParameters.className = "form-control"
      if (labels[i] == "Name") {
        inputParameters.placeholder = "Leave blank to allow for text input."
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

function addSubjFields() {
  var formCounter = $("#container input").length;
  var container = document.getElementById("formRow");
  var paramText = container.appendChild(document.createTextNode("Parameter " + (formCounter/2)));
  var remove = container.appendChild(document.createElement("BUTTON"));
  remove.id = "remove" + (formCounter/2);
  remove.innerHTML = "x";
  remove.className = "remove-button btn btn-xs btn-danger"
  var inputLabel = document.createElement("input");
  inputLabel.type = "text";
  inputLabel.name = "label" + (formCounter/2);
  inputLabel.className = "form-control"
  inputLabel.placeholder = "Enter the name of the parameter."
  container.appendChild(inputLabel);
  var inputParameters = document.createElement("input");
  inputParameters.type = "text";
  inputParameters.name = "parameter" + ((formCounter/2));
  inputParameters.className = "form-control"
  inputParameters.placeholder = "Enter selection options for the parameter or leave blank to allow for text input."
  container.appendChild(inputParameters);
  container.appendChild(document.createElement("br"));
}

Template.subjectParameters.events({
'click .subjParamsGoBack': function(e) {
   e.preventDefault();
   Router.go('environmentList');
 },
'click #add_subject_params': function(e) {
  e.preventDefault();
  addSubjFields();
 },
'click #load_default_subject_params': function(e) {
  e.preventDefault();
  loadDefaultSubjParams();
},
'click #remove_all': function(e) {
  e.preventDefault();
  $("#formRow").remove();
  $("#formSection").append("<form id=formRow></form>");
},
'click .remove-button': function(e) {
  e.preventDefault();
  alert("Not Working");
},
'click #save_subj_all': function(e) {
  e.preventDefault();
  var parameterPairs = (($("#container input").length)/2);
  var form = document.querySelector('#formRow');
  var obj = serialize(form, { hash: true });
  var extendObj = _.extend(obj, {
    envId: Router.current().params._envId,
    parameterPairs: parameterPairs
  });
  Meteor.call('subjParameters', obj, function(error, result) {
    if (error){
      alert(error.reason);
    } else {
      toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }
      Command: toastr["success"]("Save Successful", "Subject Parameters")
    }
    Router.go('sequenceParameters', {_envId:Router.current().params._envId, _subjParamsId:result._subjParamsId});
  });
}
});
