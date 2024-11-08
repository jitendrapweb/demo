const redisClient = require("../config/redis");
const connectRabbitMQ = require("../config/rabbitmq");

async function addBook(req, res) {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }

  const bookKey = `book:${title}:${author}`;

  const status = await redisClient.get(bookKey);

  if (status === "processed") {
    return res.status(400).json({ error: "Book already processed" });
  }
  redisClient.set(bookKey, "received");

  const channel = await connectRabbitMQ();
  await channel.assertQueue("book_queue", { durable: true });
  channel.sendToQueue(
    "book_queue",
    Buffer.from(JSON.stringify({ title, author }))
  );

  res.status(200).json({ message: "Book received and queued for processing" });
}

module.exports = { addBook };
