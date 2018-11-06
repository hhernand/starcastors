const access = require('../../utils/access.js');

module.exports = {
  listStories: function(msg, con) {
    access.stories(con, function(stories) {
      if (stories.length == 0) {
        msg.channel.send('There are no stories.');
      }
      else {
        let res = '**List of all Stories**\n\n';

        for (i = 0; i < stories.length; i++) {
          res += stories[i].name + ' (' + stories[i].tag + ')\n';
        }

        msg.channel.send(res);
      }
    })
  },

  listScenes: function(msg, con) {
    access.scenes(con, function(scenes) {
      if (scenes.length == 0) {
        msg.channel.send('There are no scenes.');
      }
      else {
        let res = '**List of all Scene Tags**\n\n';

        for (i = 0; i < scenes.length; i++) {
          res += scenes[i].tag + '\n';
        }

        msg.channel.send(res);
      }
    })
  },

  listChoices: function(msg, con) {
    access.choices(con, function(choices) {
      if (choices.length == 0) {
        msg.channel.send('There are no choices.');
      }
      else {
        let res = '**List of all Choice Tags**\n\n';

        for (i = 0; i < choices.length; i++) {
          res += choices[i].tag + '\n';
        }

        msg.channel.send(res);
      }
    })
  },

  myCastors: function(msg, con) {
    let id = msg.author.id;

    access.castorsByOwner(id, con, function(castors){
      if (castors.length > 0) {
        let res = '**My Castors**\n\n';
        for (i = 0; i < castors.length; i++) {
          res += 'ID ' + castors[i].castorID + ' - ' + castors[i].name + ' - Level ' + castors[i].level + '\n';
        }
        msg.channel.send(res);
      }

      else {
        msg.channel.send('You don\'t have any castors.');
      }
    })
  },

  journeyLog: function(msg, con) {
    let storytag = msg.content.split(' ')[2];
    access.storyByTag(storytag, con, function(story) {
      if (story.length == 1) {
        let castorid = Number(msg.content.split(' ')[1]);
        if (!isNaN(castorid)) {
          access.castorLog(castorid, story[0].storyID, con, function(log) {
            if (log.length > 0) {
              let apos = '\'';
              let name = log[0].name;
              if (name[name.length - 1] != 's') {
                apos += 's';
              }
              let res = name + apos + ' progress in ' + story[0].name + '\n\n';
              for (i = 0; i < log.length; i++) {
                res += log[i].tag + '\n';
              }
              msg.channel.send(res);
            }
            else {
              msg.channel.send('Castor has not started that adventure yet.');
            }
          })
        }
      }
      else {
        msg.channel.send('Story does not exist.');
      }
    })
  }
}
