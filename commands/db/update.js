const access = require('../../utils/access.js');

module.exports = {
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
