Meteor.publish('environments', function() {
  return Environments.find({userId: this.userId});
});

Meteor.publish('observations', function() {
  return Observations.find({userId: this.userId});
});

Meteor.publish('subjects', function() {
  return Subjects.find({userId: this.userId});
});

Meteor.publish('sequences', function() {
   return Sequences.find({userId: this.userId});
});

Meteor.publish('parameters', function() {
   return Parameters.find({userId: this.userId});
});
