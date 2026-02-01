import app from "./app.js";
import { PORT } from "./config/env.js";

app.listen(PORT, () => {
  console.log(`🚀 MoNNI server running on port ${PORT}`);
});
