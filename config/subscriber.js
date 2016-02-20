/**
 * Created by srinath on 27/8/15.
 */
module.exports.subscriber = {
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
  //to wait for workers to
  //finish their current active job(s)
  //before shutdown
  shutdownDelay: 5000,
  //number of millisecond to
  //wait until promoting delayed jobs
  promotionDelay: 5000,
  //number of delated jobs
  //to be promoted
  promotionLimit: 200
}
