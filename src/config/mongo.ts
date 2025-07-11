/// <reference lib="deno.ns" />

import mongoose from 'npm:mongoose@7';
import "https://deno.land/std@0.224.0/dotenv/load.ts";

const MONGO_URI = Deno.env.get("MONGO_URI") || "";

await mongoose.connect(MONGO_URI);

export { mongoose };