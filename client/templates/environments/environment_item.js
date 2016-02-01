Template.environmentItem.events({
  'click .viewEnvItem': function(e) {
     e.preventDefault();
     Router.go('observationList', this);
  },
  'click .editObsItem': function(e) {
     e.preventDefault();
     Router.go('editSpec', this);
  }
});

Template.environmentItem.rendered=function() {
    $('.deleteEnvironment').confirmation({
      onConfirm : function(){
    }
  });
}

Template.environmentItem.events({
   'click .deleteEnvironment': function(e) {
     Session.set('environmentId', this);
   }
 });

 Template.environmentItem.rendered=function() {
     $('.deleteEnvironment').confirmation({
       onConfirm : function(){
         var environmentId = Session.get('environmentId');
       Meteor.call('environmentDelete', environmentId, function(error, result) {
         Router.go('environmentList')
       });
       }
    });
 }
