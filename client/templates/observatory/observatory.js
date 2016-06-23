Template.observatory.created = function() {
  Session.set('envId', Router.current().params._envId);
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
});

Template.observatory.events({
  'click .obsDone': function(e) {
    Router.go('observationList', {_envId:Router.current().params._envId});
  },
  'click .deleteSequence': function(e) {
    Session.set('sequenceId', this._id);
  },
  //sequence started in subject_item.js
  'click #saveSequence': function(e) {

    var seqObsCount = Sequences.find({obsId: Router.current().params._obsId}).count()+1;
    var seqEnvCount = Sequences.find({envId: Router.current().params._envId}).count()+1;
    var seqLabels = []
    var labelsObj = SequenceParameters.find({'children.envId':Router.current().params._envId}).fetch();
    for (i=0;i<labelsObj[0]['children']['parameterPairs'];i++) {
      seqLabels[i] = labelsObj[0]['children']['label'+i].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "")
    }

    var subjId = Session.get('subjId');
    var subject = Subjects.find({"_id":subjId}).fetch();
    var observation=Observations.find({"_id":Router.current().params._obsId}).fetch();
    var obsName=observation[0]["name"];
    var parametersObj = SubjectParameters.find({'children.envId':Router.current().params._envId}).fetch();
    var subjIdParameter = parametersObj[0]["children"]["label0"]
    var subjectObj = Subjects.find({_id:subjId}).fetch();
    var subjName = subjectObj[0][subjIdParameter]

   var sequence = {
     subjId: subjId,
     subjName: subjName,
     envId: Router.current().params._envId,
     obsId: Router.current().params._obsId,
     obsName: obsName,
     seqObsCount: seqObsCount,
     seqEnvCount: seqEnvCount
   };

   var seqSplit = Session.get('seqSplit');
   for (i=0;i<seqLabels.length;i++) {
     label = seqLabels[i];
     literal = seqLabels[i] + "Literal";
     optionVal = $('#'+label).val();
     sequence[label] = optionVal
     if (seqSplit[i][optionVal] == undefined) {
       sequence[literal] = $('#'+label).val();
       continue
     }
     sequence[literal] = seqSplit[i][optionVal];
   }
   console.log(sequence)

   Meteor.call('sequenceInsert', sequence, function(error, result) {
     if (error) {
       alert(error.reason);
     } else {
       propigateSequenceTableBody();
     }
   });
   $('#createSequence').modal('hide');
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
  }
});

/*Start Sequence Delete Block, Confirmation is a package*/
 Template.observatory.rendered=function() {
     $('.deleteSequence').confirmation({
       onConfirm : function(){
         var sequenceId = Session.get('sequenceId');
       Meteor.call('sequenceDelete', sequenceId, function(error, result) {
         return 0;
       });
       }
    });
 }
 /*End Sequence Delete Block*/

 function propigateSequenceTableBody() {
   $(".tbody").remove();
   $(".ftable").append("<tbody class=tbody></tbody>");
   var seqTableCounter=1;
   var envId = Router.current().params._envId
   var sequences = Sequences.find({obsId: Router.current().params._obsId})
   var seqObsCount = sequences.count();
   var parametersObj = SequenceParameters.find({'children.envId':envId}).fetch();
   var parameterPairs = parametersObj[0]["children"]["parameterPairs"]
   for (i=0;i<seqObsCount;i++) {
     sequenceObj = Sequences.find({seqObsCount:seqTableCounter}).fetch();
     subjName = sequenceObj[0]["subjName"]

     newRowContent = "<tr class=trbody id=td"+i+"><tr>";
     $(".tbody").append(newRowContent);

     var split = []
     for (j=0;j<parameterPairs;j++) {
       split[j] = parametersObj[0]["children"]["label"+j].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "")
     }
     var literal = []
     for (j=0;j<parameterPairs;j++) {
       literal[j] = sequenceObj[0][split[j]+"Literal"]
     }

     $("#"+"td"+i).append("<td></td>");
     $("#"+"td"+i).append("<td>"+subjName+"</td>");
     for (j=0;j<literal.length;j++) {
       $("#"+"td"+i).append("<td>"+literal[j]+"</td>");
     }
     date = "<td>"+sequenceObj[0]["submitted"]+"</td>"
     $("#"+"td"+i).append(date);
     removeButton = "<td><button id=b"+i+">X</button></td>";
     $("#"+"td"+i).append(removeButton);
     $("#"+"b"+i).addClass("btn btn-xs btn-danger deleteSubject");
     console.log(seqTableCounter);
     seqTableCounter++;
   }
   $('tr').each(function () {
        if (!$.trim($(this).text())) $(this).remove();
   });
 }
