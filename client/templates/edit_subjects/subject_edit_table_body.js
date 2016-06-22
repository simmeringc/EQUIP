Template.subjectEditTableBody.rendered = function() {
  propigateSubjectTableBody();
}

  $(".tr").append("<td></td>");<tr class="tr" subjId={{_id}}></tr>

function propigateSubjectTableBody() {

  var envId = Router.current().params._envId
  var subjId = $(".tr").attr('subjid');
  subjectObj = Subjects.find({_id:subjId}).fetch();
  parametersObj = SubjectParameters.find({'children.envId':envId}).fetch();
  parameterPairs = parametersObj[0]["children"]["parameterPairs"]

  var split = []
  for (i=0;i<parameterPairs;i++) {
    split[i] = parametersObj[0]["children"]["label"+i]
  }
  var literal = []
  for (i=0;i<parameterPairs;i++) {
    literal[i] = subjectObj[0][split[i]+"Literal"]
  }

  $(".tr").append("<td></td>");
  for (i=0;i<literal.length;i++) {
    $(".tr").append("<td>"+literal[i]+"</td>");
  }
  $(".tr").append("<td id=removeButton></td>")
  var button = container.appendChild(document.createElement("BUTTON"));
  button.innerHTML = "X";
  button.className = "btn btn-xs btn-danger deleteSubject"
  button.type = "button"
  document.getElementById("removeButton").appendChild(button);
}
