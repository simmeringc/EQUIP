Sequences = new Mongo.Collection('sequences');

Meteor.methods({
  sequenceInsert: function(sequenceAttributes) {

    var user = Meteor.user();

    var dateObject = new Date();
    var dateObjectToString = dateObject.toString();
    var dateArray = dateObjectToString.split(" ");
    var dateNoTimezone = dateArray[0] + " " + dateArray[1] + " " + dateArray[2] + " " +dateArray[3] + " " + dateArray[4]

    var sequence = _.extend(sequenceAttributes, {
      userId: user._id,
      author: user.username,
      submitted: dateNoTimezone
    });

    var sequenceId = Sequences.insert(sequence);

    return {
      _id: sequenceId
    };
  },
  sequenceDelete: function(sequenceId) {
    Sequences.remove({
      _id: sequenceId
    })
  }
});
