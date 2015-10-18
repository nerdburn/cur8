Sites = new Mongo.Collection('sites');
SitesSchema = new SchemaKit({
  url: {
    type: String,
    validate: {required: true}
  },
  user_id: {
    type: String,
    validate: {required: true}
  },
  created_at: {
    type: Date,
    validate: {required: true}
  }
});

UsersSchema = new SchemaKit({
  email: {
    type: String,
    validate: {
      required: true,
      email: true
    }
  },
  password: {
    type: String,
    validate: {required: true}
  }
});

if(Meteor.isServer) {

  Accounts.onCreateUser(function(options, user) {
    
    /*
    var Stripe = StripeAPI(Meteor.settings.stripe.sk);
    var stripeData = {
      email: user.emails[0].address
    };

    user.stripe = Meteor.wrapAsync(function(data, cb) {
      return Stripe.customers.create(data, cb);
    })(stripeData);
    console.log('created stripe user: ', user.stripe.id);
    */

    return user;
  });

}
