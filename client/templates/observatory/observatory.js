Template.observatory.helpers({
  subject: function() {
    return Subjects.find({envId: this.envId});
  }
});

Template.observatory.events({
  'click .obsDone': function(e) {
    Router.go('observationList', {_envId:Router.current().params._envId});
  },

  //sequence started in subject_item.js
  'click #saveSequence': function(e) {
   var subjId = Session.get('subjId');
   var sequence = {
     wcdType: $('#wcdType').val(),
     solicitationMethod: $('#solicitationMethod').val(),
     waitTime: $('#waitTime').val(),
     lengthOfTalk: $('#lengthOfTalk').val(),
     studentTalk: $('#studentTalk').val(),
     teacherQuestion: $('#teacherQuestion').val(),
     explicitEvaluation: $('#explicitEvaluation').val(),
     subjId: subjId,
     obsId: Router.current().params._envId,
     obsId: Router.current().params._obsId
   };

   Meteor.call('sequenceInsert', sequence, function(error, result) {
     return 0;
   });

   $('#createSequence').modal('hide');
  //  $('#subjectName').val('');
  //  $('#subjectAge').val('');
  //  $('#subjectGender').val('');
  //  $('#SubjectRace').val('');
 }
});
