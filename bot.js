var Discord = require('discord.js');
var auth = require('./auth.json');
const bot = new Discord.Client();
bot.login(auth.token);
function Emotion(str1, str2) { 
   this.name = str1; 
   this.emotions = str2; 
}
var embed = new Discord.RichEmbed(); 
var fs = require('fs');
var setplace;
//time schedule
var schedule = require('node-schedule');
var readline = require('readline');
var fs = require('fs');
var myFile = fs.readFileSync('event.txt', 'utf8')
var events = new Array();
var lines = myFile.toString().split('\n');
function date(str1, str2) { 
   this.d = str1; 
   this.Event = str2; 
} 
for(var i = 0; i < lines.length; i++){
	info = lines[i].split('.');
	events.push(new date(info[0],info[1]));
}

bot.on('ready', function (evt) {
	bot.user.setActivity('+help | v0.5.0', { type: 'PLAYING' });
   console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', message => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `+`
	
    if (message.content.substring(0, 1) == '+') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch(cmd) {
            // +help
            case 'help':
                message.channel.send('Commands: Help, Time, Today');
			break;
			case 'time':
				message.channel.send(hour12(new Date().toTimeString()));
            		break;
			case 'set':
            		break;
			case 'today':
				message.channel.send(embed.setTitle(today));
			break;
		}
}
});
	var now = new Date();
	var update;
	update = now.getMonth().toString();
	update = update.concat('-', now.getDate().toString());
	for (var i = 0; i < events.length; i++){
		if(events[i].d == update){
			var message = 'Today is: ';
			today = message.concat(new Date().toDateString(), '\nHappy ',events[i].Event);
			break;
		}
	}
// update at time
var j = schedule.scheduleJob('0 0 8 * * *', function(){
	var date = new Date();
	var dm;
	dm = date.getMonth().toString();
	dm = dm.concat('-', date.getDate().toString());
	for (var i = 0; i < events.length; i++){
		if(events[i].d == dm){
			var mess = 'Today is: ';
			today = mess.concat(new Date().toDateString());
			var day = 'Happy ';
			day = day.concat(events[i].Event);
 			embed.setDescription(day)
			bot.channels.get('636388868781899787').send(embed.setTitle(today));
			break;
		}
	}
});



function hour12(time){
	var hour = time.split(':');
	var am = '';
	var hr = parseInt(hour[0]);
	if(hr > 12){ 
		return (hr - 12).toString().concat(':',hour[1],':',hour[2].substr(0,2), ' PM GMT');
	}
	else{
		return hr.toString().concat(':',hour[1],':',hour[2].substr(0,2), ' AM GMT');
	}
}
function setting(loc){
	setplace = loc;
	return loc;
}
