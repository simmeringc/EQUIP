Template.environmentObsItem.events({
  'click .obsGoBack': function(e) {
     e.preventDefault();
     Router.go('environmentList');
  },
  'click .editObsItem': function(e) {
     e.preventDefault();
     Router.go('editSpec');
  }
});

Template.environmentObsItem.events({
   'click #createNewObservation': function(e) {
    $('#createObsPopup').modal({
      keyboard: true,
      show: true
    });
   }
});

Template.environmentObsItem.events({
  'click #saveName': function(e) {

    var observation = {
      nameOfObservation: $('#observationName').val(),
      environmentId: this._id
    };

    Meteor.call('observationInsert', observation, function(error, result) {
      Router.go('observationList');
    });

    $('#createObsPopup').modal('hide') && $('#observationName').val('');
  }
});
