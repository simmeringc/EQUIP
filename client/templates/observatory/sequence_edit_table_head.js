Template.sequenceObservatoryTableItem.rendered = function() {
  propigateSequenceTableHead();
}

function propigateSequenceTableHead() {

  var envId = Router.current().params._envId

  parametersObj = SequenceParameters.find({'children.envId':envId}).fetch();
  parameterPairs = parametersObj[0]["children"]["parameterPairs"]

  var split = []
  for (i=0;i<parameterPairs;i++) {
    split[i] = parametersObj[0]["children"]["label"+i]
  }

  $(".ftable_head").append("<td>#</td>");
  $(".ftable_head").append("<td>Name</td>");
  for (i=0;i<split.length;i++) {
    $(".ftable_head").append("<td>"+split[i]+"</td>");
  }
  $(".ftable_head").append("<td>Submitted</td>");
  $(".ftable_head").append("<td></td>");
}
