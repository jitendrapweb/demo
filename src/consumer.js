const connectRabbitMQ = require("./config/rabbitmq");
const redisClient = require("./config/redis");

(async () => {
  // Connect to RabbitMQ
  const channel = await connectRabbitMQ();
  await channel.assertQueue("book_queue", { durable: true });

  // Consume messages
  channel.consume(
    "book_queue",
    async (msg) => {
      // Process message
      const book = JSON.parse(msg.content.toString());
      const bookKey = `book:${book.title}:${book.author}`;

      console.log(`Processing book: ${book.title} by ${book.author}`);

      // Update Redis status to "processed"
      await redisClient.setAsync(bookKey, "processed");

      //   Acknowledge message
      channel.ack(msg);
    },
    { noAck: false }
  );
})();
