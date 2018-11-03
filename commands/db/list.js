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
  }
}
