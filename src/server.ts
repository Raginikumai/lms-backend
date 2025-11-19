import app from './app';
import { ENV } from './config/env';
import logger from './config/logger';

const PORT = ENV.PORT || 5000;

// --- ADD THIS LINE AT THE VERY TOP ---
// logger.info(`--- STARTING SERVER ---`);
// logger.info(`[DEBUG] DATABASE_URL on Render is: "${ENV.DATABASE_URL}"`);
// logger.info(`--- END DEBUG ---`);
// ---
app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});
