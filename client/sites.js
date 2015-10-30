Template.sites.events({
  'click [data-remove]': function(e, t) {
    e.preventDefault();
    var target = $(e.target);
    var id = target.data('remove');
    var url = target.data('url');
    console.log('clicked remove: ', id);
    Sites.remove(id);
    console.log('removed: ', url);
    ga('send', 'event', 'Sites', 'remove', id);
    return false; // don't submit
  }
});