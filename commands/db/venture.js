const access = require('../../utils/access.js');
const helper = require('../../utils/helper.js');

module.exports = {
  start: function(msg, con) {
    let storytag = msg.content.split(' ')[1];
    access.storyByTag(storytag, con, function(story) {
      if (story.length == 1) {
        let begin = '**' + story[0].name + '**\n\n';
        helper.displayScene(begin, story[0].start, msg, con);
      }
      else {
        msg.channel.send('No story exists with that tag.');
      }
    })
  },

  pick: function(msg, con) {
    let choicetag = msg.content.split(' ')[1];
    access.choiceByTag(choicetag, con, function(choice) {
      if (choice.length == 1) {
        helper.displayScene('', choice[0].next, msg, con);
      }
      else {
        msg.channel.send('That choice does not exist.');
      }
    })
  }
}
