Template.observationList.helpers({
  environment: function() {
    return Environments.find({_id: this._id});
  }
});
