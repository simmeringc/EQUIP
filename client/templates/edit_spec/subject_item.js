Template.subjectItem.events({
  'click input': function(e) {
     e.preventDefault();
     var selectedSubject = this;
     Meteor.call('updateCounter', selectedSubject, function(error, result) {
       Router.go('editSpec');
     });
  }
});

Template.observationList.helpers({
  count: function() {
    return Subjects.find({_id: this._id});
  }
});
