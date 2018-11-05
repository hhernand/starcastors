const access = require('../../utils/access.js');

module.exports = {
  addStory: function(msg, con) {
    //tag starttag [title]
    let data = (msg.content.split('c!add story ')[1]).split(' ');

    if (data.length > 2) {
      let tag = data[0];
      let start = data[1];
      access.sceneByTag(start, con, function(scene) {
        if (scene.length == 1){
          let title = (msg.content.split('[')[1]).split(']')[0];
          let sql = 'INSERT INTO story (tag, name, start) VALUES("' + tag + '", "' + title + '", ' + scene[0].sceneID + ')';
          con.query(sql);
          msg.channel.send(title + ' has been created with the ' + tag + ' tag.');
        }
        else {
          msg.channel.send('That scene does not exist, you cannot make a story without one.');
        }
      });
    }
  },

  addScene: function(msg, con) {
    //tag [text]
    let data = (msg.content.split('c!add scene ')[1]).split(' ');

    if (data.length > 1) {
      let tag = data[0];
      access.sceneByTag(tag, con, function(scene) {
        if (scene.length == 0) {
          let text = (msg.content.split('[')[1]).split(']')[0];
          let sql = 'INSERT INTO scene (tag, scenario) VALUES("' + tag + '", "' + text + '")';
          con.query(sql);
          msg.channel.send('Scene has been created with the ' + tag + ' tag.');
        }
        else {
          msg.channel.send('That tag has already been used for a scene.');
        }
      })
    }
  },

  addChoice: function(msg, con) {
    //tag scene1 scene2 [choice]
    let data = (msg.content.split('c!add choice ')[1]).split(' ');

    if (data.length > 3) {
      let tag = data[0];
      let scene1tag = data[1];
      let scene2tag = data[2];

      access.sceneByTag(scene1tag, con, function(scene1) {
        if (scene1.length == 1) {
          access.sceneByTag(scene2tag, con, function(scene2) {
            if (scene2.length == 1) {
              let ch = (msg.content.split('[')[1]).split(']')[0];
              let sql = 'INSERT INTO choice (tag, scene, next, choice) VALUES("' + tag + '", ' + scene1[0].sceneID + ', ' + scene2[0].sceneID + ', "' + ch + '")';
              con.query(sql);
              msg.channel.send('Choice has been created with the ' + tag + ' tag.');
            }
            else {
              msg.channel.send('Scene ' + scene2tag + ' does not exist.');
            }
          })
        }
        else {
          msg.channel.send('Scene ' + scene1tag + ' does not exist.');
        }
      })
    }
  },

  addCastor: function(msg, con) {
    //id name link owner
    let data = (msg.content.split('c!add castor ')[1]).split(' ');

    if (data.length == 4) {
      let id = Number(data[0]);

      if (!isNaN(id)) {
        let name = data[1];
        let link = data[2];
        let owner = msg.mentions.users.first().id;
        let sql = 'INSERT INTO castor (castorID, name, link, owner) VALUES(' + id + ', "' + name + '", "' + link + '", "' + owner + '")';
        con.query(sql);
        msg.channel.send(name + ' has been added to the castor database.');
      }

      else {
        msg.channel.send('Your numbers don\'t add up (Numbers are in the wrong place. c!add castor id name level link)');
      }
    }

    else {
      msg.channel.send('Too many or too few words. Reminder that the format is c!add castor id name level link');
    }
  }
}
