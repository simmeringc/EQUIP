Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'landingPage'});
Router.route('/observatories', {name: 'observationPage'});
Router.route('/editSpec', {name: 'editSpec'});
Router.route('/viewObservation', {name: 'viewObservation'});
Router.route('/newObservation', {name: 'newObservation'});

