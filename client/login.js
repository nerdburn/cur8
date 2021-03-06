Template.login.events({
  'submit [name="login-form"]': function(e, t) {
    e.preventDefault();

    var email = $('input[name="email"]').val();
    var pass = $('input[name="password"]').val();

    // test login token - Ufm0gkLtfjcp_tkBv4suv4g-4VkUNMa5KiN3AvjxULB

    Meteor.loginWithPassword(email, pass, function(err){
      if(err) {
        console.log('login error: ', err);
        Flash.error('Invalid email or password.');
      }
      else {
        console.log('login with password worked..');
        console.log('user: ', Meteor.user());
        Modal.hide();
        ga('send', 'event', 'Accounts', 'login', email);
        Router.go('account');
      }
    });

    return false; // don't submit
  }
});

