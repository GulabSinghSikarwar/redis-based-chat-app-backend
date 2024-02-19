const kafka = require('./kafkaClient')

const { getLogger } = require('../utils/logger_service')
const Logger = getLogger()
const { kafkaTopics } = require('../utils/strings')
const MessageModel = require('../db_service/model/Message')


const startMessageConsumer = async () => {

    Logger.info('Starting message consumer')

    const consumer = kafka.consumer({ groupId: "default" });
    await consumer.connect();
    consumer.subscribe({ topic: kafkaTopics.MESSAGE, fromBeginning: true },)

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ message, pause }) => {
            console.log("MESSAGE RECIVED");
            if (!message.value) return;

            Logger.debug(`Received message : ${JSON.stringify(message)}`)

            try {
                // Write message to db 
                const Message = new MessageModel({
                    message: message.value.toString()
                })
                const savedMessage = await Message.save();
                Logger.info(`Message Succesfully Saved in DB : ${JSON.stringify(savedMessage)}`);
                

            } catch (error) {

                Logger.error(error.message)
            }


        }
    })
}
module.exports = { startMessageConsumer };
