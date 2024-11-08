const redis = require("redis");
const { redisHost, redisPort } = require("./environment-vars");

const client = redis.createClient({
  host: redisHost,
  port: redisPort,
});

client.on("error", (err) => console.error("Redis Client Error", err));

module.exports = client;
