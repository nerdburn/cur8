Template.sites.events({
  'click [data-remove]': function(e, t) {
    e.preventDefault();
    var id = $(e.target).data('remove');
    console.log('clicked remove: ', id);
    console.log(Sites.remove(id));
    return false; // don't submit
  }
});