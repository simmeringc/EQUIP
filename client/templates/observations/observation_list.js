Template.observationList.helpers({
  observation: function() {
    return Observations.find({envId:this._id}, {sort: {submitted: -1}});
  }
});
