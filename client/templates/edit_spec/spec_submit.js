Template.specSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var subject = {
      name: $(e.target).find('[name=name]').val(),
      gender: $(e.target).find('[name=gender]').val(),
      age: $(e.target).find('[name=age]').val(),
      race: $(e.target).find('[name=race]').val(),
      count: 0
    };

    Meteor.call('subjectInsert', subject, function(error, result) {
      Router.go('editSpec');
    });
  }
});
