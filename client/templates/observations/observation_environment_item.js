Template.observationEnvironmentItem.helpers({
  envSequence: function() {
    return Sequences.find({envId: Router.current().params._envId});
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
 }
 /*End allSequence Delete Block*/
