Template.editSubjects.created = function() {
Session.set('envId', Router.current().params._envId);

var labelsObj = SubjectParameters.find({'children.envId':Router.current().params._envId}).fetch();
var parameterPairs = labelsObj[0]['children']['parameterPairs'];
subjLabels = []
for (i=0;i<parameterPairs;i++) {
  subjLabels[i] = labelsObj[0]['children']['label'+i].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "")
}
aTagSelectArray = []

/* INTERACTJS START */
// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    // restrict: {
    //   restriction: "parent",
    //   endOnly: true,
    //   elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    // },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (e) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
     console.log("test")
    //  Meteor.call('subjectPositionUpdate', subjectPositionSize, function(error, result) {
    //    return 0;
    //  });
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
  /* INTERACTJS END */

};

Template.editSubjects.rendered = function() {
  var env = Environments.find({_id: Router.current().params._envId}).fetch()
  var inputStyle = env[0]["inputStyle"]
  if (inputStyle == "box") {
    $('#boxStyle').prop("checked",true);
  } else {
    $('#selectStyle').prop("checked",true);
  }
  var obj = Subjects.find({}).fetch();
  if ($.isEmptyObject(obj)) {
    $('[data-toggle="popover5"]').popover('show').on('click',function(){ $(this).popover('hide')});
  }
}

Template.editSubjects.events({
  'click #esGoBack': function(e) {
    Router.go('observationList', {_envId:Router.current().params._envId});
  },

  'click .deleteSubject': function(e) {
    Meteor.call('subjectDelete', this._id, function(error, result) {
      return 0;
    });
  },
  'click .input-style': function(e) {
    var obj = {
      envId: Router.current().params._envId,
      inputStyle: $(e.target).val()
    };
    Meteor.call('updateInputStyle', obj, function(error, result) {
      if (error) {
        alert(error.reason);
      } else {
        return 0;
      }
    });
  },
  'click .selectable': function(e) {
     e.preventDefault();
     eId = $(e.target).attr("aTagId");
     eValue = $(e.target).attr("aTagValue");
     $("."+eId).each(function() {
       if ($(this).hasClass('deselectable')) {
         $(this).toggleClass("deselectable");
         $(this).toggleClass("selectable");
       }
     });
     $(e.currentTarget).toggleClass("selectable");
     $(e.currentTarget).toggleClass("deselectable");
     aTagSelectionInsert(eId, eValue);
   },
   'click .deselectable': function(e) {
      e.preventDefault();
      eId = $(e.target).attr("aTagId");
      eValue = null;
      $(e.currentTarget).toggleClass("deselectable");
      $(e.currentTarget).toggleClass("selectable");
      aTagSelectionInsert(eId, eValue);
    },
  'click #moveSubjects': function(e) {
    $(".subject").addClass("draggable");
    $("#moveSubjects").html("Save Subject Positions");
    $("#moveSubjects").attr("id", "saveSubjectsPosition");
  },
   'click #saveSubjectsPosition': function(e) {
    //  $('.subject').each(function() {
    //
    //  });
     $(".subject").removeClass("draggable");
     $("#saveSubjectsPosition").html("Move Subjects");
     $("#saveSubjectsPosition").attr("id", "moveSubjects");
   },


  'click #createNewSubject': function(e) {
   var envObj = Environments.find({_id:Router.current().params._envId}).fetch();
   var subjParamsObj = SubjectParameters.find({'children.envId':this._id}).fetch();
   var subjIdParam = subjParamsObj[0]['children']['label0'].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "");
   var inputStyle = envObj[0]["inputStyle"];
   if (inputStyle == "box") {
     $('#createBoxModal').modal({
       keyboard: true,
       show: true
     });
   }
   if (inputStyle == "select") {
     $('#createSelectModal').modal({
       keyboard: true,
       show: true
     });
     $('#createSelectModal').on('shown.bs.modal', function () {
       $('#'+subjIdParam).focus();
     })
   }
 },

  'click #saveSubjectSelect': function(e) {

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
     envId: this._id
   };

   var subjSplit = Session.get('subjSplit');
   for (i=0;i<subjLabels.length;i++) {
     label = subjLabels[i];
     literal = subjLabels[i] + "Literal";
     optionVal = $('#'+label).val();
     subject[label] = optionVal
     if (subjSplit[i][optionVal] == undefined) {
       subject[literal] = optionVal
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


   $('#createSelectModal').modal('hide');
   for (i=0;i<subjLabels.length;i++) {
     label = subjLabels[i];
     $('#'+label).val('');
   }
 },
 'click #saveSubjectBox': function(e) {

  var subject = {
    subjXPos: '',
    subjYPos: '',
    subjXSize: '',
    subjYsize: '',
    envId: this._id
  };

  var subjSplit = Session.get('subjSplit');
  for (i=0;i<subjLabels.length;i++) {
    label = subjLabels[i];
    literal = subjLabels[i] + "Literal";
    optionVal = aTagSelectArray[i]
    subject[label] = optionVal
    if (subjSplit[i][optionVal] == undefined) {
      subject[literal] = $('#'+label+"ITag").val() || "Undefined";
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


  $('#createBoxModal').modal('hide');
},

'click #editSubjects': function(e) {
  propigateSubjectTableBody();
  $('#editSubjPopup').modal({
    keyboard: true,
    show: true
  });
},
'click .deleteSubject': function(e) {
  var result = confirm("Press 'OK' to delete this Subject.");
  subjId = $(e.target).attr("subjId");
  Meteor.call('subjectDelete', subjId, function(error, result) {
    return 0;
  });
  propigateSubjectTableBody();
},
'click #saveSubjEdits': function(e) {
  $('#editSubjPopup').modal('hide');
}
});

Template.editSubjects.helpers({
  subject: function() {
    return Subjects.find({envId: this._id});
  },
  subjParameter: function() {
    return SubjectParameters.find({'children.envId':this._id})
  },
  needsSubjects: function() {
    var obj = Subjects.find({envId: Router.current().params._envId}).fetch();
    return $.isEmptyObject(obj)?"green-pulse":"";
  }
});

function propigateSubjectTableBody() {
  $(".tbody").remove();
  $(".ftable").append("<tbody class=tbody></tbody>");
  var envId = Router.current().params._envId
  parametersObj = SubjectParameters.find({'children.envId':envId}).fetch();
  parameterPairs = parametersObj[0]["children"]["parameterPairs"]
  var subjCursor = Subjects.find({envId: envId});
  subjCursor.forEach(function(doc, index) {
    subjId = doc["_id"];
    newRowContent = "<tr class=trbody id=td"+index+"><tr>";
    $(".tbody").append(newRowContent);
    var split = []
    for (j=0;j<parameterPairs;j++) {
      split[j] = parametersObj[0]["children"]["label"+j].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "")
    }
    var literal = []
    for (j=0;j<parameterPairs;j++) {
      literal[j] = doc[split[j]+"Literal"]
    }

    $("#"+"td"+index).append("<td></td>");
    for (j=0;j<literal.length;j++) {
      $("#"+"td"+index).append("<td>"+literal[j]+"</td>");
    }
    removeButton = "<td><button subjId="+subjId+" id=b"+index+">X</button></td>";
    $("#"+"td"+index).append(removeButton);
    $("#"+"b"+index).addClass("btn btn-xs btn-danger deleteSubject");
    $('tr').each(function () {
         if (!$.trim($(this).text())) $(this).remove();
    });
  });
};


function aTagSelectionInsert(eId, eValue) {
  for (i=0;i<parameterPairs;i++) {
    if (subjLabels[i] == eId) {
      aTagSelectArray[i] = eValue;
    }
  }
}
