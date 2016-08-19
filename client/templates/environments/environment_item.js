/*
* JS file for environment_item.html
*/

Template.environmentItem.events({
  'click .viewEnvItem': function(e) {
     e.preventDefault();
     Router.go('observationList', {_envId:this._id});
  },
  'click .subjectParameters': function(e) {
     e.preventDefault();
     Router.go('subjectParameters', {_envId:this._id});
  },
  'click .editParameters': function(e) {
     e.preventDefault();
     Router.go('editSubjectParameters', {_envId:this._id});
  }
  });

Template.environmentItem.events({
   'click .deleteEnvironment': function(e) {
     var result = confirm("Deleting an environment will also delete all observation, subject, and sequence data. Press 'OK' to continue.");
     envId = this._id
    if (result) {
      Meteor.call('environmentDelete', envId, function(error, result) {
        return 0;
      });
    }
  }
 });

 Template.environmentItem.helpers({
   needsSetup: function() {
     var obj = SubjectParameters.find({'children.envId':this._id}).fetch();
     return $.isEmptyObject(obj);
   },
   needsSubjects: function() {
     var obj = Subjects.find({envId: this._id}).fetch();
     return $.isEmptyObject(obj)?"blue-pulse":"";
   }
 });
