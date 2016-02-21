/**
 * Created by srinath on 21/2/16.
 */
"use strict";


var checkIfUserHasProfile = (userId)=> {
    "use strict";
    let query = `select count(@rid) from user where @rid='${userId}' and outE('ownsProfile').size() > 0 limit 1`;
    //console.log(query);
    return User.query(query)
        .then((res, err)=> {
            //console.log(JSON.stringify(res));
            if (err) {
                console.error(err);
                return Promise.reject(err);
            }
            return Promise.resolve(res && res.length && res[0].count > 0);
        });
};

var createProfile = (user, callback) => {
    Profile.create({type: 'system', name: 'Admin', sections: [{type: 'Personal'}, {type: 'Address'}]})
        .then((profile, err)=> {
            "use strict";
            User.createEdge(user.id, profile.id, {'@class': 'ownsProfile'})
                .then((edge, err)=> {
                    if (!err)
                        console.log(`System profile has been created user: ${user.email}`);
                    callback(profile, err);
                });
        });
};

var checkAndCreateProfile = (user)=> {
    "use strict";
    return checkIfUserHasProfile(user.id)
        .then((exists, err)=> {
            "use strict";

            if (err) {
                return Promise.reject(err);
            }

            if (exists) {
                return Promise.resolve(exists);
            } else {
                return createProfile(user)
                    .then((profile, err)=> {
                        if (err) {
                            return Promise.reject(err);
                        }
                        return Promise.resolve(true);
                    });
            }
        });
}

var createNamedClient = (name, redirectURI)=> {
    "use strict";

    return new Promise((resolve, reject)=> {
        // Create a trusted application
        Client.findOne({'name': name}, function (err, client) {
            if (err) {
                console.log(err.message);
                return reject(err);
            }
            if (client) {
                console.log(`${name} already exists`);
                console.log("- client_id: " + client.clientId);
                console.log("- client_secret: " + client.clientSecret);
                console.log("- redirectURI: " + client.redirectURI);
                resolve(client);
            } else {
                Client.create({
                    name: name,
                    redirectURI: redirectURI,
                    trusted: true
                }).exec(function (err, client) {
                    if (err) {
                        console.log(err.message);
                        return reject(err);
                    }
                    console.log(`${name} created`);
                    console.log("- client_id: " + client.clientId);
                    console.log("- client_secret: " + client.clientSecret);
                    console.log("- redirectURI: " + client.redirectURI);
                    resolve(client);
                });
            }

        })
    });

};

var createClients = ()=> {
    "use strict";
    return Promise.all([

        // Create a trusted application
        createNamedClient('trustedTestClient', 'http://localhost:1338'),

        // Create an untrusted application
        createNamedClient('untrustedTestClient', 'http://localhost:1339')
    ]);


};


var onUserCheckComplete = ()=> {
    "use strict";
    createClients().then(()=> cb());
};

let findUser = function (email) {
    return User.findOne({email: email});
};

let createUser = function (user) {
    "use strict";
    // Create a user

    return new Promise((resolve, reject) => {
        findUser(user.email)
        then((err, user) => {
            if (err) {
                reject(err);
            }
            if (user) {
                reject('user already exists');
            }
            if (!user) {
                User.create({
                    email: user.email,
                    password: user.password
                }).exec((err1, user1)=> {
                    if (err1) {
                        return reject(err1);
                    }
                    resolve(user1.toJSON());
                });
            }
        });
    });
}

const seneca = require('seneca')();

const qHost = process.env.AMQP_SERVICE_HOST;

if (!qHost) {
    console.log('AMQP_SERVICE_HOST environment variable is not set, skipping seneca registration');
    return;
}

seneca
    .use('seneca-amqp-transport', {
        amqp: {
            url: process.env.qHost
        }
    })
    .add({
            role: 'users',
            cmd: 'create'
        },
        (args, respond) => {
            let user = args.user;

            createUser(user)
                .then(res=> {
                    respond(null, {created: true, user: res});
                })
                .catch(respond)

        });

module.exports.seneca = seneca;