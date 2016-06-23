Template.editSubjects.created = function() {
Session.set('envId', Router.current().params._envId);

/* INTERACTJS START */
interact('.draggable')
  .draggable({
    onmove: window.dragMoveListener,
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
  })
  .resizable({
    preserveAspectRatio: true,
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    // update the element's style
    $('.subject').each(function(index){
      this.style.width  = event.rect.width + 'px';
      this.style.height = event.rect.height + 'px';
      });
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
  /* INTERACTJS END */
};

Template.editSubjects.events({
  'click #esGoBack': function(e) {
    Router.go('observationList', {_envId:Router.current().params._envId});
  },

  'click .deleteSubject': function(e) {
    Meteor.call('subjectDelete', this._id, function(error, result) {
      return 0;
    });
  },

  'click #moveSubjects': function(e) {
    $.each( $('.subjects'), function(i, subjects) {
       $('.subject', subjects).each(function() {
          $(".subject").addClass("draggable");
       });
     })
    $("#moveSubjects").remove();
    $("#control_bar").append('<button type="button" id=saveSubjects class="btn btn-default">Save Subject Locations</button>')
  },

   'click #saveSubjects': function(e) {
     $.each( $('.subjects'), function(i, subjects) {
        $('.subject', subjects).each(function() {
           $(".subject").removeClass("draggable");
           width=$(this).css('width');
           width=width.substring(0,width.length-2);
           height=$(this).css('height');
           height=height.substring(0,height.length-2);
           var subjectPositionSize = {
             subjXPos: $(this).attr('data-x'),
             subjYPos: $(this).attr('data-y'),
             subjXSize: width,
             subjYSize: height,
             _id: this.id
           };

           Meteor.call('subjectPositionUpdate', subjectPositionSize, function(error, result) {
             return 0;
           });

        });
      })
     $("#saveSubjects").remove();
     $("#control_bar").append('<button type="button" id=moveSubjects class="btn btn-default">Move Subjects</button>')

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

  'click #saveSubject': function(e) {

   var subjCount = Subjects.find({envId: Router.current().params._envId}).count()+1;
   var subjLabels = []
   var labelsObj = SubjectParameters.find({'children.envId':this._id}).fetch();
   for (i=0;i<labelsObj[0]['children']['parameterPairs'];i++) {
     subjLabels[i] = labelsObj[0]['children']['label'+i].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "")
   }

   var subject = {
     subjXPos: '',
     subjYPos: '',
     subjXSize: '',
     subjYsize: '',
     subjCount: subjCount,
     envId: this._id
   };

   var subjSplit = Session.get('subjSplit');
   for (i=0;i<subjLabels.length;i++) {
     label = subjLabels[i];
     literal = subjLabels[i] + "Literal";
     optionVal = $('#'+label).val();
     subject[label] = optionVal
     if (subjSplit[i][optionVal] == undefined) {
       subject[literal] = $('#'+label).val();
       continue
     }
     subject[literal] = subjSplit[i][optionVal];
   }

   Meteor.call('subjectInsert', subject, function(error, result) {
     if (error) {
       alert(error.reason);
     } else {
     propigateSubjectTableBody();
     }
   });


   $('#createSubjPopup').modal('hide');
   for (i=0;i<subjLabels.length;i++) {
     label = subjLabels[i];
     $('#'+label).val('');
   }
 },

'click #editSubjects': function(e) {
  propigateSubjectTableBody();
  $('#editSubjPopup').modal({
    keyboard: true,
    show: true
  });
},
'click .deleteSubject': function(e) {
  Session.set('subjId', this._id);
},
'click #saveSubjEdits': function(e) {
  $('#editSubjPopup').modal('hide');
},
 'click .deleteSubject': function(e) {
   console.log(this);
   Session.set('subjId', this._id);
 }
});

/*Start Subject Delete Block, Confirmation is a package*/
 Template.editSubjects.rendered=function() {
     $('.deleteSubject').confirmation({
       onConfirm : function(){
         var subjId = Session.get('subjId');
       Meteor.call('subjectDelete', subjId, function(error, result) {
         return 0;
       });
       }
    });
 }
 /*End Subject Delete Block*/

Template.editSubjects.helpers({
  subject: function() {
    return Subjects.find({envId: this._id});
  },
  subjParameter: function() {
    return SubjectParameters.find({'children.envId':this._id})
  }
});

function propigateSubjectTableBody() {
  $(".tbody").remove();
  $(".ftable").append("<tbody class=tbody></tbody>");
  var envId = Router.current().params._envId
  var subjCount = Subjects.find({envId: envId}).count();
  var counter=1;
  parametersObj = SubjectParameters.find({'children.envId':envId}).fetch();
  parameterPairs = parametersObj[0]["children"]["parameterPairs"]
  for (i=0;i<subjCount;i++) {
    subjectObj = Subjects.find({subjCount:counter}).fetch();
    newRowContent = "<tr class=trbody id=td"+i+"><tr>";
    $(".tbody").append(newRowContent);

    var split = []
    for (j=0;j<parameterPairs;j++) {
      split[j] = parametersObj[0]["children"]["label"+j].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "")
    }
    var literal = []
    for (j=0;j<parameterPairs;j++) {
      literal[j] = subjectObj[0][split[j]+"Literal"]
    }

    $("#"+"td"+i).append("<td></td>");
    for (j=0;j<literal.length;j++) {
      $("#"+"td"+i).append("<td>"+literal[j]+"</td>");
    }
    removeButton = "<td><button id=b"+i+">X</button></td>";
    $("#"+"td"+i).append(removeButton);
    $("#"+"b"+i).addClass("btn btn-xs btn-danger deleteSubject");
    counter++;
  }
  $('tr').each(function () {
       if (!$.trim($(this).text())) $(this).remove();
  });
}
