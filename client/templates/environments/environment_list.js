Template.environmentList.events({
   'click .editObsItem': function(e) {
      e.preventDefault();
      Router.go('editSpec');
   },
   'click .viewObsItem': function(e) {
      e.preventDefault();
      Router.go('viewObservation');
   },
   'click .newObs': function(e) {
      e.preventDefault();
      Router.go('newObservation');
   },
   'click .createNewEnvironment': function(e) {
      e.preventDefault();
      Router.go('environmentCreate');
   }
});

Template.environmentList.helpers({
  environment: function() {
    console.log("Template.environmentList.helpers");
    return Environments.find({}, {sort: {submitted: -1}});
  }
});
