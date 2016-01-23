Template.observationPage.events({
  'click .testObsItem': function(e) {
    e.preventDefault();
    console.log("testing obs item");
    Router.go('observationItem');
  }
});
