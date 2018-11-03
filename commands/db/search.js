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
    let choicetag = msg.content.split(' ')[2];
    access.choiceByTag(choicetag, con, function(choice) {
      if (choice.length == 1) {
        helper.displayScene('Choice Tag ' + choicetag + ' appears in:\n\n', choice[0].scene, msg, con);
      }
      else {
        msg.channel.send('No choice exists with that tag.');
      }
    })
  },

  searchCastor: function(msg, con) {
    let castorid = msg.content.split(' ')[2];
    access.castorByID(castorid, con, function(castor){
      if (castor.length == 1) {
        let res = '**ID:** ' + castorid + '\n';
        res += '**Name:** ' + castor[0].name + '\n';
        res += '**Level:** ' + castor[0].level + '\n';
        res += '**Owner:** <@' + castor[0].owner + '>\n';
        res += castor[0].link;
        msg.channel.send(res);
      }
    })
  }
}
