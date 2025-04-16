import app from "./server";
import { PORT as port } from "./configs/env.configs";

const PORT = port || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
