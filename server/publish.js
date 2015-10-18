Meteor.publish('sites', function() {
  console.log('publish?', this.userId);
  if(this.userId) {
    var user = Meteor.users.findOne(this.userId);
    return Sites.find({ user_id: user._id });
  } else {
    return Sites.find();
  }
});