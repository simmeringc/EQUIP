Template.sequenceFlexButtons.rendered = function() {
  propigateFlexButtons();
}

function propigateFlexButtons() {
  var envId = Session.get('envId');
  var labelContainer = document.getElementById("labels");

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
  console.log(seqSplit);
  Session.set('seqSplit', seqSplit);

  for (i=0;i<parameterPairs;i++) {
      // if (seqSplit[i] == "text") {
      //   var input = document.createElement("input");
      //   input.type = "text";
      //   input.id = parametersObj[0]["children"]["label"+i].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "");
      //   input.name = parametersObj[0]["children"]["label"+i].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "");
      //   input.value = "";
      //   input.placeholder = parametersObj[0]["children"]["label"+i];
      //   input.className = "form-control"
      //   labelContainer.appendChild(input);
      //   labelContainer.appendChild(document.createElement("br"));
      //   continue;
      // }
      var aTag = document.createElement("a");
      aTag.setAttribute = ("href", "#");
      aTag.id = parametersObj[0]["children"]["label"+i].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "");
      aTag.innerHTML = "<span>" + parametersObj[0]["children"]["label"+i] + "</span>"
      labelContainer.appendChild(aTag);
    }
  for (i=0;i<parameterPairs;i++) {
    $('#input').append("<div id=column"+i+" class=column-divs></div>")
    var inputContainer = document.getElementById("column"+i);
    for (j=0;j<seqSplit[i].length;j++) {
      // if (j == 0) {
      //   var placeholderOption = document.createElement("option");
      //   placeholderOption.text = parametersObj[0]["children"]["label"+i];
      //   placeholderOption.selected = true;
      //   placeholderOption.value = '';
      //   select.appendChild(placeholderOption);
      // }
      var aTag = document.createElement("a");
      aTag.setAttribute = ("href", "#");
      aTag.id = ""
      aTag.innerHTML = "<span>" + seqSplit[i][j] + "</span>"
      inputContainer.appendChild(aTag);
    }
  }
}
