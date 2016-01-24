Template.observationList.helpers({
  environment: function() {
    return Environments.find({_id: this._id});
  }
});

Template.observationList.helpers({
  observation: function() {
    return Observations.find({evironmentId: this._id});
  }
});
