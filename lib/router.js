/*
* JS ironRouter file - Using ironRouter package
* Handles all routes, redirects, data contexts, and subscriptions to publications
* Publications are handled in ../server/publications.js
*/

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
waitOn: function() {
  return [Meteor.subscribe('environments'), Meteor.subscribe('observations'), Meteor.subscribe('subjects'), Meteor.subscribe('sequences'),Meteor.subscribe('subject_parameters'),Meteor.subscribe('sequence_parameters')]
  }
});

Router.route('/', {name: 'landingPage'});
Router.route('/environmentList', {name: 'environmentList'});
Router.route('/subjectParameters/:_envId', {name: 'subjectParameters'});
Router.route('/subjectParameters/:_envId/sequenceParameters/:_subjParamsId', {name: 'sequenceParameters'});

Router.route('/editSubjectParameters/:_envId', {name: 'editSubjectParameters'});
Router.route('/editSequenceParameters/:_envId/sequenceParameters/:_subjParamsId', {name: 'editSequenceParameters'});

Router.route('/viewData', {
   name: 'viewData',
   data: function() { return Sequences.find();}
});

Router.route('/environment/:_envId', {
  name: 'observationList',
  data: function() { return Environments.findOne(this.params._envId); }
});

Router.route('/environment/:_envId/editSubjects', {
  name: 'editSubjects',
  data: function() { return Environments.findOne(this.params._envId); }
});

Router.route('/environment/:_envId/observatory/:_obsId', {
  name: 'observatory',
  data: function() { return Observations.findOne(this.params._obsId); }
});
