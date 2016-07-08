Template.environmentList.rendered = function() {
  $("#navEnv").removeClass("nav-blue-pulse");
  // var obj = Environments.find({}).fetch();
  // if ($.isEmptyObject(obj)) {
  //   $('#createNewEnvironment').addClass('green-pulse');
  //   $('[data-toggle="popover"]').popover('show').on('click',function(){ $(this).popover('hide')});
  // }
}

Template.environmentList.helpers({
  environment: function() {
    return Environments.find({}, {sort: {submitted: -1}});
  },
  needsEnvironment: function() {
    var obj = Environments.find({}).fetch();
    return $.isEmptyObject(obj)?"green-pulse":"";
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
