Template.observatory.created = function() {
  Session.set('envId', Router.current().params._envId);

  var labelsObj = SequenceParameters.find({'children.envId':Router.current().params._envId}).fetch();
  var parameterPairs = labelsObj[0]['children']['parameterPairs'];
  seqLabels = []
  for (i=0;i<parameterPairs;i++) {
    seqLabels[i] = labelsObj[0]['children']['label'+i].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "")
  }
  aTagSelectArray = []
}

Template.observatory.rendered = function() {
  var env = Environments.find({_id: Router.current().params._envId}).fetch()
  var inputStyle = env[0]["inputStyle"]
  if (inputStyle == "box") {
    $('#boxStyle').prop("checked",true);
  } else {
    $('#selectStyle').prop("checked",true);
  }
  var obj = Sequences.find({}).fetch();
  if ($.isEmptyObject(obj)) {
    $('.subject').addClass("light -blue-pulse");
  }
}

Template.observatory.helpers({
  subject: function() {
    return Subjects.find({envId: this.envId});
  },
  obsSequence: function() {
    return Sequences.find({obsId: Router.current().params._obsId});
  },
  seqParameter: function() {
    return SequenceParameters.find({'children.envId': this.envId})
  },
  subjName: function() {
    var subjId = Session.get('subjId');
    var parametersObj = SubjectParameters.find({'children.envId':Router.current().params._envId}).fetch();
    var subjIdParameter = parametersObj[0]["children"]["label0"]+"Literal"
    var subjectObj = Subjects.find({_id:subjId}).fetch();
    var subjName = subjectObj[0][subjIdParameter]
    return subjName;
  }
});

Template.observatory.events({
  'click .obsDone': function(e) {
    Router.go('observationList', {_envId:Router.current().params._envId});
  },
  'click .input-style': function(e) {
    var obj = {
      envId: Router.current().params._envId,
      inputStyle: $(e.target).val()
    };
    Meteor.call('updateInputStyle', obj, function(error, result) {
      if (error) {
        alert(error.reason);
      } else {
        return 0;
      }
    });
  },
  'click .selectable': function(e) {
     e.preventDefault();
     eId = $(e.target).attr("aTagId");
     eValue = $(e.target).attr("aTagValue");
     $("."+eId).each(function() {
       if ($(this).hasClass('deselectable')) {
         $(this).toggleClass("deselectable");
         $(this).toggleClass("selectable");
       }
     });
     $(e.currentTarget).toggleClass("selectable");
     $(e.currentTarget).toggleClass("deselectable");
     aTagSelectionInsert(eId, eValue);
   },
   'click .deselectable': function(e) {
      e.preventDefault();
      eId = $(e.target).attr("aTagId");
      eValue = null;
      $(e.currentTarget).toggleClass("deselectable");
      $(e.currentTarget).toggleClass("selectable");
      aTagSelectionInsert(eId, eValue);
    },
  //sequence started in subject_item.js
  'click #saveSequenceBox': function(e) {
    var subjId = Session.get('subjId');
    var observation=Observations.find({"_id":Router.current().params._obsId}).fetch();
    var obsName=observation[0]["name"];
    var parametersObj = SubjectParameters.find({'children.envId':Router.current().params._envId}).fetch();
    var subjIdParameter = parametersObj[0]["children"]["label0"]+"Literal"
    var subjectObj = Subjects.find({_id:subjId}).fetch();
    var subjName = subjectObj[0][subjIdParameter]
    Session.set("subjName", subjName);

   var sequence = {
     subjId: subjId,
     subjName: subjName,
     envId: Router.current().params._envId,
     obsId: Router.current().params._obsId,
     obsName: obsName,
     valueInput: {},
     valueLiteral: {}
   };

   var seqSplit = Session.get('seqSplit');
   for (i=0;i<seqLabels.length;i++) {
     label = seqLabels[i];
     literal = seqLabels[i] + "Literal";
     optionVal = aTagSelectArray[i]
     sequence["valueInput"][label] = optionVal
     if (seqSplit[i][optionVal] == undefined) {
       sequence["valueLiteral"][literal] = $('#'+label+"ITag").val() || "Undefined";
       continue
     }
     sequence["valueLiteral"][literal] = seqSplit[i][optionVal];
   }

   Meteor.call('sequenceInsert', sequence, function(error, result) {
     if (error) {
       alert(error.reason);
     } else {
       propigateSequenceTableBody();
       $('.subject').removeClass("light -blue-pulse");
     }
   });
   //toggle deselect
   $('a').each(function() {
     if ($(this).hasClass('deselectable')) {
       $(this).toggleClass("deselectable");
       $(this).toggleClass("selectable");
     }
   });
   $('#createBoxModal').modal('hide');
  },
   'click .editSequences': function(e) {
    propigateSequenceTableBody();
    $('#editSequencesPopup').modal({
      keyboard: true,
      show: true
    });
  },
  'click #saveSequenceEdits': function(e) {
    $('#editSequencesPopup').modal('hide');
  },
  'click #saveSequenceSelect': function(e) {

   var subjId = Session.get('subjId');
   var observation=Observations.find({"_id":Router.current().params._obsId}).fetch();
   var obsName=observation[0]["name"];
   var parametersObj = SubjectParameters.find({'children.envId':Router.current().params._envId}).fetch();
   var subjIdParameter = parametersObj[0]["children"]["label0"]+"Literal"
   var subjectObj = Subjects.find({_id:subjId}).fetch();
   var subjName = subjectObj[0][subjIdParameter]
   Session.set(subjName, subjName);

   var sequence = {
     subjId: subjId,
     subjName: subjName,
     envId: Router.current().params._envId,
     obsId: Router.current().params._obsId,
     obsName: obsName,
     valueInput: {},
     valueLiteral: {}
   };

   var seqSplit = Session.get('seqSplit');
   for (i=0;i<seqLabels.length;i++) {
     label = seqLabels[i];
     literal = seqLabels[i] + "Literal";
     optionVal = $("[name="+label+"]").val();
     sequence["valueInput"][label] = optionVal
     if (seqSplit[i][optionVal] == undefined) {
       sequence["valueLiteral"][literal] = optionVal
       continue
     }
     sequence["valueLiteral"][literal] = seqSplit[i][optionVal];
   }

   Meteor.call('sequenceInsert', sequence, function(error, result) {
     if (error) {
       alert(error.reason);
     } else {
       propigateSequenceTableBody();
       $('.subject').removeClass("light -blue-pulse");
     }
   });
   $('#createSelectModal').modal('hide');
  },

   'click .editSequences': function(e) {
    propigateSequenceTableBody();
    $('#editSequencesPopup').modal({
      keyboard: true,
      show: true
    });
  },

  'click #saveSequenceEdits': function(e) {
    $('#editSequencesPopup').modal('hide');
  },
  'click .deleteSequence': function(e) {
    var result = confirm("Press 'OK' to delete this Sequence.");
    seqId = $(e.target).attr("seqId");
    Meteor.call('sequenceDelete', seqId, function(error, result) {
      return 0;
    });
    propigateSequenceTableBody();
  }
});

 function propigateSequenceTableBody() {
   $(".tbody").remove();
   $(".ftable").append("<tbody class=tbody></tbody>");
   var seqTableCounter=1;
   var envId = Router.current().params._envId
   var obsId = Router.current().params._obsId
   var parametersObj = SequenceParameters.find({'children.envId':envId}).fetch();
   var parameterPairs = parametersObj[0]["children"]["parameterPairs"]
   var seqCursor = Sequences.find({obsId: obsId})
   seqCursor.forEach(function(doc, index) {
     subjName = doc["subjName"]
     seqId = doc["_id"];
     newRowContent = "<tr class=trbody id=td"+index+"><tr>";
     $(".tbody").append(newRowContent);
     var split = []
     for (j=0;j<parameterPairs;j++) {
       split[j] = parametersObj[0]["children"]["label"+j].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "")
     }
     var literal = []
     for (j=0;j<parameterPairs;j++) {
       literal[j] = doc["valueLiteral"][split[j]+"Literal"]
     }
     $("#"+"td"+index).append("<td></td>");
     $("#"+"td"+index).append("<td>"+subjName+"</td>");
     for (j=0;j<literal.length;j++) {
       $("#"+"td"+index).append("<td>"+literal[j]+"</td>");
     }
     date = "<td>"+doc["submitted"]+"</td>"
     $("#"+"td"+index).append(date);
     removeButton = "<td><button seqId="+seqId+" id=b"+index+">X</button></td>";
     $("#"+"td"+index).append(removeButton);
     $("#"+"b"+index).addClass("btn btn-xs btn-danger deleteSequence");
     $('tr').each(function () {
          if (!$.trim($(this).text())) $(this).remove();
     });
   });
 };

function aTagSelectionInsert(eId, eValue) {
  for (i=0;i<parameterPairs;i++) {
    if (seqLabels[i] == eId) {
      aTagSelectArray[i] = eValue;
    }
  }
}
