const access = require('../../utils/access.js');

module.exports = {
  deleteStory: function(msg, con) {
    let tag = msg.content.split(' ')[2];

    access.storyByTag(tag, con, function(story) {
      if (story.length == 1) {
        let sql = 'DELETE FROM story WHERE storyID = ' + story[0].storyID;
        con.query(sql);
        msg.channel.send('Ability to start ' + story[0].name + ' has been deleted, but its scenes and choices are still in the database.');
      }
      else {
        msg.channel.send('No story has that tag.');
      }
    })
  },

  deleteScene: function(msg, con) {
    let tag = msg.content.split(' ')[2];

    access.sceneByTag(tag, con, function(scene) {
      if (scene.length == 1) {
        let sql = 'DELETE FROM scene WHERE sceneID = ' + scene[0].sceneID;
        con.query(sql);
        msg.channel.send('Scene ' + tag + ' has been deleted along with the choices in it.');
      }
      else {
        msg.channel.send('No scene has that tag.');
      }
    })
  },

  deleteChoice: function(msg, con) {
    let tag = msg.content.split(' ')[2];

    access.choiceByTag(tag, con, function(choice) {
      if (choice.length == 1) {
        let sql = 'DELETE FROM choice WHERE choiceID = ' + choice[0].choiceID;
        con.query(sql);
        msg.channel.send('Choice ' + tag + ' has been deleted.');
      }
      else {
        msg.channel.send('No choice has that tag.');
      }
    })
  }
}
