
const app = require('express')();
const httpServer = require('http').createServer(app);
const axios = require('axios');
const request = require('request');
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});
var stockwatch = require('./stockwatch');
var stockw = new stockwatch();


const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });

	socket.emit('subscribed-btc-prices', {'test':'tester'});

  setInterval( async () => {
    try{
    let resp = await fetchAPI('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=31FW7TS9ZTK3FZYF');
    console.log(resp);		
    socket.emit('subscribed-btc-prices', resp);
  }
    catch(e){console.log(`Error: ${e.message}`)}

	}, 60000);

  setInterval(function () {
    var data = stockw.generateStocks();
    socket.emit('stocks', data);      
}, 3000);
});

function fetchAPI(apiPath) {
	return new Promise(function (resolve, reject) {
		request(apiPath, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			} else {
				reject(error);
			}
		});
	});
}

httpServer.listen(port, () => console.log(`listening on port http://localhost:${port}/`));