/**
 * Created by srinath on 27/8/15.
 */
module.exports.publisher = {
  //default key prefix for kue in
  //redis server
  prefix: 'q',

  //default redis configuration
  redis: {
    //default redis server port
    port: process.env.REDIS_PORT || 6379,
    //default redis server host
    host: process.env.REDIS_HOST || '127.0.0.1'
  },
  //number of milliseconds
  //to wait
  //before shutdown publisher
  shutdownDelay: 5000
}
