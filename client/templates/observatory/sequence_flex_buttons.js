/*
* JS file for sequence_flex_button.html
* Anchor tag propigation
*/

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
  Session.set('seqSplit', seqSplit);

  for (i=0;i<parameterPairs;i++) {
    var aTag = document.createElement("a");
    aTag.className = "seq-label unselectable"
    aTag.id = parametersObj[0]["children"]["label"+i].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "")+"ATagLabel";
    aTag.innerHTML = "<span>" + parametersObj[0]["children"]["label"+i] + "</span>"
    labelContainer.appendChild(aTag);
  }
  for (i=0;i<parameterPairs;i++) {
    $('#input').append("<div id=column"+i+" class=column-divs></div>")
    var inputContainer = document.getElementById("column"+i);
    for (j=0;j<seqSplit[i].length;j++) {
      if (seqSplit[i] == "text") {
        var input = document.createElement("input");
        var label = parametersObj[0]["children"]["label"+i];
        inputTagId = label.replace(/\s+/g, '').replace(/[^\w\s]|_/g, "");
        input.type = "text";
        input.id = inputTagId + "ITag";
        input.value = "";
        input.placeholder = label;
        input.className = "form-control"
        inputContainer.appendChild(input);
        break
      }
      //Adding values to aTag and the span in the aTag so the user can click on anything and we get the same thing from either a span event click or aTag event click
      var aTag = document.createElement("a");
      var attr1 = document.createAttribute("aTagId");
      var attr2 = document.createAttribute("aTagValue");
      var label = parametersObj[0]["children"]["label"+i];
      aTagId = label.replace(/\s+/g, '').replace(/[^\w\s]|_/g, "");
      attr1.value = aTagId;
      attr2.value = j;
      aTag.id = aTagId;
      aTag.className = "selectable "+aTagId+" unselectable pointer-cursor";
      aTag.innerHTML = "<span aTagId="+aTagId+" aTagValue="+j+">" + seqSplit[i][j] + "</span>"
      aTag.setAttributeNode(attr1);
      aTag.setAttributeNode(attr2);
      inputContainer.appendChild(aTag);
    }
  }
}
