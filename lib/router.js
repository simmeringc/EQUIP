Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
waitOn: function() {
  return [Meteor.subscribe('environments'), Meteor.subscribe('observations'), Meteor.subscribe('subjects')]
  }
});

Router.route('/', {name: 'landingPage'});
// Router.route('/editSpec', {name: 'editSpec'});
Router.route('/environmentList', {name: 'environmentList'});
<<<<<<< HEAD
Router.route('/specSubmit', {name: 'specSubmit'});

// Router.route('/environments/:_id', {
//   name: 'observationsList',
//   data: function() { return Environments.findOne(this.params._id); }
// });
=======
Router.route('/whatIsDataObs', {name: 'whatIsDataObs'});
Router.route('/About', {name: 'about'});
//Router.route('/environmentCreate', {name: 'environmentCreate'});
>>>>>>> origin/lotsofdata

Router.route('/environment/:_id', {
  name: 'observationList',
  data: function() { return Environments.findOne(this.params._id); }
});

Router.route('/editSpec', {
  name: 'editSpec'
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
    } else {
      //this.next();
    }
  }
}

Router.onAfterAction(requireLogin);
