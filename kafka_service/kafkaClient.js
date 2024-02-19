const {Kafka} =require("kafkajs")

const kafka=new Kafka(
  {
    clientId:"Kafka",
   brokers:["192.168.29.221:9092"] 
  }
)
module.exports = kafka
