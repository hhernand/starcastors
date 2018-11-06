module.exports = {
  stories: function(con, callback){
    let sql = 'SELECT * FROM story';
    con.query(sql, (err, res) => {
      if (err) throw err;
      else callback(res);
    });
  },

  scenes: function(con, callback){
    let sql = 'SELECT * FROM scene';
    con.query(sql, (err, res) => {
      if (err) throw err;
      else callback(res);
    });
  },

  choices: function(con, callback){
    let sql = 'SELECT * FROM choice';
    con.query(sql, (err, res) => {
      if (err) throw err;
      else callback(res);
    });
  },

  storyByTag: function(tag, con, callback){
    let sql = 'SELECT * FROM story WHERE tag = "' + tag + '"';
    con.query(sql, (err, story) => {
      if (err) throw err;
      else callback(story);
    });
  },

  sceneByTag: function(tag, con, callback){
    let sql = 'SELECT * FROM scene WHERE tag = "' + tag + '"';
    con.query(sql, (err, scene) => {
      if (err) throw err;
      else callback(scene);
    });
  },

  choiceByTag: function(tag, con, callback){
    let sql = 'SELECT * FROM choice WHERE tag = "' + tag + '"';
    con.query(sql, (err, choice) => {
      if (err) throw err;
      else callback(choice);
    });
  },

  sceneByID: function(id, con, callback){
    let sql = 'SELECT * FROM scene WHERE sceneID = ' + id;
    con.query(sql, (err, scene) => {
      if (err) throw err;
      else callback(scene);
    });
  },

  castorByID: function(id, con, callback){
    let sql = 'SELECT * FROM castor WHERE castorID = ' + id;
    con.query(sql, (err, castor) => {
      if (err) throw err;
      else callback(castor);
    });
  },

  choiceByScene: function(sceneID, con, callback){
    let sql = 'SELECT * FROM choice WHERE scene = ' + sceneID;
    con.query(sql, (err, choices) => {
      if (err) throw err;
      else callback(choices);
    });
  },

  castorsByOwner: function(owner, con, callback){
    let sql = 'SELECT * FROM castor WHERE owner = "' + owner + '"';
    con.query(sql, (err, castors) => {
      if (err) throw err;
      else callback(castors);
    });
  },

  castorLogByStory: function(castorid, storyid, con, callback){
    let sql = 'SELECT * FROM venturelog WHERE castorID = ' + castorid + ' AND storyID = ' + storyid;
    con.query(sql, (err, log) => {
      if (err) throw err;
      else callback(log);
    });
  },

  castorLogByScene: function(castorid, sceneid, con, callback){
    let sql = 'SELECT * FROM venturelog WHERE castorID = ' + castorid + ' AND sceneID = ' + sceneid + ' AND choiceID IS NULL';
    con.query(sql, (err, log) => {
      if (err) throw err;
      else callback(log);
    });
  },

  castorLog: function(castorid, storyid, con, callback){
    let select = 'SELECT c.name, sc.tag FROM venturelog v ';
    let join = 'JOIN castor c ON v.castorID = c.castorID JOIN scene sc ON v.sceneID = sc.sceneID ';
    let where = 'WHERE c.castorID = ' + castorid + ' AND v.storyID = ' + storyid;
    let sql = select + join + where;
    con.query(sql, (err, log) => {
      if (err) throw err;
      else callback(log);
    });
  }
}
