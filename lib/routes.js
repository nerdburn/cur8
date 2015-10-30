/*
  ROUTES
*/
if(Meteor.isClient) {

  Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: '404',
    trackPageView: true    
  });
  
  Router.route('/', {
    name: 'home'
  });
  
  Router.route('/about', {
    name: 'about'
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
    },
    onBeforeAction: function() {
      $('body').addClass('white-bg');
      this.next();
    },
    onStop: function() {
      $('body').removeClass('white-bg');
    }
  });
   
  Router.route('/signup', {
    name: 'signup'
  }); 
 
  // show sign up modal when at the sign up route 
  // only if not logged in
  Router.onBeforeAction(function() {
    if(!Meteor.user())
      Modal.show('signup');
  }, {
    only: ['signup']
  });

}