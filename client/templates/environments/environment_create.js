Template.environmentCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var environment = {
      nameOfEnvironment: $(e.target).find('[name=nameOfEnvironment]').val(),
      numberOfSubjects: $(e.target).find('[name=numberOfSubjects]').val()
    };

    Meteor.call('environmentInsert', environment, function(error, result) {
      // // display the error to the user and abort
      // if (error)
      //   return throwError(error.reason);
      //
      // // show this result but route anyway
      // if (result.postExists)
      //   throwError('This link has already been posted');

      Router.go('environmentList');
    });
  }
});
