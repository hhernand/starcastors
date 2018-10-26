module.exports = {
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

  choiceByScene: function(sceneID, con, callback){
    let sql = 'SELECT * FROM choice WHERE scene = ' + sceneID;
    con.query(sql, (err, choices) => {
      if (err) throw err;
      else callback(choices);
    });
  }
}
