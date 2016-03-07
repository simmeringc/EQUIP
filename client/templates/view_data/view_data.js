Template.viewData.helpers({
  environment: function() {
    return Environments.find({}, {sort: {submitted: -1}});
  }
});
