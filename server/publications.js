Meteor.publish('environments', function() {
  return Environments.find({userId: this.userId});
});
