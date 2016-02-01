Template.editSpec.events({
  'click .specDone': function(e) {
    Router.go('observationList', {_id:Router.current().params._id});
  },

  'click #createNewSubject': function n(e) {
   $('#createSubjPopup').modal({
     keyboard: true,
     show: true
   });
   $('#createSubjPopup').on('shown.bs.modal', function () {
      $('#subjectName').focus();
   })
 },

  'click #saveName': function s(e) {

   var subject = {
     subjName: $('#subjectName').val(),
     subjAge: $('#subjectAge').val(),
     subjGender: $('#subjectGender').val(),
     subjRace: $('#SubjectRace').val()
   };

   Meteor.call('subjectInsert', subject, function(error, result) {
     return 0;
   });

   $('#createSubjPopup').modal('hide');
   $('#subjectName').val('');
   $('#subjectAge').val('');
   $('#subjectGender').val('');
   $('#SubjectRace').val('');
 }
});

Template.editSpec.helpers({
  subject: function() {
    return Subjects.find({});
  }
});
