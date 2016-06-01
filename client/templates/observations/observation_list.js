Template.observationList.helpers({
  observation: function() {
    return Observations.find({envId:this._id}, {sort: {submitted: -1}});
  }
});

Template.observationList.events({
'click .obsGoBack': function(e) {
   e.preventDefault();
   Router.go('environmentList');
 }
});
