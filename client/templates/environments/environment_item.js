Template.environmentItem.events({
  'click .viewEnvItem': function(e) {
     e.preventDefault();
     Router.go('observationList', {_envId:this._id});
  },
  //edit spec button removed -> observatory page
  // 'click .editObsItem': function(e) {
  //    e.preventDefault();
  //    Router.go('editSubjects', {_envId:this._id});
  // },
    'click .editParameters': function(e) {
       e.preventDefault();
       Router.go('editParameters', {_envId:this._id});
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
     Session.set('envId', this._id);
   }
 });

 Template.environmentItem.rendered=function() {
     $('.deleteEnvironment').confirmation({
       onConfirm : function(){
         var envId = Session.get('envId');
       Meteor.call('environmentDelete', envId, function(error, result) {
         return 0;
       });
       }
    });
 }
