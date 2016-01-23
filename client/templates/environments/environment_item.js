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

Template.environmentItem.events({
  'click .deleteEnvironment': function(e) {
     console.log(this);
  }
});

Template.environmentItem.rendered=function() {
  console.log(this);
    $('.deleteEnvironment').confirmation({
      onConfirm : function(){
    }
  });
}
