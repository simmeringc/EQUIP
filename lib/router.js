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
Router.route('/editSpec', {name: 'editSpec'});
Router.route('/viewObservation', {name: 'viewObservation'});
Router.route('/newObservation', {name: 'newObservation'});
