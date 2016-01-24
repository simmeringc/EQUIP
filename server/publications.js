Meteor.publish('environments', function() {
  return Environments.find({userId: this.userId});
});

Meteor.publish('observations', function() {
  return Observations.find({userId: this.userId});
});
