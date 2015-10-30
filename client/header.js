Template.header.events({
  'click [data-modal]': function(e, t) {
    e.preventDefault();
    var modalName = $(e.target).data('modal');
    Modal.show(modalName);
  },
  'click [data-video]': function(e, t) {
    Modal.show('video');
  },
  'click [data-logout]': function(e, t) {
    Meteor.logout();
  }
});
