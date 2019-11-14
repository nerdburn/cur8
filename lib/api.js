if(Meteor.isServer) {
  
  // Listen to incoming HTTP requests, can only be used on the servers
  WebApp.rawConnectHandlers.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
    return next();
  });

  /*
    API -> LOGIN
  */
  Router.route('/api/login', {where: 'server'}).post(function() {
    
    console.log('POST to login: ', this.request.body.email);

    this.response.statusCode = 200;
    this.response.setHeader("Campaigns-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Campaigns-Type, Accept");

    var loginResult = false;

    // TODO - add schemakit validation 
  
    // make sure email and pass are sent
    if(!this.request.body.email || !this.request.body.password) {
      return this.response.end('Please specify an email and password.');
    } 
    
    // make sure the user exists
    var user = Meteor.users.findOne({ "emails.address": this.request.body.email });
    if(!user) {
      this.response.statusCode = 403;
      return this.response.end('User not found.');
    }

    // TODO - check the bcrypt password
    if(ApiPassword.validate({ email: this.request.body.email, password: this.request.body.password })) {
    
      // generate a session token for the client
      var stampedLoginToken = Accounts._generateStampedLoginToken();

      // update the user account with the session token
      Meteor.users.update(user._id, {
        $push: { 'services.resume.loginTokens': stampedLoginToken }
      });

      // send the session token back to the user
      this.response.end(JSON.stringify({
        status: 200,
        userId: user._id,
        loginToken: stampedLoginToken.token
      }));      
    
    } else {
      this.response.end('Invalid email/password combination.');
    }

  });

  Router.route('/api/search/:token?', {where: 'server'}).post(function() {
    
    console.log('POST:', this.request.body.terms);
    
    if(!this.params.token) {
      return this.response.end('Invalid token.');
    }
    
    // get user based on login token
    var user = Meteor.users.findOne({ 'services.resume.loginTokens': { $elemMatch: { token: this.params.token } }});
    console.log('posting with token: ', this.params.token);
    if(user) {
    
      this.response.statusCode = 200;
      this.response.setHeader("Content-Type", "application/json");
      this.response.setHeader("Access-Control-Allow-Origin", "*");
      this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
    
      // did they send search terms?
      if(!this.request.body.terms) {
        return this.response.end('Must send search terms.');
      }
      
      // get sites by user id
      var sites = Sites.find({
        user_id: user._id
      }).fetch();
      
      if(sites.length > 0) {
        var str = 'https://www.google.ca/webhp?hl=en#hl=en&q=';
        var search = this.request.body.terms;
        console.log('sites: ', sites);
        for(x=0;x<sites.length;x++) {
          console.log('found site: ', sites[x]);
          str += 'site:' + sites[x].url + '+OR+';
          console.log('new string: ', str);
        }
        var sitesQuery = str.substring(0, str.length - 4);
        console.log('sites query: ', sitesQuery);    
        var searchQuery = '';
        var split = search.split(' ');
        for(i=0;i<split.length;i++) {
          searchQuery += split[i] + '+';
        }
        searchQuery = searchQuery.substring(0, searchQuery.length - 1);
        var finalQuery = sitesQuery + '+' + searchQuery;
        
        // prepare response
        var response = { status: 200, search_url: finalQuery, message: 'Search URL successfully created.' };
      }

      // send response
      return this.response.end(JSON.stringify(response));
    } else {
      return this.response.end('No user found. Invalid token.');  
    }
  });

  Router.route('/api/:token?', {where: 'server'}).post(function() {
    
    console.log('POST:', this.request.body.url);
    
    if(!this.params.token) {
      return this.response.end('Invalid token.');
    }
    
    // get user based on login token
    var user = Meteor.users.findOne({ 'services.resume.loginTokens': { $elemMatch: { token: this.params.token } }});
    console.log('posting with token: ', this.params.token);
    if(user) {
    
      this.response.statusCode = 200;
      this.response.setHeader("Content-Type", "application/json");
      this.response.setHeader("Access-Control-Allow-Origin", "*");
      this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
    
      if(!this.request.body.url) {
        return this.response.end('Must send a URL.');
      }
      
      // parse url from posted data
      var arr = this.request.body.url.split('/');
      var withHttp = arr[0] + '//' + arr[2];
      var justDomain = withHttp.replace('https://', '').replace('http://', '').replace('www.', '');
     
      Sites.insert({
        url: justDomain.trim(),
        user_id: user._id,
        created_at: new Date()
      });

      // prepare response
      var response = { status: 200, url: justDomain, message: 'Saved!' };

      // send response
      return this.response.end(JSON.stringify(response));
    } else {
      return this.response.end('No user found. Invalid token.');      
    } 
  });

  /*
    API -> LOGOUT
  Router.route('/logout', function(){
    this.response.statusCode = 200;
    this.response.setHeader("Campaigns-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Campaigns-Type, Accept");

    if (this.request.method == 'POST') {

      // update our statistics counter
      RestStatistics.update({_id: "configuration"},{$inc:{
        total_count: 1
      }});

      // remove the user login/session tokens
      Meteor.users.update({username: username}, {
        $push: {'services.resume.loginTokens': null}
      });

      this.response.end(JSON.stringify(logoutResult));


    }else if (this.request.method == 'OPTIONS') {
      this.response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
      this.response.end("OPTIONS Response, as per the Cross-Origin Resource Sharing standard.");
    }else{
      this.response.end("Please send as a POST request.");
    }
  }, {where: 'server'});
  */ 
  
  /*
    STRIPE WEBHOOK
  Router.route('/webhooks/stripe', {
    where: 'server',
    name: 'stripeWebhook',
    action: function() {
      var eventType = this.request.body.type;
      var eventData = this.request.body.data;
      
      console.log('received in stripe webhook:', eventData);
      
      // Shorthand method to update customer
      var updateCustomer = function(customer) {
        console.log('updating customer in stripe webhook:', customer.id);
        return Meteor.users.update({'stripe.id': customer.id}, {$set: {'stripe': customer}});
      }

      // Customer event, update customer in db
      if(_.contains(Meteor.settings.stripe.customerEvents, eventType)) {
        updateCustomer(eventData.object);
      }

      // Subscription event, make api call to get latest customer and update db
      else if(_.contains(Meteor.settings.stripe.subscriptionEvents, eventType)) {
        
        var Stripe = StripeAPI(Meteor.settings.stripe.sk);
        var customer = Meteor.wrapAsync(function(customerId, cb) {
          return Stripe.customers.retrieve(customerId, cb);
        })(eventData.object.customer);
        console.log('customer after retrieve in stripe webhook: ', customer);
        updateCustomer(customer);
      }

      // Charge (or refund) event, create record associated with user based on Stripe customer id
      else if(_.contains(Meteor.settings.stripe.chargeEvents, eventType)) {
        var user = Meteor.users.findOne({'stripe.id': eventData.object.customer});
        Charges.insert(ChargesSchema.validate({
          user_id: user._id,
          data: eventData.object,
          created_at: new Date()
        }));
      }

      // successful response
      this.response.writeHead(200, {'Content-Type': 'text/json'});
      return this.response.end(JSON.stringify({ 'success': true }));
    }
  });  
  */

}
