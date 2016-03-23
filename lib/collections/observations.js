Observations = new Mongo.Collection('observations');

Meteor.methods({
  observationInsert: function(observationAttributes) {

    var user = Meteor.user();
    var observation = _.extend(observationAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var obsId = Observations.insert(observation);

    return {
      _id: obsId
    };
  },
  observationDelete: function(obsId) {
    Observations.remove({
      _id: obsId
    })
    Sequences.remove({
      obsId: obsId
    })
  }
});
