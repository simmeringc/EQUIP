Template.environmentList.helpers({
  environment: function() {
    return Environments.find({}, {sort: {submitted: -1}});
  }
});

Template.environmentList.events({
   'click .createNewEnvironment': function(e) {
    Router.go('environmentCreate')
   }
});
