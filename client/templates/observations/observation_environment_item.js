/*
* JS file for observation_environment_item.html
*/

Template.observationEnvironmentItem.helpers({
  envSequence: function() {
    return Sequences.find({envId: Router.current().params._envId});
  },
  needsSetup: function() {
    var obj = Subjects.find({envId: Router.current().params._envId}).fetch();
    return $.isEmptyObject(obj);
  },
  needsObservations: function() {
    var obj = Observations.find({envId: this._id}).fetch();
    return $.isEmptyObject(obj)?"green-pulse":"";
  }
});

Template.observationEnvironmentItem.events({
  'click .editObsItem': function(e) {
     e.preventDefault();
     Router.go('editSubjects', {_envId:this._id});
  },

  'click #createNewObservation': function(e) {
    $('#createObsPopup').modal({
      keyboard: true,
      show: true
    });
    $('#createObsPopup').on('shown.bs.modal', function () {
      $('#obsName').focus();
    })
  },

  'click #saveName': function(e) {

    var observation = {
      name: $('#obsName').val(),
      envId: this._id
    };

    if ($('#obsName').val() == "") {
      $('#obsName').addClass("requiredValidation")
      alert("Observation name required.")
      return;
    }
    $('#obsName').removeClass("requiredValidation")

    Meteor.call('observationInsert', observation, function(error, result) {
      return 0;
    });

    $('#createObsPopup').modal('hide');
    $('#observationName').val('');
  },
  'click .allSequences': function(e) {
   propigateSequenceTableBody();
   $('#allSequencesPopup').modal({
     keyboard: true,
     show: true
   });
 },
 'click #saveAllSequences': function(e) {
   $('#allSequencesPopup').modal('hide');
 },
 'click .deleteSequence': function(e) {
   var result = confirm("Press 'OK' to delete this Sequence.");
   seqId = $(e.target).attr("seqId");
   Meteor.call('sequenceDelete', seqId, function(error, result) {
     return 0;
   });
   propigateSequenceTableBody();
 }
});

 // Tutorial covers input box
 // Template.observationEnvironmentItem.rendered=function() {
 //    var obj = Observations.find({}).fetch();
 //    if ($.isEmptyObject(obj)) {
 //      $('[data-toggle="popover6"]').popover('show').on('click',function(){ $(this).popover('hide')});
 //    }
 // }

 /*End allSequence Delete Block*/
 function propigateSequenceTableBody() {
   $(".tbody").remove();
   $(".ftable").append("<tbody class=tbody></tbody>");
   var seqTableCounter=1;
   var envId = Router.current().params._envId
   var obsId = Router.current().params._obsId
   var parametersObj = SequenceParameters.find({'children.envId':envId}).fetch();
   var parameterPairs = parametersObj[0]["children"]["parameterPairs"]
   var seqCursor = Sequences.find({envId: envId})
   seqCursor.forEach(function(doc, index) {
     subjName = doc["subjName"]
     seqId = doc["_id"];
     newRowContent = "<tr class=trbody id=td"+index+"><tr>";
     $(".tbody").append(newRowContent);
     var split = []
     for (j=0;j<parameterPairs;j++) {
       split[j] = parametersObj[0]["children"]["label"+j].replace(/\s+/g, '').replace(/[^\w\s]|_/g, "")
     }
     var literal = []
     for (j=0;j<parameterPairs;j++) {
       literal[j] = doc["valueLiteral"][split[j]+"Literal"]
     }
     $("#"+"td"+index).append("<td></td>");
     $("#"+"td"+index).append("<td>"+subjName+"</td>");
     for (j=0;j<literal.length;j++) {
       $("#"+"td"+index).append("<td>"+literal[j]+"</td>");
     }
     date = "<td>"+doc["submitted"]+"</td>"
     $("#"+"td"+index).append(date);
     removeButton = "<td><button seqId="+seqId+" id=b"+index+">X</button></td>";
     $("#"+"td"+index).append(removeButton);
     $("#"+"b"+index).addClass("btn btn-xs btn-danger deleteSequence");
     $('tr').each(function () {
          if (!$.trim($(this).text())) $(this).remove();
     });
   });
 };
