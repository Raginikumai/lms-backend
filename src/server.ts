import app from './app'; 
import { ENV } from "./config/env";

const PORT = ENV.PORT || 5000;

// --- ADD THIS LINE AT THE VERY TOP ---
console.log(`--- STARTING SERVER ---`);
console.log(`[DEBUG] DATABASE_URL on Render is: "${ENV.DATABASE_URL}"`);
console.log(`--- END DEBUG ---`);
// ---
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});