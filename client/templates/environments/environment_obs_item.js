Template.environmentObsItem.events({
  'click .obsGoBack': function(e) {
     e.preventDefault();
     Router.go('environmentList', this);
  },
  'click .editObsItem': function(e) {
     e.preventDefault();
     Router.go('editSpec');
  }
});
