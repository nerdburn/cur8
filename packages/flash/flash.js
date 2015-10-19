/*
  FLASH
  - Flash message bar across top. Similar to Growl.
*/

Flash = {
  error: function(message) {
    this.show(message, 'error');
  },
  success: function(message) {
    this.show(message, 'success');
  },
  warning: function(message) {
    this.show(message, 'warn');
  },  
  show: function(message, type) {
    var self = this;
    Session.set('flashMessage', message);
    Meteor.setTimeout(function(){
      Session.set('flashType', type);
      Session.set('flashClass', 'on')
      Meteor.setTimeout(function() {
        self.hide();
      }, 3000);
    }, 100);
  },
  hide: function() {
    Session.set('flashClass', null);
    Meteor.setTimeout(function(){
      Session.set('flashType', null);
      Session.set('flashMessage', null);
    }, 200);
  },
  config: function(options) {
    // define colors, etc. 
  }
};

Template.flash.events({
  'click': function() {
    Flash.hide();
  }
});

Template.flash.helpers({
  'flashMessage': function() {
    return Session.get('flashMessage');
  },
  'flashClass': function() {
    return Session.get('flashClass');
  },
  'flashType': function() {
    return Session.get('flashType');
  },
  'flashError': function() {
    if(Session.get('flashType') == 'error')
      return true;
    else
      return false;
  },
  'flashSuccess': function() {
    if(Session.get('flashType') == 'success')
      return true;
    else
      return false;
  }
});
