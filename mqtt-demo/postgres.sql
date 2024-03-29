CREATE TABLE IF NOT EXISTS mqtt (
	id		SERIAL PRIMARY KEY,
	time	TIMESTAMP WITH TIME ZONE NOT NULL,
	topic	TEXT,
	data	JSONB
);
CREATE INDEX IF NOT EXISTS mqtt_time ON mqtt (time);
CREATE INDEX IF NOT EXISTS mqtt_topic ON mqtt (topic);
