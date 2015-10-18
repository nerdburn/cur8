Template.signup.events({
  'submit [name="signup-form"]': function(e, t) {
    e.preventDefault();

    // get form data
    var data = {
      email: $('[name=email]').val(),
      password: $('[name=password]').val()
    }
    
    console.log(data);

    try {

      // validate using schemakit
      UsersSchema.validate(data);
      
      Accounts.createUser({
        email: data.email,
        password: data.password
      }, function(err) {
        console.log('got to callback in create user');

        if(err) {
          console.log('error on signup: ', err);
          Flash.error('Email already exists.');
          FormError.set({ email: 'Email already exists.' });
          return;
        } else {
          console.log(Meteor.user());
          Modal.hide();
          Flash.success('Thanks for signing up :)');
        }

      });

    } catch(e) {
      console.log('validation error:', e);
      FormError.set(e.details);
      Flash.error(e.reason);
    }

    return false; // don't submit
  }
});

Template.signup.onCreated(function() {
  FormError.bind('signup');
});