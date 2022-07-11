import { PORT } from "./tools/env";
import env from "dotenv";
import { connectToDB } from "./tools/mongo";
import { core } from "./core";

env.config();

const server = core.listen(PORT, async () => {
  await connectToDB();
  console.log(`>>> 🌍 >>> Server running on port >>> ${PORT}`);
});

export { server };
