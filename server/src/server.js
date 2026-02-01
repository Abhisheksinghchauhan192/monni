import app from "./app.js";
import { validateServerEnv } from "./config/env.js";
const { PORT }  = validateServerEnv();

app.listen(PORT, () => {
  console.log(`🚀 MoNNI server running on port ${PORT}`);
});
