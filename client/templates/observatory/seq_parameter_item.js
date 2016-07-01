Template.sequenceParameterItem.rendered = function() {
  propigateSubjectForm();
}

function propigateSubjectForm() {

  var envId = Session.get('envId');
  var container = document.getElementById("parameter_select_propigration");

  parametersObj = SequenceParameters.find({'children.envId':envId}).fetch();
  parameterPairs = parametersObj[0]["children"]["parameterPairs"]

  var seqSplit = []
  for (i=0;i<parameterPairs;i++) {
    if (parametersObj[0]["children"]["parameter"+i] == null) {
      seqSplit[i] = "text";
      continue;
    }
    str = parametersObj[0]["children"]["parameter"+i]
    var strSplit = str.split(",");
    seqSplit[i] = strSplit
  }
  Session.set('seqSplit', seqSplit);

  for (i=0;i<parameterPairs;i++) {
      if (seqSplit[i] == "text") {
        var input = document.createElement("input");
        input.type = "text";
        input.id = parametersObj[0]["children"]["label"+i].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "");
        input.name = parametersObj[0]["children"]["label"+i].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "");
        input.value = "";
        input.placeholder = parametersObj[0]["children"]["label"+i];
        input.className = "form-control"
        container.appendChild(input);
        container.appendChild(document.createElement("br"));
        continue;
      }
      var select = document.createElement("select");
      select.type = "text";
      select.id = parametersObj[0]["children"]["label"+i].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "");
      select.name = parametersObj[0]["children"]["label"+i].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "");
      select.className = "form-control"
      select.placeholder = parametersObj[0]["children"]["label"+i];
      container.appendChild(select);
        for(j=0;j<seqSplit[i].length;j++) {
          if (j == 0) {
            var placeholderOption = document.createElement("option");
            placeholderOption.text = parametersObj[0]["children"]["label"+i];
            placeholderOption.selected = true;
            placeholderOption.value = '';
            select.appendChild(placeholderOption);
          }
          var option = document.createElement("option");
          option.text = seqSplit[i][j];
          option.value = j;
          select.appendChild(option);
        }
      container.appendChild(document.createElement("br"));
    }
}
