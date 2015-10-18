/*
  ROUTES
*/
if(Meteor.isClient) {

  Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: '404'
  });
  
  Router.route('/', {
    name: 'home'
  });
  
  Router.route('/account', {
    name: 'account',
    waitOn: function() {
      return [
        Meteor.subscribe('sites')
      ];
    },
    data: {
      sites: Sites.find({})
    }
  });
 
  Router.route('/signup', {
    name: 'signup'
  }); 
 
  Router.onBeforeAction(function() {
    if(!Meteor.user())
      Modal.show('signup');
  }, {
    only: ['signup']
  }); 
    
}