Template.landingPage.events({
  'click [data-action="signUp"]': function(e) {
    e.stopPropagation();
    $('#login-dropdown-list').addClass('open');
    $('#login-username-or-email').focus();
  }
});

Template.landingPage.rendered = function() {
  var obj = Environments.find({}).fetch();
  if ($.isEmptyObject(obj)) {
    $('#navEnv').addClass('nav-blue-pulse');
    $('[data-toggle="popover"]').popover('show').on('click',function(){ $(this).popover('hide')});
  }
};
