Environments = new Mongo.Collection('environments');

Meteor.methods({
  environmentInsert: function(postAttributes) {

    var user = Meteor.user();
    var environment = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var environmentId = Environments.insert(environment);

    return {
      _id: environmentId
    };
  }
});

Meteor.methods({
   environmentDelete: function(environmentId) {
     Environments.remove({
       _id: environmentId._id
     })
     Observations.remove({
       environmentId: environmentId._id
     })
   }
 });
