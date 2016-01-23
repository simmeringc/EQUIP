Template.observationPage.events({
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
   }
});
