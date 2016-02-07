Template.subjectItem.events({
  'click .subject': function(e) {
   $('#createSequence').modal({
     keyboard: true,
     show: true
   });
  Session.set('subjId', this._id);
   $('#createSequence').on('shown.bs.modal', function () {
      $('#wcdType').focus();
   })
 }
 //sequence ends in observatory.js
});
