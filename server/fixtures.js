Meteor.startup(function () {

  if(Sites.find({}).count() <= 0) {
  
    console.log('no sites found, creating some');
    
    Sites.insert({
      url: 'nerdburn.com',
      user_id: '7cbL44kywDzoJYnTc',
      created_at: new Date()
    });
    Sites.insert({
      url: 'dribbble.com',
      user_id: '7cbL44kywDzoJYnTc',
      created_at: new Date()
    });
    Sites.insert({
      url: 'webcreme.com',
      user_id: '7cbL44kywDzoJYnTc',
      created_at: new Date()
    });
    Sites.insert({
      url: 'thebestdesigns.com',
      user_id: '7cbL44kywDzoJYnTc',
      created_at: new Date()
    });
    Sites.insert({
      url: 'smashingmagazine.com',
      user_id: '7cbL44kywDzoJYnTc',
      created_at: new Date()
    });
    
  }
  
});