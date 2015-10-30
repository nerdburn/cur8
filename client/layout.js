Template.layout.helpers({
  isLoggedIn: function() {
    if(Meteor.loggingIn()) {
      console.log('logging in...');
      return false;
    }
    else if(!Meteor.user()) {
      console.log('not logged in');
      Router.go('home');
    }
    else {
      console.log('logged in, going to acct...');
      //Router.go('account');
    }
  }
});