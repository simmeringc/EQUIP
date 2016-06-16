Parameters = new Mongo.Collection('parameters');

Meteor.methods({
  subjParameters: function(obj) {
    var subjParamsParent = "subject-params-"+obj.envId

    var user = Meteor.user();

    var parameters = _.extend(obj, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    console.log(obj);
    //If already exists, do an update instead

    var subjParamsId = Parameters.insert({_id: subjParamsParent, children: obj});
    //
    return {
       _id: subjParamsId
    };
  }
});
