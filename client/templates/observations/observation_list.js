Template.observationList.helpers({
  observation: function() {
    return Observations.find({environmentId: this._id}, {sort: {submitted: -1}});
  }
});
