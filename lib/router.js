Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'landingPage'});
Router.route('/observatories', {name: 'observationPage'});
Router.route('/observationItem', {name: 'observationItem'});
