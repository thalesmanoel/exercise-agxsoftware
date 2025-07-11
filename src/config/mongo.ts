/// <reference lib="deno.ns" />

import mongoose from "npm:mongoose@7";
import "https://deno.land/std@0.224.0/dotenv/load.ts";

const MONGO_URI = Deno.env.get("MONGO_URI") || "";

try {
  await mongoose.connect(MONGO_URI);
  console.log("Conectado ao MongoDB com sucesso");
} catch (error) {
  console.error("Falha ao conectar no MongoDB:", error.message);
}
