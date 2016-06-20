Environments = new Mongo.Collection('environments');

Meteor.methods({
  environmentInsert: function(postAttributes) {

    var user = Meteor.user();
    var environment = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var envId = Environments.insert(environment);

    return {
      _id: envId
    };
  },
  environmentDelete: function(envId) {
    Environments.remove({
      _id: envId
    })
    Observations.remove({
      envId: envId
    })
    Sequences.remove({
      envId: envId
    })
    SubjectParameters.remove({
      'children.envId': envId
    })
    SequenceParameters.remove({
      'children.envId': envId
    })
  }
});
