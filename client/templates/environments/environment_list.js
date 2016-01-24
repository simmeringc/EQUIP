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

    var environment = {
      nameOfEnvironment: $('#nameOfObservation').val()
    };

    Meteor.call('environmentInsert', environment, function(error, result) {
      Router.go('environmentList');
    });

    $('#createPopup').modal('hide');
  }
});
