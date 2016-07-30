Subjects = new Mongo.Collection('subjects');

Meteor.methods({
  subjectInsert: function(subjectAttributes) {

    var user = Meteor.user();

    var subject = _.extend(subjectAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var subjId = Subjects.insert(subject);

    return {
      _id: subjId
    };
  },
  subjectPositionUpdate: function(subjectPosition) {
    var subjId = Subjects.update(subjectPosition._id, {$set: { 'data_x': subjectPosition.data_x, 'data_y': subjectPosition.data_y}});
    return {
      _id: subjId
    };
  },
  subjectDelete: function(subjId) {
    Subjects.remove({
      _id: subjId
    })
    Sequences.remove({
      subjId: subjId
    })
  }
});
