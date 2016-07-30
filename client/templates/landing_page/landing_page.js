Template.landingPage.events({
  'click [data-action="signUp"]': function(e) {
    e.stopPropagation();
    $('#login-dropdown-list').addClass('open');
    $('#login-username-or-email').focus();
  },
  // 'click #feedbackBtn': function(e) {
  //   $('#feedbackModal').modal({
  //     keyboard: true,
  //     show: true
  //   });
  // },
  'click #sendFeedback': function(e) {
    if($('#nameCF').val() == "") {
      alert("Please enter your Name");
      form.name.focus();
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      return;
    }
    if($('#emailCF').val() == "") {
      alert("Please enter a valid Email address");
      form.email.focus();
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      return;
    }
    if($('#textCF').val() == "") {
      alert("Please enter your comment or question in the Message box");
      form.message.focus();
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      return;
    }
    $('#feedbackModal').modal('hide');
    $('#nameCF').val('');
    $('#emailCF').val('');
    $('#subjectCF').val('');
    $('#textCF').val('');

    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "650",
      "hideDuration": "1000",
      "timeOut": "3000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    Command: toastr["success"]("Thanks for contacting us.", "Success")
  }
});
