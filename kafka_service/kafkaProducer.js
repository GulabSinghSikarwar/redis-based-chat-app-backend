const kafka = require('./kafkaClient')
const { getLogger } = require('../utils/logger_service');
const { kafkaTopics } = require('../utils/strings');
const { Partitioners } = require('kafkajs');
let producer;
const Logger = getLogger();

const createProducer = async () => {
    if (producer) return producer;

    const messageProducer = kafka.producer();
    await messageProducer.connect()
    producer = messageProducer;

    return producer;

}

const producMessage = async (message) => {
    const key = `message-${new Date()}`
    const logMessage = `
    key :${key},
    value:${message}
    topic :${kafkaTopics.MESSAGE}
    `
    console.log( "message TO BE produced ",message)
    Logger.info("Message Will be Produces : ", logMessage)
    const producer = await createProducer({
        createProducer: Partitioners.LegacyPartitioner
    });
    console.log("MESSAGE : ",message);
    await producer.send({
        messages: [
            {
                key: key,
                value: message
            }
        ],
        topic: kafkaTopics.MESSAGE
    })
    return true;
}

module.exports = { createProducer, producMessage }