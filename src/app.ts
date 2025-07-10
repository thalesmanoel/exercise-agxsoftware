import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const app = new Application();

console.log("🚀 Server running on http://localhost:8000");
await app.listen({ port: 8000 });
