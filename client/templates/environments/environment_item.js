Template.environmentItem.events({
  'click .viewEnvItem': function(e) {
     e.preventDefault();
     Router.go('observationsList', this);
  },
  'click .editObsItem': function(e) {
     e.preventDefault();
     Router.go('editSpec');
  }
});

Template.environmentItem.rendered=function() {
    $('.deleteEnvironment').confirmation({
      onConfirm : function(){

      //console.log("hey");
      }
    });
    // $('.deleteEnvironment').confirmation({
    //   onCancel : function(){
    //   console.log("ok");
    //   }
    // });
}
