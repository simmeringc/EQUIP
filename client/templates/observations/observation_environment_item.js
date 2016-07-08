Template.observationEnvironmentItem.helpers({
  envSequence: function() {
    return Sequences.find({envId: Router.current().params._envId});
  },
  needsSetup: function() {
    var obj = Subjects.find({envId: Router.current().params._envId}).fetch();
    return $.isEmptyObject(obj);
  },
  needsObservations: function() {
    var obj = Observations.find({envId: this._id}).fetch();
    return $.isEmptyObject(obj)?"green-pulse":"";
  }
});

Template.observationEnvironmentItem.events({
  'click .editObsItem': function(e) {
     e.preventDefault();
     Router.go('editSubjects', {_envId:this._id});
  },

  'click #createNewObservation': function(e) {
    $('#createObsPopup').modal({
      keyboard: true,
      show: true
    });
    $('#createObsPopup').on('shown.bs.modal', function () {
      $('#obsName').focus();
    })
  },

  'click #saveName': function(e) {

    var observation = {
      name: $('#obsName').val(),
      envId: this._id
    };

    Meteor.call('observationInsert', observation, function(error, result) {
      return 0;
    });

    $('#createObsPopup').modal('hide');
    $('#observationName').val('');
  },
  'click .allSequences': function(e) {
   propigateSequenceTableBody();
   $('#allSequencesPopup').modal({
     keyboard: true,
     show: true
   });
 },
 'click #saveAllSequences': function(e) {
   $('#allSequencesPopup').modal('hide');
 }
});

/*Start allSequence Delete Block, Confirmation is a package*/
Template.observationEnvironmentItem.rendered=function() {
    $('.deleteSequence').confirmation({
      onConfirm : function(){
    }
  });
}

Template.observationEnvironmentItem.events({
   'click .deleteSequence': function(e) {
     Session.set('sequenceId', this._id);
   }
 });

 Template.observationEnvironmentItem.rendered=function() {
     $('.deleteSequence').confirmation({
       onConfirm : function(){
         var sequenceId = Session.get('sequenceId');
       Meteor.call('sequenceDelete', sequenceId, function(error, result) {
         return 0;
       });
       }
    });
    var obj = Sequences.find({}).fetch();
    if ($.isEmptyObject(obj)) {
      $('[data-toggle="popover6"]').popover('show').on('click',function(){ $(this).popover('hide')});
    }
 }
 /*End allSequence Delete Block*/
 function propigateSequenceTableBody() {
   $(".tbody").remove();
   $(".ftable").append("<tbody class=tbody></tbody>");
   var seqTableCounter=1;
   var envId = Router.current().params._envId
   var sequences = Sequences.find({envId: envId})
   var seqEnvCount = sequences.count();
   var parametersObj = SequenceParameters.find({'children.envId':envId}).fetch();
   var parameterPairs = parametersObj[0]["children"]["parameterPairs"]
   for (i=0;i<seqEnvCount;i++) {
     sequenceObj = Sequences.find({seqEnvCount:seqTableCounter}).fetch();
     subjName = sequenceObj[0]["subjName"]

     newRowContent = "<tr class=trbody id=td"+i+"><tr>";
     $(".tbody").append(newRowContent);

     var split = []
     for (j=0;j<parameterPairs;j++) {
       split[j] = parametersObj[0]["children"]["label"+j].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "")
     }
     var literal = []
     for (j=0;j<parameterPairs;j++) {
       literal[j] = sequenceObj[0]["valueLiteral"][split[j]+"Literal"]
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
