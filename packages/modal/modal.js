/*
  MODAL
  - Dynamically insert a Meteor template into a modal window.
*/

Modal = {
  show: function(modalTemplate) {
    Session.set('modalName', modalTemplate);
    Meteor.setTimeout(function(){
      Session.set('modalClass', 'on');
    }, 100);
  }, 
  hide: function() {
    Session.set('modalClass', null); 
    Meteor.setTimeout(function(){
      Session.set('modalName', null);      
    }, 100);    
  }
};

Template.modal.helpers({
  modalName: function() {
    return Session.get('modalName');
  },
  modalClass: function() {
    return Session.get('modalClass');
  }
});

Template.modal.events({
  'click .modal-close, click .modal-overlay': function(e, t) {
    Modal.hide();
  }
});