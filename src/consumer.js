const connectRabbitMQ = require("./config/rabbitmq");
const redisClient = require("./config/redis");

(async () => {
  const channel = await connectRabbitMQ();
  await channel.assertQueue("book_queue", { durable: true });

  channel.consume(
    "book_queue",
    async (msg) => {
      const book = JSON.parse(msg.content.toString());
      const bookKey = `book:${book.title}:${book.author}`;

      console.log(`Processing book: ${book.title} by ${book.author}`);

      // Update Redis status to "processed"
      await redisClient.setAsync(bookKey, "processed");

      channel.ack(msg); // Acknowledge message as processed
    },
    { noAck: false }
  );
})();
