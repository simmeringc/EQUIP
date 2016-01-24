Template.observationItem.rendered=function() {
    $('.deleteObsItem').confirmation({
      onConfirm : function(){
    }
  });
}

Template.observationItem.events({
   'click .deleteObsItem': function(e) {
     Session.set('observationId', this);
   },
   'click .enterObsItem': function(e) {
     Router.go('editSpec2')
   }
 });



 Template.observationItem.rendered=function() {
     $('.deleteObsItem').confirmation({
       onConfirm : function(){
         var observationId = Session.get('observationId');
       Meteor.call('observationDelete', observationId, function(error, result) {
         Router.go('observationList', this)
       });
      }
    });
 }
