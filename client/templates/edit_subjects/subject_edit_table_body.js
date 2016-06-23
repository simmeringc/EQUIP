Template.subjectEditTableBody.rendered = function() {
  propigateSubjectTableBody();
}

function propigateSubjectTableBody() {
  var envId = Router.current().params._envId
  var subjCount = Subjects.find({envId: envId}).count();
  var counter=1;
  $(".trbody").remove();
  subjectObj = Subjects.find({subjCount:subjCount}).fetch();
  parametersObj = SubjectParameters.find({'children.envId':envId}).fetch();
  parameterPairs = parametersObj[0]["children"]["parameterPairs"]
  for (i=0;i<subjCount;i++) {
    newRowContent = "<tr class=trbody id="+i+"><tr>";
    $(".tbody").append(newRowContent);

    var split = []
    for (j=0;j<parameterPairs;j++) {
      split[j] = parametersObj[0]["children"]["label"+j]
    }
    var literal = []
    for (j=0;j<parameterPairs;j++) {
      literal[j] = subjectObj[0][split[j]+"Literal"]
    }

    $("#"+i).append("<td></td>");
    for (j=0;j<literal.length;j++) {
      $("#"+i).append("<td>"+literal[j]+"</td>");
    }
    $("#"+i).append("<td id=removeButton></td>")
    counter = counter + 1;

    // var button = document.createElement("BUTTON");
    // button.innerHTML = "X";
    // button.className = "btn btn-xs btn-danger deleteSubject"
    // button.type = "button"
    // document.getElementById("removeButton").appendChild(button);
  }
}
