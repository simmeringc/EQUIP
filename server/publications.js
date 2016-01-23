Meteor.publish('environments', function() {
  return Environments.find();
});
