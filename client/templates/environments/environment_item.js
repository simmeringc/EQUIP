Template.environmentItem.events({
  'click .viewEnvItem': function(e) {
     e.preventDefault();
     Router.go('observationList', {_envId:this._id});
  },
  'click .subjectParamters': function(e) {
     e.preventDefault();
     Router.go('subjectParameters', {_envId:this._id});
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

 Template.environmentItem.helpers({
   needsSetup: function() {
     var obj = SubjectParameters.find({'children.envId':this._id}).fetch();
     return $.isEmptyObject(obj);
   }
 });
