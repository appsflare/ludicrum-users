/**
 * Created by developer on 5/31/15.
 */
console.error("process.env.GRID_FS_URL: " + process.env.GRID_FS_URL);
module.exports = {
  fileRepositories: {

    gridfs: {
      url: process.env.GRID_FS_URL || 'mongodb://127.0.0.1:27017/ludicrum',
      root: 'files'
    }
  }

};
