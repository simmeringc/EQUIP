Observations = new Mongo.Collection('observations');

Meteor.methods({
  observationInsert: function(observationAttributes) {

    var user = Meteor.user();
        console.log("1")
    var observation = _.extend(observationAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    console.log("2")

    var observationId = Observations.insert(observation);

    return {
      _id: observationId
    };
  }
});

Meteor.methods({
   observationDelete: function(observationId) {
     Observations.remove({
       _id: observationId._id
     })
   }
 });
