Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
waitOn: function() {
  return Meteor.subscribe('environments');
  }
});

Router.route('/', {name: 'landingPage'});
Router.route('/editSpec', {name: 'editSpec'});
Router.route('/environmentList', {name: 'environmentList'});
Router.route('/viewObservation', {name: 'viewObservation'});
Router.route('/environmentCreate', {name: 'environmentCreate'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render('environmentList');
    } else {
      this.render('landingPage');
      Session.set('firstLogin', true);
    }
  } else {
    if(Session.equals('firstLogin', true)) {
      this.redirect('/environmentList');
      Session.set('firstLogin', false);
    } else {
      this.next();
    }
  }
}

Router.onAfterAction(requireLogin);
