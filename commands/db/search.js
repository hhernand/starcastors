const access = require('../../utils/access.js');
const helper = require('../../utils/helper.js');

module.exports = {
  searchStory: function(msg, con) {
    let storytag = msg.content.split(' ')[2];
    access.storyByTag(storytag, con, function(story) {
      if (story.length == 1) {
        let begin = 'Story Tag: ' + storytag + '\n\n**' + story[0].name + '**\n\n';
        helper.displayScene(begin, story[0].start, msg, con);
      }
      else {
        msg.channel.send('No story exists with that tag.');
      }
    })
  },

  searchScene: function(msg, con) {
    let scenetag = msg.content.split(' ')[2];
    access.sceneByTag(scenetag, con, function(scene) {
      if (scene.length == 1) {
        helper.displayScene('Scene Tag: ' + scenetag + '\n\n', scene[0].sceneID, msg, con);
      }
      else {
        msg.channel.send('No scene exists with that tag.');
      }
    })
  },

  searchChoice: function(msg, con) {
    msg.channel.send('Placeholder.');
  }
}
