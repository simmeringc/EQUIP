SubjectParameters = new Mongo.Collection('subjectParameters');

Meteor.methods({
  envSubjCollectionCreate: function(obj) {
    var subjCollection = "subject-params-"+obj.envId
    
    // var user = Meteor.user();

    // var subject = _.extend(obj, {
    //   userId: user._id,
    //   author: user.username,
    //   submitted: new Date()
    // });
    //
    // var subjId = Subjects.insert(subject);
    //
    // return {
    //   _id: subjId
    // };
  }
  // subjectPositionUpdate: function(obj) {
  //   var subjId = Subjects.update(obj._id, {$set: { 'subjXPos': obj.subjXPos, 'subjYPos': obj.subjYPos, 'subjXSize': obj.subjXSize, 'subjYSize':obj.subjYSize}});
  //   return {
  //     _id: subjId
  //   };
  // },
  // subjectDelete: function(subjId) {
  //   Subjects.remove({
  //     _id: subjId
  //   })
  //   Sequences.remove({
  //     subjId: subjId
  //   })
  // }
});
