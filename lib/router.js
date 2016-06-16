Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
waitOn: function() {
  return [Meteor.subscribe('environments'), Meteor.subscribe('observations'), Meteor.subscribe('subjects'), Meteor.subscribe('sequences')]
  }
});

Router.route('/', {name: 'landingPage'});
Router.route('/whatIsDataObs', {name: 'whatIsDataObs'});
Router.route('/about', {name: 'about'});
Router.route('/environmentList', {name: 'environmentList'});
Router.route('/viewData', {
   name: 'viewData',
   data: function() { return Sequences.find();}
});

Router.route('/environment/:_envId', {
  name: 'observationList',
  data: function() { return Environments.findOne(this.params._envId); }
});

Router.route('/editParameters/:_envId', {
  name: 'editParameters',
  data: function() { return Environments.findOne(this.params._envId); }
});

Router.route('/environment/:_envId/editSpec', {
  name: 'editSpec',
  data: function() { return Environments.findOne(this.params._envId); }
});

Router.route('/environment/:_envId/observatory/:_obsId', {
  name: 'observatory',
  data: function() { return Observations.findOne(this.params._obsId); }
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
      this.redirect('/environmentList');
      Session.set('firstLogin', false);
    }
  }
}

Router.onAfterAction(requireLogin);
