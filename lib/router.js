Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});



var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render('observationPage');
    } else {
      this.render('landingPage');
      Session.set('firstLogin', true);
    }
  } else {
    if(Session.equals('firstLogin', true)) {
      this.redirect('/observatories');
      Session.set('firstLogin', false);
    } else {
      this.next();
    }
  }
}
Router.onAfterAction(requireLogin);

Router.route('/', {name: 'landingPage'});
Router.route('/observatories', {name: 'observationPage'});
Router.route('/observationItem', {name: 'observationItem'});
Router.route('/observationCreate', {name: 'observationCreate'});
