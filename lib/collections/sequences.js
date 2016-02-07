Sequences = new Mongo.Collection('sequences');

Meteor.methods({
  sequenceInsert: function(sequenceAttributes) {

    var user = Meteor.user();
    var sequence = _.extend(sequenceAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var sequenceId = Sequences.insert(sequence);

    return {
      _id: sequenceId
    };
  }
});
