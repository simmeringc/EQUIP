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
  subjectPositionUpdate: function(subjectAttributes) {
    var subjId = Subjects.update(subjectAttributes._id, {$set: { 'subjXPos': subjectAttributes.subjXPos, 'subjYPos': subjectAttributes.subjYPos, 'subjXSize': subjectAttributes.subjXSize, 'subjYSize':subjectAttributes.subjYSize}});
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
