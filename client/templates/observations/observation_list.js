Template.observationList.helpers({
  environment: function() {
    return Environments.find({_id: this._id});
  },
  observation: function() {
    return Observations.find({environmentId: this._id}, {sort: {submitted: -1}});
  }
});
