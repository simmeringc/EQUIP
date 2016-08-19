/*
* JS MongoDB collection init and methods file
* SubjectParameters
*/

SubjectParameters = new Mongo.Collection('subject_parameters');

Meteor.methods({
  subjParameters: function(obj) {

    var user = Meteor.user();

    var subjParamsId = SubjectParameters.insert({userId: user._id, author: user.username, submitted: new Date(), children: obj});

    return {
       _subjParamsId: subjParamsId
    };
  },
  updateSubjParameters: function(obj) {
    SubjectParameters.remove({
      'children.envId': obj.envId
    })

    var user = Meteor.user();

    var subjParamsId = SubjectParameters.insert({userId: user._id, author: user.username, submitted: new Date(), children: obj});

    return {
       _subjParamsId: subjParamsId
    };
  }
});
