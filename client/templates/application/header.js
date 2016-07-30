Template.header.helpers({
  popover1: function() {
    var obj = Environments.find({}).fetch();
    if ($.isEmptyObject(obj)) {
      return 'nav-blue-pulse';
    }
  }
});

Template.header.events({
  'click #navHome': function(e) {
    var obj = Environments.find({}).fetch();
    if ($.isEmptyObject(obj)) {
      $('[data-toggle="popover1"]').popover('show').on('click',function(){ $(this).popover('hide')});
      $('#navEnv').addClass('nav-blue-pulse');
    }
  }
});
