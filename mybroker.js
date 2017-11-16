var mosca = require('mosca');

var server = new mosca.Server({port:2223});

server.on('clientConnected', function(client){
	console.log('client connected',client.id);
});

server.on('published',function(packet, client){
    console.log('published na',packet);
})

server.on('ready',function(){ console.log('ready leaw wei')});

server.on('subscribed', function(topic, client) {
    console.log('subscribed : ', topic);
    console.log('client connected',client.id);
});
