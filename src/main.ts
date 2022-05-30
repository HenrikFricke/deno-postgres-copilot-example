import { Client, serve } from "./deps.ts";

const { username, host, dbname, password, port } = JSON.parse(
  Deno.env.get("DENOAPPCLUSTER_SECRET") || "{}",
);
const client = new Client({
  user: username,
  database: dbname,
  hostname: host,
  password,
  port,
});
await client.connect();

const body = { message: "Hello World! 👋" };
const headers = new Headers({
  "Content-Type": "application/json; charset=utf-8",
});

for await (const req of serve({ port: 8080 })) {
  req.respond({
    body: JSON.stringify(body),
    headers,
  });
}

await client.end();
