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

## Manual commands to experiment

### 1 Start stack

```sh
cd mqtt-demo/
docker-compose pull
docker-compose build --pull
docker-compose up
# When done, [CONTROL]+[C]
docker-compose down --volumes
```

### 2 Publish on MQTT

In another process:

```sh
docker exec mosquitto mosquitto_pub -t 'test' -m '{"Hello": "World"}'
```

Optionally, in yet another process, listen to MQTT:

```sh
docker exec mosquitto mosquitto_sub -t '#' -v
```

### 3 Check data in PostgreSQL

```sh
docker exec -it postgres psql -d iot -U iot -c 'SELECT * FROM mqtt ORDER BY id DESC LIMIT 10;'
```
