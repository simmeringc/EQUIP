Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

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
      this.redirect('/environments');
      Session.set('firstLogin', false);
    } else {
      this.next();
    }
  }
}
Router.onAfterAction(requireLogin);

Router.route('/', {name: 'landingPage'});
Router.route('/environmentList', {name: 'environmentList'});
Router.route('/environmentItem', {name: 'environmentItem'});
Router.route('/environmentCreate', {name: 'environmentCreate'});
