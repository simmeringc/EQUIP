Template.observationList.helpers({
  environment: function() {
    return Environments.find({_id: this._id});
  }
});

Template.observationList.helpers({
  environment: function() {
    return Environments.find({}, {sort: {submitted: -1}});
  }
});

Template.observationList.events({
   'click .createNewObservation': function(e) {
    $('createPopup').modal({
      keyboard: true,
      show: true
    });
   }
});

Template.observationList.events({
  'click #saveName': function(e) {

    var observation = {
      nameOfObservation: $('#nameOfObservation').val()
    };

    Meteor.call('observationInsert', observation, function(error, result) {
      Router.go('observationList');
    });

    $('#createPopup').modal('hide');
  }
});
