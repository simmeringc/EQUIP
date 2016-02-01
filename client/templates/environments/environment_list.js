Template.environmentList.helpers({
  environment: function() {
    return Environments.find({}, {sort: {submitted: -1}});
  }
});

Template.environmentList.events({
   'click #createNewEnvironment': function(e) {
    $('#createEnvPopup').modal({
      keyboard: true,
      show: true
    });
    $('#createEnvPopup').on('shown.bs.modal', function () {
      $('#environmentName').focus();
    })
  },

  'click #saveName': function(e) {

    var environment = {
      envName: $('#environmentName').val()
    };

    Meteor.call('environmentInsert', environment, function(error, result) {
      return 0;
    });

    $('#createEnvPopup').modal('hide');
    $('#environmentName').val('');
  }
});
