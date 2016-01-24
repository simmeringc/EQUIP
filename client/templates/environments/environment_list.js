Template.environmentList.helpers({
  environment: function() {
    return Environments.find({}, {sort: {submitted: -1}});
  }
});

Template.environmentList.events({
   'click .createNewEnvironment': function(e) {
    $('#createEnvPopup').modal({
      keyboard: true,
      show: true
    });
   }
});

Template.environmentList.events({
  'click #saveName': function(e) {

    var environment = {
      nameOfEnvironment: $('#environmentName').val()
    };

    Meteor.call('environmentInsert', environment, function(error, result) {
      Router.go('environmentList');
    });

    $('#createEnvPopup').modal('hide') && $('#environmentText').val('');
  }
});
