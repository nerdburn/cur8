/*
  FORM ERROR
  Helpers for dealing with CSS changes on form errors.
*/

if(Meteor.isClient) {

  FormError = {
    set: function(errors) {
      Session.set('formError', errors);    
      Session.set('formShake', true);
      Meteor.setTimeout(function(){
        Session.set('formShake', false);
      }, 400);
    },
    clear: function() {
      Session.set('formError', {});
      Session.set('formChanged', {});
    },
    clearField: function(fieldName) {
      var errors = Session.get('formError');
      if(errors[fieldName])
        delete errors[fieldName];
      Session.set('formError', errors);
    },
    hasChanged: function() {
      var formChanged = Session.get('formChanged');
      var size = 0, key;
      for(key in formChanged) {
        if(formChanged.hasOwnProperty(key)) size++;
      }
      return (size > 0)? true : false;
    },
    changed: function(fieldName) {
      var formChanged = Session.get('formChanged');
      formChanged[fieldName] = true;
      this.clearField(fieldName);
      Session.set('formChanged', formChanged);
    },
    bind: function(templateName) {
      FormError.clear();
      Template[templateName].events({
        'keydown input, change input, change select, keydown textarea, change textarea': function(e, t) {
          var field = $(e.target);
          FormError.changed(field.attr('name'));
        }
      });
    }
  }

  Template.registerHelper('formError', function(field) {
    var errors = Session.get('formError');
    if(!errors) return;
    if(errors[field]) {
      return errors[field]
    };
  });

  Template.registerHelper('formErrorClass', function(field) {
    var errors = Session.get('formError');
    var changedFields = Session.get('formChanged');
    if(!errors) return;
    if(errors[field]) {
      return 'has-error';
    }
  });

  Template.registerHelper('formShake', function() {
    return (Session.get('formShake'))? ' shake' : '';
  });

  Template.registerHelper('formChanged', function() {
    return FormError.hasChanged()? true : false;
  });

  Template.registerHelper('formDisabled', function() {
    return FormError.hasChanged()? '' : 'disabled';
  });

  Template.registerHelper('formSelected', function(key, value) {
    return (key === value)? true : false;
  });

}
