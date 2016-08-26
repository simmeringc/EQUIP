/*
* JS file for subject_item.html
*/

Template.subjectItem.helpers({
  subjIdField: function() {
    subject = Subjects.find({_id:this._id}).fetch();
    subjParametersObj = SubjectParameters.find({'children.envId':Router.current().params._envId}).fetch();
    subjIdField = subjParametersObj[0]["children"]["label0"];
    subjNameField = subject[0][subjIdField+"Literal"]
    return subjNameField
  }
});

Template.subjectItem.events({
  'click .subject': function(e) {
  if (Router.current().params._obsId) {
     var envObj = Environments.find({_id:Router.current().params._envId}).fetch();
     var inputStyle = envObj[0]["inputStyle"];
     if (inputStyle == "box") {
       Session.set('subjId', this._id);
       $('#createBoxModal').modal({
         keyboard: true,
         show: true
       });
     }
     if (inputStyle == "select") {
       var seqParamsObj = SequenceParameters.find({'children.envId':Router.current().params._envId}).fetch();
       var seqIdParam = seqParamsObj[0]['children']['label0'].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "");
       $('#createSelectModal').modal({
         keyboard: true,
         show: true
       });
       Session.set('subjId', this._id);
       $('#createSelectModal').on('shown.bs.modal', function () {
          $('#'+seqIdParam).focus();
       })
     }
    }
  }
});
//sequence ends in observatory.js
