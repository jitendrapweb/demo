const amqplib = require("amqplib");
const { rabbitMQUrl } = require("./environment-vars");

async function connectRabbitMQ() {
  const connection = await amqplib.connect(rabbitMQUrl);
  return connection.createChannel();
}

module.exports = connectRabbitMQ;
