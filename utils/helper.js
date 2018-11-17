const access = require('./access.js');

module.exports = {
  displayScene: function(add, sceneID, castor, msg, con) {
    access.sceneByID(sceneID, con, function(scene){
      if (scene.length == 1) {
        access.choiceByScene(sceneID, con, function(choices) {
          let options = '';

          if (choices.length != 0) {
            for (i = 0; i < choices.length; i++) {
              options += '-> ' + choices[i].choice + ' (' + choices[i].tag + ')\n';
            }
          }

          msg.channel.send(add + (scene[0].scenario).replace(/<<castor>>/gi, castor) + '\n\n' + options);
        })
      }
    })
  }
}
