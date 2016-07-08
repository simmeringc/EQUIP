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

Template.observationList.rendered = function() {
  var obj = Sequences.find({}).fetch();
  if ($.isEmptyObject(obj)) {
    $('[data-toggle="popover5"]').popover('show').on('click',function(){ $(this).popover('hide')});
  }
}
