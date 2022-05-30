import { serve } from "./deps.ts";

const body = { message: "Hello World! 👋" };
const headers = new Headers({
  'Content-Type': 'application/json; charset=utf-8'
});

for await (const req of serve({ port: 8080 })) {
  req.respond({ 
    body: JSON.stringify(body),
    headers,
  });
}