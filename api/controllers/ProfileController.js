/**
 * ProfileController
 *
 * @description :: Server-side logic for managing Profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
import fs from 'fs';
module.exports = {

  me: function (req, res) {
    "use strict";
    let user = req.user.toJSON();
    Profile.query(`select expand(out('ownsProfile')) from user where @rid = '${req.user.id}'`)
      .then((profiles, err)=> {

        //TODO: filter profile details based on visibility settings in future

        if (err) {
          res.badRequest(err);
          return;
        }

        user.profiles = profiles;
        res.ok(user);
      });
  },

  getProfileImage: function (req, res) {
    "use strict";

    let defaultProfilePic = __dirname + '/../../assets/images/blank-profile.jpg';
    fs.exists(defaultProfilePic, function (exists) {
      if (!exists) {
        return res.notFound('The requested file does not exist.');
      }

      fs.createReadStream(defaultProfilePic).pipe(res);
    });

  },

  create: function (req, res) {
    "use strict";
    let profile = req.body;
    let userId = req.user.id;

    Profile.create(profile)
      .then((createdProfile, err) => {

        if (err) {
          res.badRequest(err);
          return;
        }

        Profile.createEdge(userId, createdProfile.id, {'@class': 'hasProfile', createdAt: new Date()})
          .then((result, err1)=> {

            if (err1) {
              res.badRequest(err);
              return;
            }
            res.ok(createdProfile);
          });
      });

  },

  getProfilesByUser: function (req, res) {
    "use strict";
    var userId = req.param('userId');

    Profile.query(`select expand(out('ownsProfile')) from user where @rid = '${userId}'`)
      .then((profiles, err)=> {

        //TODO: filter profile details based on visibility settings in future

        if (err) {
          res.badRequest(err);
          return;
        }
        res.ok(profiles || []);
      });
  }
};

