Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'landingPage'});
//Router.route('/observatories', {name: 'observationPage'});

Tracker.autorun(function() {
  var currentRoute = Router.current();
  if (currentRoute === null) {
    return;
  }

  if (currentRoute.route.getName() === 'login' && Meteor.user() !== null)
    Router.go('observationPage');
  }
