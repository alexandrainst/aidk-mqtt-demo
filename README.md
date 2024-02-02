# MQTT to PostgreSQL demo in Node.js with Docker

## A few preliminary commands

```sh
npm install

# For development
npm run-script fix
npm test

npm run
```

## Environment variables

Populate a `mqtt-demo/.env` file:

```env
MQTT_SERVER_URL=mqtt://mosquitto
MQTT_USERNAME=
MQTT_PASSWORD=

PGUSER=iot
PGHOST=postgres
PGPASSWORD=CRxVcSPsB704
PGDATABASE=iot
```
