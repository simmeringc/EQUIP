Template.environmentList.events({
   'click .editObsItem': function(e) {
      e.preventDefault();
      Router.go('editSpec');
   },
   'click .viewObsItem': function(e) {
      e.preventDefault();
      Router.go('observationsPage', {_id: this._id});
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
    return Environments.find({}, {sort: {submitted: -1}});
  }
});
