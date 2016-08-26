/*
* JS file for sequence_environment_table_item.html
* Initial view table propigation
*/

Template.sequenceEnvironmentTableItem.rendered = function() {
  propigateSequenceTableHead();
}

function propigateSequenceTableHead() {

  var envId = Router.current().params._envId

  seqParametersObj = SequenceParameters.find({'children.envId':envId}).fetch();
  parameterPairs = seqParametersObj[0]["children"]["parameterPairs"]
  subjParametersObj = SubjectParameters.find({'children.envId':envId}).fetch();
  subjIdField = subjParametersObj[0]["children"]["label0"];

  var split = []
  for (i=0;i<parameterPairs;i++) {
    split[i] = seqParametersObj[0]["children"]["label"+i]
  }

  $(".ftable_head").append("<td>#</td>");
  $(".ftable_head").append("<td>"+subjIdField+"</td>");
  for (i=0;i<split.length;i++) {
    $(".ftable_head").append("<td>"+split[i]+"</td>");
  }
  $(".ftable_head").append("<td>Submitted</td>");
  $(".ftable_head").append("<td></td>");
}
