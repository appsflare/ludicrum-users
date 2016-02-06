/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  "strict mode"

  console.log("starting ludicrum portal");
  cb();

  // var checkIfUserHasProfile = (userId, callback)=> {
  //   "use strict";
  //   let query = `select count(@rid) from user where @rid='${userId}' and outE('ownsProfile').size() > 0 limit 1`;
  //   //console.log(query);
  //   User.query(query)
  //     .then((res, err)=> {
  //       //console.log(JSON.stringify(res));
  //       if (err) {
  //         console.error(err);
  //       }
  //       callback(res && res.length && res[0].count > 0, err);
  //     });
  // };

  // var createProfile = (user, callback) => {
  //   Profile.create({type: 'system', name: 'Admin', sections: [{type: 'Personal'}, {type: 'Address'}]})
  //     .then((profile, err)=> {
  //       "use strict";
  //       User.createEdge(user.id, profile.id, {'@class': 'ownsProfile'})
  //         .then((edge, err)=> {
  //           if (!err)
  //             console.log(`System profile has been created user: ${user.email}`);
  //           callback(profile, err);
  //         });
  //     });
  // };

  // var checkAndCreateProfile = (user, callback)=> {
  //   "use strict";
  //   checkIfUserHasProfile(user.id, (exists, err)=> {
  //     "use strict";
  //     if (exists) {
  //       console.log(`A profile is already exists for user: ${user.email}`);
  //       return callback && callback(exists, err);
  //     } else {
  //       createProfile(user, (profile, err)=> {
  //         if (err) {
  //           console.log(err);
  //           return;
  //         }
  //         console.log(`A default profile has been created for user: ${user.email}`);
  //         callback && callback(true, err);
  //       });
  //     }
  //   });
  // }

  // var createNamedClient = (name, redirectURI)=> {
  //   "use strict";

  //   return new Promise((resolve, reject)=> {
  //     // Create a trusted application
  //     Client.findOne({'name': name}, function (err, client) {
  //       if (err) {
  //         console.log(err.message);
  //         return reject(err);
  //       }
  //       if (client) {
  //         console.log(`${name} already exists`);
  //         console.log("- client_id: " + client.clientId);
  //         console.log("- client_secret: " + client.clientSecret);
  //         console.log("- redirectURI: " + client.redirectURI);
  //         resolve(client);
  //       } else {
  //         Client.create({
  //           name: name,
  //           redirectURI: redirectURI,
  //           trusted: true
  //         }).exec(function (err, client) {
  //           if (err) {
  //             console.log(err.message);
  //             return reject(err);
  //           }
  //           console.log(`${name} created`);
  //           console.log("- client_id: " + client.clientId);
  //           console.log("- client_secret: " + client.clientSecret);
  //           console.log("- redirectURI: " + client.redirectURI);
  //           resolve(client);
  //         });
  //       }

  //     })
  //   });

  // };

  // var createClients = ()=> {
  //   "use strict";
  //   return Promise.all([

  //     // Create a trusted application
  //     createNamedClient('trustedTestClient', 'http://localhost:1338'),

  //     // Create an untrusted application
  //     createNamedClient('untrustedTestClient', 'http://localhost:1339')
  //   ]);


  // };


  // console.log("checking for default user...");

  // var onUserCheckComplete = ()=> {
  //   "use strict";
  //   createClients().then(()=> cb());
  // };

  // // Create a user
  // User.findOne({email: 'me@gmail.com'}, function (err, user) {
  //   if (err) {
  //     console.error(err);
  //   }
  //   if (!user) {
  //     console.log("default user is not found...");
  //     User.create({
  //       email: 'me@gmail.com',
  //       password: 'password'
  //     }).exec(function (err, user) {
  //       if (err) {
  //         console.log("Default user creation failed with following error message:");
  //         console.log(err.message);
  //       }
  //       console.log("Default user created");
  //       console.log("- username: " + user.email);
  //       console.log("- password: password");

  //       checkAndCreateProfile(user, ()=> onUserCheckComplete());

  //     });
  //   } else {

  //     console.log('Default user already exists');
  //     console.log("- username: " + user.email);
  //     console.log("- password: password");

  //     checkAndCreateProfile(user, ()=> onUserCheckComplete());
  //   }
  // });


};
