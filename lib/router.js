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
Router.route('/environmentCreatePopup', {name: 'environmentCreatePopup'});

// Router.route('/environments/:_id', {
//   name: 'observationsList',
//   data: function() { return Environments.findOne(this.params._id); }
// });

Router.route('/environments/:_id', {
  name: 'observationsList',
  data: function() { return Environments.findOne(this.params._id); }
});

Router.route('/list', {
    data: function(){
        console.log("This is a list page.");
    }
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
      this.next();
    }
  }
}

Router.onAfterAction(requireLogin);
