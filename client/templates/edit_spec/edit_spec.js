Template.editSpec.rendered = function() {

interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

}



Template.editSpec.events({
  'click .specDone': function(e) {
    Router.go('observationList', {_envId:Router.current().params._envId});
  },

  'click #createNewSubject': function(e) {
   $('#createSubjPopup').modal({
     keyboard: true,
     show: true
   });
   $('#createSubjPopup').on('shown.bs.modal', function () {
      $('#subjectName').focus();
   })
 },

  'click #saveName': function(e) {

   var subject = {
     subjName: $('#subjectName').val(),
     subjAge: $('#subjectAge').val(),
     subjGender: $('#subjectGender').val(),
     subjRace: $('#SubjectRace').val(),
     envId: this._id
   };

   Meteor.call('subjectInsert', subject, function(error, result) {
     return 0;
   });

   $('#createSubjPopup').modal('hide');
   $('#subjectName').val('');
   $('#subjectAge').val('');
   $('#subjectGender').val('');
   $('#SubjectRace').val('');
 }
});

Template.editSpec.helpers({
  subject: function() {
    return Subjects.find({envId: this._id});
  }
});
