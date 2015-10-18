Template.header.events({
  'click [data-modal]': function(e, t) {
    e.preventDefault();
    var modalName = $(e.target).data('modal');
    Modal.show(modalName);
  },
  'click [data-logout]': function(e, t) {
    Meteor.logout();
  }
});

Template.header.helpers({
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
  }
});
