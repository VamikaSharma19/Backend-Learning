let {createClient} = require("redis");
let client = createClient();

async function notify() {
  await client.PUBLISH("notify", JSON.stringify({ event_id : 1, message : "Iphone back in stock"}))
}
setTimeout(() => {
  notify()
},2000)

client.connect()
.then(() =>
  console.log("redis connected"))