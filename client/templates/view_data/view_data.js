Template.viewData.helpers({
   environment: function() {
      return Environments.find({}, {sort: {submitted: -1}});
   },
});

Template.viewData.helpers({
   sequences: function() {
      return Sequences.find();
   },
});

Template.viewData.events({
   'click #graph_button': function(e) {
      console.log(Sequences.find({"obsId" : "qKgZ8hdEQuZcuRcAQ"},{"wcdType":true}));
   }
});

