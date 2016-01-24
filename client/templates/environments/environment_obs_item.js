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
   'click .createNewObservation': function(e) {
     console.log("test");
    $('#createObsPopup').modal({
      keyboard: true,
      show: true
    });
   }
});

Template.environmentObsItem.events({
  'click #saveName': function(e) {

console.log(this._id);
    var observation = {
      nameOfObservation: $('#observationName').val(),
      environmentId: this._id
    };

    Meteor.call('observationInsert', observation, function(error, result) {
      Router.go('observationList', this);
    });

    $('#createObsPopup').modal('hide');
  }
});
