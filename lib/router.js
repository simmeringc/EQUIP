Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'landingPage'});
Router.route('/observatories', {name: 'observationPage'});

var requireLogin = function() {
  if (! Meteor.user()) {
   // If user is not logged in render landingpage
   this.render('landingpage');
 } else {
   //if user is logged in render whatever route was requested
   this.render('observationPage'); 
 }
}
