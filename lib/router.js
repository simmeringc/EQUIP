Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

var requireLogin = function() {
  if ( Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render('landingPage');
    } else {
      this.render('observationPage');
      Session.set('firstLogin', true);
    }
  } else {
    if(Session.equals('firstLogin', true)) {
      this.redirect('/');
      Session.set('firstLogin', false);
    } else {
      this.next();
    }
  }
}
Router.onBeforeAction(requireLogin);
Router.route('/', {name: 'landingPage'});
