'use strict';

import pg from 'pg';
import mqtt from 'mqtt';

// <PostgreSQL>
// Note: Uses environment variables by default
// https://node-postgres.com/features/connecting#environment-variables
const pgClient = new pg.Client();

async function done() {
	if (pgClient) {
		await pgClient.end();
	}
	process.exit(0);
}

pgClient.on('error', (err) => {
	console.error(err);
	done();
});

async function store(time, topic, message) {
	try {
		const sql = `
INSERT INTO mqtt (time, topic, data)
VALUES ($1, $2, $3)
`;
		await pgClient.query(sql, [time, topic, message]);
	} catch (err) {
		console.error(err);
		done();
		// Note: The container should be set up to automatically restart
	}
}

await pgClient.connect();
// </PostgreSQL>

// <MQTT>
// https://github.com/mqttjs/MQTT.js
const mqttClient = mqtt.connect(process.env.MQTT_SERVER_URL || 'mqtt://localhost', {
	username: process.env.MQTT_USERNAME || '',
	password: process.env.MQTT_PASSWORD || '',
});

mqttClient.on('close', () => {
	console.error('==== MQTT closed ====');
	done();
});

mqttClient.on('connect', () => {
	console.error('==== MQTT connected ====');
	mqttClient.subscribe('#', (err) => {
		if (err) {
			console.error(err);
		} else {
			console.error('==== MQTT subscribed ====');
		}
	});
});

mqttClient.on('disconnect', () => {
	console.error('==== MQTT disconnected ====');
	done();
});

mqttClient.on('error', (error) => {
	console.error('==== MQTT error ' + error + ' ====');
	done();
});

mqttClient.on('message', async (topic, message) => {
	// message is Buffer
	const time = (new Date()).toISOString();
	console.log(time + ':\t' + topic + '\t>\t' + message.toString());
	await store(time, topic, message.toString());
});

mqttClient.on('offline', () => {
	console.error('==== MQTT offline ====');
});

mqttClient.on('reconnect', () => {
	console.error('==== MQTT reconnected ====');
});
// </MQTT>

process.on('SIGINT', () => {
	console.error('==== Interrupted ====');
	done();
});

process.on('SIGTERM', () => {
	console.error('==== Terminated ====');
	done();
});
