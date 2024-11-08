require("dotenv").config();

module.exports = {
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  rabbitMQUrl: process.env.RABBITMQ_URL,
  port: process.env.PORT,
};
