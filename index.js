const Discord = require('discord.js');
const bot = new Discord.Client();
const mysql = require('mysql');

const db = require('require-dir-all')('./commands/db');

if(process.env.JAWSDB_URL) {
    con = mysql.createConnection(process.env.JAWSDB_URL);
};

bot.on('message', (message) => {
  let msg = message.content.toLowerCase();

  if (msg == 'c!mycastors') {
    db.list.myCastors(message, con);
  }

  if (msg.startsWith('c!add ')) {

    //c!add story tag startingscenetag [title]
    //c!add scene tag [text]
    //c!add choice tag scene1tag scene2tag [choice]

    let data = msg.split(' ');

    switch (data[1]) {
      case 'story':
        db.add.addStory(message, con);
        break;
      case 'scene':
        db.add.addScene(message, con);
        break;
      case 'choice':
        db.add.addChoice(message, con);
        break;
      case 'castor':
        db.add.addCastor(message, con);
        break;
      default:
        message.channel.send('Invalid.');
    }
  }

  if (msg.startsWith('c!update ')) {

    //c!update castor id <what to update> <updated value>

    let data = msg.split(' ');

    switch (data[1]) {
      case 'castor':
        db.update.updateCastor(message, con);
        break;
      default:
        message.channel.send('Invalid.');
    }
  }

  if (msg.startsWith('c!delete ')) {

    //c!search story tag
    //c!search scene tag
    //c!search choice tag

    let data = msg.split(' ');

    switch (data[1]) {
      case 'story':
        db.delete.deleteStory(message, con);
        break;
      case 'scene':
        db.delete.deleteScene(message, con);
        break;
      case 'choice':
        db.delete.deleteChoice(message, con);
        break;
      default:
        message.channel.send('Invalid.');
    }
  }

  if (msg.startsWith('c!list ')) {

    //c!list stories
    //c!list scenes
    //c!list choices

    let data = msg.split(' ');

    switch (data[1]) {
      case 'stories':
        db.list.listStories(message, con);
        break;
      case 'scenes':
        db.list.listScenes(message, con);
        break;
      case 'choices':
        db.list.listChoices(message, con);
        break;
      default:
        message.channel.send('Invalid.');
    }
  }

  if (msg.startsWith('c!search ')) {

    //c!search story tag
    //c!search scene tag
    //c!search choice tag

    let data = msg.split(' ');

    switch (data[1]) {
      case 'story':
        db.search.searchStory(message, con);
        break;
      case 'scene':
        db.search.searchScene(message, con);
        break;
      case 'choice':
        db.search.searchChoice(message, con);
        break;
      case 'castor':
        db.search.searchCastor(message, con);
        break;
      default:
        message.channel.send('Invalid.');
    }
  }

  if (msg.startsWith('c!start ')) {
    db.venture.start(message, con);
  }

  if (msg.startsWith('c!pick ')){
    db.venture.pick(message, con);
  }
});

bot.login(process.env.BOT_TOKEN);
