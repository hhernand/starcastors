const access = require('../../utils/access.js');
const helper = require('../../utils/helper.js');

module.exports = {
  start: function(msg, con) {
    let storytag = msg.content.split(' ')[1];
    access.storyByTag(storytag, con, function(story) {
      if (story.length == 1) {
        let castorid = msg.content.split(' ')[2];
        access.castorByID(castorid, con, function(castor) {
          if (castor.length == 1) {
            access.castorLogByStory(castorid, story[0].storyID, con, function(log) {
              if (log.length == 0) {
                if (msg.author.id == castor[0].owner) {
                  let begin = '**' + story[0].name + '**\n\n';
                  helper.displayScene(begin, story[0].start, msg, con);
                  let sql = 'INSERT INTO venturelog (castorID, sceneID, storyID) VALUES(' + castorid + ', ' + story[0].start + ', ' + story[0].storyID + ')';
                  con.query(sql);
                }
                else {
                  msg.channel.send('You don\'t own that castor.');
                }
              }
              else {
                msg.channel.send('Stories cannot be restarted with the same castor unless ownership of the castor has been changed.');
              }
            })
          }
        })
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
        let castorid = msg.content.split(' ')[2];
        access.castorByID(castorid, con, function(castor) {
          if (castor.length == 1) {
            if (msg.author.id == castor[0].owner) {
              access.castorLogByScene(castorid, choice[0].scene, con, function(logentry) {
                if (logentry.length == 1) {
                  helper.displayScene('', choice[0].next, msg, con);
                  let sql1 = 'UPDATE venturelog SET choiceID = ' + choice[0].choiceID + ' WHERE castorID = ' + castorid + ' AND sceneID = ' + choice[0].scene;
                  let sql2 = 'INSERT INTO venturelog (castorID, sceneID, storyID) VALUES(' + castorid + ', ' + choice[0].next + ', ' + logentry[0].storyID + ')';
                  con.query(sql1);
                  con.query(sql2);
                }
                else {
                  msg.channel.send('You cannot make that choice, either because it\'s not an option or you already made a choice in that scenario.');
                }
              })
            }
            else {
              msg.channel.send('You don\'t own that castor.');
            }
          }
          else {
            msg.channel.send('That castor does not exist.');
          }
        })
      }
      else {
        msg.channel.send('That choice does not exist.');
      }
    })
  }
}
