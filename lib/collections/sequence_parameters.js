/*
* JS MongoDB collection init and methods file
* SequenceParameters
*/

SequenceParameters = new Mongo.Collection('sequence_parameters');

Meteor.methods({
  seqParameters: function(obj) {
    var user = Meteor.user();

    var seqParamsId = SequenceParameters.insert({userId: user._id, author: user.username, submitted: new Date(), children: obj});

    return {
       _seqParamsId: seqParamsId
    };
  },
  updateSeqParameters: function(obj) {
    SequenceParameters.remove({
      'children.envId': obj.envId
    })

    var user = Meteor.user();

    var seqParamsId = SequenceParameters.insert({userId: user._id, author: user.username, submitted: new Date(), children: obj});

    return {
       _seqParamsId: seqParamsId
    };
  }
});
