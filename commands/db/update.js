const access = require('../../utils/access.js');

module.exports = {
  updateScene: function(msg, con) {
    let data = msg.content.split('c!update scene ')[1];
    let tag = data.split(' ')[0];
    access.sceneByTag(tag, con, function(scene){
      if (scene.length == 1) {
        let word = data.split(' ')[1];
        if (word == 'text') {
          let text = (msg.content.split('[')[1]).split(']')[0];
          text = text.replace(/"/gi, '\\"');
          let sql = 'UPDATE scene SET scenario = "' + text + '" WHERE sceneID = ' + scene[0].sceneID;
          con.query(sql);
          msg.channel.send('Scene text has been updated.');
        }
      }
    })
  },

  updateStory: function(msg, con) {
    let data = msg.content.split('c!update story ')[1];
    let tag = data.split(' ')[0];
    access.storyByTag(tag, con, function(story){
      if (story.length == 1) {
        let word = data.split(' ')[1];
        if (word == 'title') {
          let text = (msg.content.split('[')[1]).split(']')[0];
          text = text.replace(/"/gi, '\\"');
          let sql = 'UPDATE story SET name = "' + text + '" WHERE storyID = ' + story[0].storyID;
          con.query(sql);
          msg.channel.send('Story title has been updated.');
        }
      }
    })
  },

  updateCastor: function(msg, con) {
    let data = (msg.content.split('c!update castor ')[1]).split(' ');
    if (data.length == 3) {
      let id = Number(data[0]);
      access.castorByID(id, con, function(castor) {
        if (castor.length == 1) {
          if (data[1] == 'level') {
            let level = Number(data[2]);
            if (!isNaN(level)) {
              let sql = 'UPDATE castor SET level = ' + level + ' WHERE castorID = ' + id;
              con.query(sql);
              msg.channel.send(castor[0].name + ' is now level ' + level + '.');
            }
          }
        }
      })
    }
  }
}
