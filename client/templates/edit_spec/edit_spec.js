Template.editSpec.events({
  'click .addSubject': function(e) {
    Router.go('specSubmit');
  },

  'click .specDone': function(e) {
    Router.go('environmentList');
  }
});

Template.editSpec.helpers({
  subject: function() {
    console.log(this);
    return Subjects.find({});
  }
});
