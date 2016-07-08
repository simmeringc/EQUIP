Template.observationItem.rendered=function() {
    $('.deleteObsItem').confirmation({
      onConfirm : function(){
    }
  });
}

Template.observationItem.events({
   'click .deleteObsItem': function(e) {
     Session.set('obsId', this._id);
   },

   'click .enterObsItem': function(e) {
     Router.go('observatory', {_envId: this.envId, _obsId: this._id});
   }
 });

 Template.observationItem.helpers({
   needsSequences: function() {
     var obj = Sequences.find({envId: this._id}).fetch();
     return $.isEmptyObject(obj)?"light-green-pulse":"";
   }
  });

 Template.observationItem.rendered=function() {
     $('.deleteObsItem').confirmation({
       onConfirm : function(){
         var obsId = Session.get('obsId');
       Meteor.call('observationDelete', obsId, function(error, result) {
         return 0;
       });
      }
    });
    var obj = Sequences.find({}).fetch();
    if ($.isEmptyObject(obj)) {
      $('[data-toggle="popover7"]').popover('show').on('click',function(){ $(this).popover('hide')});
    }
 }
