SubjectParameters = new Mongo.Collection('subject_parameters');

Meteor.methods({
  subjParameters: function(obj) {
    // var subjParamsParent = "subject-params-"+obj.envId

    var user = Meteor.user();

    // var parameters = _.extend(obj, {
    //   userId: user._id,
    //   author: user.username,
    //   submitted: new Date()
    // });


    //If already exists, do an update instead

    var subjParamsId = SubjectParameters.insert({userId: user._id, author: user.username, submitted: new Date(), children: obj});

    console.log(obj);
    return {
       _subjParamsId: subjParamsId
    };
  }
});
