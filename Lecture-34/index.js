/* Work flow of code -
1. Calls the connectRedis() function, triggering the whole sequence
2. Connect to Redis
3. Delete previous user key
4. Add a new hash entry
5. Retrieve and log the hash
6. Close the connection  */

const { createClient } = require("redis");

async function connectRedis() {
  const client = createClient ({
    url : "redis://localhost:6379"
  });
  
  client.on("error", (err) => console.error("Redis Client Error", err));

  await client.connect();
  console.log("Connected to Redis");

/* Simple key-value -
  await client.set("message", "Hello Redis");
  const value = await client.get("message");
  console.log("Stored value:", value);  */

  await client.del("user");

  await client.hSet("user", "name", "Vamika");
  const userData = await client.hGetAll("user");
  console.log("User data from hash:", userData);

  await client.quit();
}

connectRedis();