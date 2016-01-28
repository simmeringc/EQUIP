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
      name: $('#obsName').val(),
      environmentId: this._id
    };

    Meteor.call('observationInsert', observation, function(error, result) {
      return 0;
    });

    $('#createObsPopup').modal('hide') && $('#observationName').val('');
  }
});
