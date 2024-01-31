'use strict';

const mqtt = require('mqtt');
const client = mqtt.connect(process.env.MQTT_SERVER_URL || 'mqtt://localhost', {
	username: process.env.MQTT_USERNAME || '',
	password: process.env.MQTT_PASSWORD || '',
});

client.on('close', () => {
	console.log('==== MQTT closed ====');
});

client.on('connect', () => {
	console.log('==== MQTT connected ====');
});

client.on('disconnect', () => {
	console.log('==== MQTT disconnected ====');
});

client.on('error', (error) => {
	console.log('==== MQTT error ' + error + ' ====');
});

client.on('message', (topic, message) => {
	// message is Buffer
	console.log(topic + ' > ' + message.toString());
});

client.on('offline', () => {
	console.log('==== MQTT offline ====');
});

client.on('reconnect', () => {
	console.log('==== MQTT reconnected ====');
});

process.on('SIGINT', () => {
	console.error('==== Interrupted ====');
	process.exit(0);
});

process.on('SIGTERM', () => {
	console.error('==== Terminated ====');
	process.exit(0);
});
