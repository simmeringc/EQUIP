Template.header.helpers({
  popover1: function() {
    var obj = Environments.find({}).fetch();
    if ($.isEmptyObject(obj)) {
      return 'nav-blue-pulse';
    }
  }
});
