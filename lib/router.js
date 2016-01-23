Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.map(function() {
  // Route for the landing page when user is not logged in
  this.route('landingPage', {
    path: '/landingPage'
  });

var requireLogin = function() {
  if (! Meteor.user()) {
   // If user is not logged in render landingpage
   this.route('landingPage');
 } else {
   //if user is logged in render whatever route was requested
   this.route('observationPage');
 }
}
