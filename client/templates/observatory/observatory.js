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
  obsName: function() {
    var observation = Observations.find({_id: Router.current().params._obsId}).fetch();
    return observation[0]["name"];
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
   var subjId = Session.get('subjId');
   var subject = Subjects.find({"_id":subjId}).fetch();
   var subjName = subject[0]["subjName"];
   var wcdTypeLiteral;
   var solicitationMethodLiteral;
   var waitTimeLiteral;
   var lengthOfTalkLiteral;
   var studentTalkLiteral;
   var teacherSolicitationLiteral;
   var explicitEvaluationLiteral;
   var observation=Observations.find({"_id":Router.current().params._obsId}).fetch();
   var obsName=observation[0]["name"];
   switch ($('#wcdType').val()) {
    case "0":
        wcdTypeLiteral = "Math";
        break;
    case "1":
        wcdTypeLiteral = "Non-Math";
        break;
    case "2":
        wcdTypeLiteral = "Unknown";
        break;
      };
    switch ($('#solicitationMethod').val()) {
     case "0":
         solicitationMethodLiteral = "Called On";
         break;
     case "1":
         solicitationMethodLiteral = "Not Called On";
         break;
     case "2":
         solicitationMethodLiteral = "Unknown";
         break;
       };
   switch ($('#waitTime').val()) {
    case "0":
        waitTimeLiteral = "Less than 3 seconds";
        break;
    case "1":
        waitTimeLiteral = "3 or more seconds";
        break;
    case "2":
        waitTimeLiteral = "N/A";
        break;
      };
    switch ($('#lengthOfTalk').val()) {
     case "0":
         lengthOfTalkLiteral = "1-4 words";
         break;
     case "1":
         lengthOfTalkLiteral = "5-20 words";
         break;
     case "2":
         lengthOfTalkLiteral = "21 or more";
         break;
     case "3":
         lengthOfTalkLiteral = "Unknown";
         break;
       };
    switch ($('#studentTalk').val()) {
      case "0":
          studentTalkLiteral = "How";
          break;
      case "1":
          studentTalkLiteral = "What";
          break;
      case "2":
          studentTalkLiteral = "Why";
          break;
      case "3":
          studentTalkLiteral = "Other";
          break;
      case "4":
          studentTalkLiteral = "Unknown";
          break;
        };
    switch ($('#teacherSolicitation').val()) {
     case "0":
         teacherSolicitationLiteral = "How";
         break;
     case "1":
         teacherSolicitationLiteral = "What";
         break;
     case "2":
         teacherSolicitationLiteral = "Why";
         break;
     case "3":
         teacherSolicitationLiteral = "Other";
         break;
     case "4":
         teacherSolicitationLiteral = "Unknown";
         break;
       };
    switch ($('#explicitEvaluation').val()) {
      case "0":
          explicitEvaluationLiteral = "Yes";
          break;
      case "1":
          explicitEvaluationLiteral = "No";
          break;
      case "2":
          explicitEvaluationLiteral = "Unknown";
          break;
        };
   var sequence = {
     wcdType: $('#wcdType').val(),
     wcdTypeLiteral: wcdTypeLiteral,
     solicitationMethod: $('#solicitationMethod').val(),
     solicitationMethodLiteral: solicitationMethodLiteral,
     waitTime: $('#waitTime').val(),
     waitTimeLiteral: waitTimeLiteral,
     lengthOfTalk: $('#lengthOfTalk').val(),
     lengthOfTalkLiteral: lengthOfTalkLiteral,
     studentTalk: $('#studentTalk').val(),
     studentTalkLiteral: studentTalkLiteral,
     teacherSolicitation: $('#teacherSolicitation').val(),
     teacherSolicitationLiteral: teacherSolicitationLiteral,
     explicitEvaluation: $('#explicitEvaluation').val(),
     explicitEvaluationLiteral: explicitEvaluationLiteral,
     subjId: subjId,
     subjName: subjName,
     envId: Router.current().params._envId,
     obsId: Router.current().params._obsId,
     obsName: obsName
   };
   Meteor.call('sequenceInsert', sequence, function(error, result) {
     return 0;
   });
   $('#createSequence').modal('hide');
  },
   'click .editSequences': function(e) {
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
