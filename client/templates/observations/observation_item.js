Template.observationItem.events({
   'click .deleteObsItem': function(e) {
     Session.set('obsId', this._id);
   },

   'click .enterObsItem': function(e) {
     Router.go('observatory', {_envId: this.envId, _obsId: this._id});
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
 }
