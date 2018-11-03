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
  }
}
