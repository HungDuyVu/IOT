const mqtt = require('mqtt');

const createMQTTConnection = () => {
  const mqttServer = process.env.MQTT_SERVER || 'broker.hivemq.com';
  const mqttPort = parseInt(process.env.MQTT_PORT) || 1883;
  const mqttClientID = process.env.MQTT_CLIENT_ID || 'clientId-ebeCaPiFKb';
  const mqttTopic = process.env.MQTT_TOPIC || 'testtopic/';

  const client = mqtt.connect(`mqtt://${mqttServer}:${mqttPort}`, {
    username: mqttClientID,
    password: '',
    clientId: mqttClientID
  });

  client.on('connect', () => {
    console.log(`Connected to MQTT broker at ${mqttServer}:${mqttPort}`);
    client.subscribe(mqttTopic, (err) => {
      if (!err) {
        console.log(`Subscribed to ${mqttTopic}`);
      } else {
        console.error(`Failed to subscribe to ${mqttTopic}`, err);
      }
    });
  });

  client.on('message', (topic, message) => {
    console.log(`Received MQTT message on topic ${topic}: ${message.toString()}`);
  });

  return client;
};

module.exports = createMQTTConnection;
