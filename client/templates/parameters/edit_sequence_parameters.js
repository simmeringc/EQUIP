var serialize = require('form-serialize');

Template.editSequenceParameters.helpers({
  environment: function() {
     return Environments.find({_id:Router.current().params._envId});
  }
});

function loadDefaultSeqParams() {
  labels = ["WCD Type", "Solicitation Method", "Wait Time", "Length of Talk", "Student Talk", "Teacher Soliciation", "Explicit Evaluation"]
  var container = document.getElementById("formRow");
  for (i=0;i<7;i++){
      var formCounter = $("#container input").length;
      container.appendChild(document.createTextNode("Parameter " + (formCounter/2)));
      // var remove = container.appendChild(document.createElement("BUTTON"));
      // remove.id = "remove" + (formCounter/2);
      // remove.innerHTML = "x";
      // remove.className = "remove-button btn btn-xs btn-danger"
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
      if (labels[i] == "WCD Type") {
        inputParameters.value = "Math,Non-Math"
      }
      if (labels[i] == "Solicitation Method") {
        inputParameters.value = "Called On,Not Called On"
      }
      if (labels[i] == "Wait Time") {
        inputParameters.value = "Less than 3 seconds,3 or more seconds,N/A"
      }
      if (labels[i] == "Length of Talk") {
        inputParameters.value = "1-4 words,5-20,21 or more"
      }
      if (labels[i] == "Student Talk") {
        inputParameters.value = "How,What,Why,Other"
      }
      if (labels[i] == "Teacher Soliciation") {
        inputParameters.value = "How,What,Why,Other"
      }
      if (labels[i] == "Explicit Evaluation") {
        inputParameters.value = "Yes,No"
      }
      container.appendChild(inputParameters);
      container.appendChild(document.createElement("br"));
    }
}

function addSeqFields() {
  var formCounter = $("#container input").length;
  var container = document.getElementById("formRow");
  var paramText = container.appendChild(document.createTextNode("Parameter " + (formCounter/2)));
  // var remove = container.appendChild(document.createElement("BUTTON"));
  // remove.id = "remove" + (formCounter/2);
  // remove.innerHTML = "x";
  // remove.className = "remove-button btn btn-xs btn-danger"
  var inputLabel = document.createElement("input");
  inputLabel.type = "text";
  inputLabel.name = "label" + (formCounter/2);
  inputLabel.className = "form-control"
  inputLabel.placeholder = "Enter the name of the parameter"
  container.appendChild(inputLabel);
  var inputParameters = document.createElement("input");
  inputParameters.type = "text";
  inputParameters.name = "parameter" + ((formCounter/2));
  inputParameters.className = "form-control"
  inputParameters.placeholder = "Enter selection options for the parameter or leave blank to allow for text input"
  container.appendChild(inputParameters);
  container.appendChild(document.createElement("br"));
}

Template.editSequenceParameters.events({
'click .seqParamsGoBack': function(e) {
   e.preventDefault();
   Router.go('editSubjectParameters', {_envId:Router.current().params._envId});
 },
'click #add_sequence_params': function(e) {
  e.preventDefault();
  addSeqFields();
 },
'click #remove_all': function(e) {
  e.preventDefault();
  $("#formRow").remove();
  $("#formSection").append("<form id=formRow></form>");
},
'click #load_current_sequence_params': function(e) {
  e.preventDefault();
  propigateEditSequenceForm();
},
// 'click .remove-button': function(e) {
//   e.preventDefault();
//   alert("Not Working");
// },
'click #save_subj_all': function(e) {
  e.preventDefault();
  var parameterPairs = (($("#container input").length)/2);
  var form = document.querySelector('#formRow');
  var obj = serialize(form, { hash: true });
  var extendObj = _.extend(obj, {
    envId: Router.current().params._envId,
    parameterPairs: parameterPairs
  });
  Meteor.call('updateSeqParameters', obj, function(error, result) {
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
    Router.go('environmentList');
  });
}
});

Template.editSequenceParameters.rendered = function() {
  propigateEditSequenceForm();
}

function propigateEditSequenceForm() {

  var envId = Router.current().params._envId
  var container = document.getElementById("formRow");

  parametersObj = SequenceParameters.find({'children.envId':envId}).fetch();
  parameterPairs = parametersObj[0]["children"]["parameterPairs"]

  var split = []
  for (i=0;i<parameterPairs;i++) {
    if (parametersObj[0]["children"]["parameter"+i] == null) {
      split[i] = "text";
      continue;
    }
    str = parametersObj[0]["children"]["parameter"+i]
    var strSplit = str.split(",");
    split[i] = strSplit
  }
  for (i=0;i<parameterPairs;i++) {
    var formCounter = $("#container input").length;
    container.appendChild(document.createTextNode("Parameter " + (formCounter/2)));
    // var remove = container.appendChild(document.createElement("BUTTON"));
    // remove.id = "remove" + (formCounter/2);
    // remove.innerHTML = "x";
    // remove.className = "remove-button btn btn-xs btn-danger"
    var inputLabel = document.createElement("input");
    inputLabel.type = "text";
    inputLabel.name = "label" + (formCounter/2);
    inputLabel.className = "form-control"
    inputLabel.value = parametersObj[0]["children"]["label"+i]
    container.appendChild(inputLabel);
    var inputParameters = document.createElement("input");
    inputParameters.type = "text";
    inputParameters.name = "parameter" + (formCounter/2);
    inputParameters.className = "form-control"
    if (split[i] == "text") {
      inputParameters.placeholder = "Leave blank to allow for text input."
    }
    else {
      var array = split[i]
      inputParameters.value = array.join();
    }
    container.appendChild(inputParameters);
    container.appendChild(document.createElement("br"));
  }
}
