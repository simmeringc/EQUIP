/*
* JS file for subject_edit_table_head.html
* Initial view table propigation
*/

Template.subjectEditTableHead.rendered = function() {
  propigateSubjectTableHead();
}

function propigateSubjectTableHead() {

  var envId = Router.current().params._envId

  parametersObj = SubjectParameters.find({'children.envId':envId}).fetch();
  parameterPairs = parametersObj[0]["children"]["parameterPairs"]

  var split = []
  for (i=0;i<parameterPairs;i++) {
    split[i] = parametersObj[0]["children"]["label"+i]
  }

  $(".ftable_head").append("<td>#</td>");
  for (i=0;i<split.length;i++) {
    $(".ftable_head").append("<td>"+split[i]+"</td>");
  }
  $(".ftable_head").append("<td></td>");
}
