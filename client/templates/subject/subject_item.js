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
       console.log(seqIdParam);
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
//
// Template.subjectItem.rendered = function () {
//   console.log(this._id);
// }
