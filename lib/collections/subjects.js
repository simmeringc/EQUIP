Subjects = new Mongo.Collection('subjects');

Meteor.methods({
  subjectInsert: function(subjectAttributes) {

    var user = Meteor.user();

    var subject = _.extend(subjectAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var subjectId = Subjects.insert(subject);

    return {
      _id: subjectId
    };
  }
});

Meteor.methods({
  updateCounter: function(subjectAttributes) {

    Subjects.update(subjectAttributes, {$inc: {count: 1} });

    return {
      true
    };
  }
});
