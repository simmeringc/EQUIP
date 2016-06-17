Template.subjParameterItem.rendered = function() {
  propigateSubjectForm();
}

function propigateSubjectForm() {

  var envId = Session.get('envId');
  var container = document.getElementById("parameter_select_propigration");

  parametersObj = Parameters.find({'children.envId':envId}).fetch();
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
      if (split[i] == "text") {
        var input = document.createElement("input");
        input.type = "text";
        input.name = parametersObj[0]["children"]["label"+i];
        input.value = "";
        input.placeholder = parametersObj[0]["children"]["label"+i];
        input.className = "form-control"
        container.appendChild(input);
        container.appendChild(document.createElement("br"));
        continue;
      }
      var select = document.createElement("select");
      select.type = "text";
      select.name = parametersObj[0]["children"]["label"+i];
      select.className = "form-control"
      select.placeholder = parametersObj[0]["children"]["label"+i];
      container.appendChild(select);
        for(j=0;j<split[i].length;j++){
          if (j == 0) {
            var placeholderOption = document.createElement("option");
            placeholderOption.text = parametersObj[0]["children"]["label"+i];
            placeholderOption.selected = true;
            select.appendChild(placeholderOption);
          }
          var option = document.createElement("option");
          option.text = split[i][j];
          option.value = j;
          select.appendChild(option);
        }
      container.appendChild(document.createElement("br"));
    }
}
