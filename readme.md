# Kafka-Event-Processor-POC
Mini project of handling events with node js and kafka


1. Kafka: 'docker-compose up -d' to run kafka
2. Event processor: start with 'node event-processor.js'. It's listening to events emitted by app.js
3. Start webservice with 'php -S localhost:8000'
4. app.js
- start with 'node app.js'
- type something to emit event to kafka

app.js emit event using kafka, event processor is listening and forward the data to webservice which can do
the data processing 