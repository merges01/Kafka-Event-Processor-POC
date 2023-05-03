const kafka = require('kafka-node');
const mysql = require('mysql');
const request = require('request');

var MySQLEvents = require('mysql-events');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new kafka.Consumer(client, [{ topic: 'firstTestTopic' }]);



function sendToExternalEndpoint(data) {
  return new Promise((resolve, reject) => {
    const options = {
      url: 'http://localhost:8000/webservice.php',
      method: 'POST',
      json: true,
      body: data
    };

    request(options, function(err, res, body) {
      if (err) {
        console.error('Error sending data to external endpoint:', err);
        reject(err);
      } else {
        console.log('Data sent to external endpoint:', body);
        resolve(body);
      }
    });
  });
}

consumer.on('message', function(message) {
  console.log('new message arrived: ', message);
  sendToExternalEndpoint(message.value)
    .then(responseValue => {
      console.log('Response message value:', responseValue);
    })
    .catch(error => {
      console.error('Error sending data to external endpoint:', error);
    });
});


/**
 * Listening to row insert
 */
const config = {
  host: 'localhost',
  user: 'root',
  password: 'rootpassword',
  database: 'event_processor',
  port: 3346,
};

var myCon = MySQLEvents(config);

myCon.add(
  'event_processor.payments',
  function (oldRow, newRow, event) {
     //row inserted
    if (oldRow === null) {
      console.log('row was inserted', newRow);
    }

     //row deleted
    if (newRow === null) {
      //delete code goes here
    }

     //row updated
    if (oldRow !== null && newRow !== null) {
      //update code goes here
    }

    //detailed event information
    //console.log(event)
  }
);
