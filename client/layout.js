Template.layout.helpers({
  isWhite: function() {
    var route = Router.current().route.getName();
    switch(route) {
      case 'account':
        return true;
        break;
      default:
        return false;
        break;
    }
  },  
  isLoggedIn: function(){
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