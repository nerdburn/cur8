Template.account.events({
  'click [data-logout]': function(e, t) {
    e.preventDefault();
    Meteor.logout();
  }
})