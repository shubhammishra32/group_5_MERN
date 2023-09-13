import fs from "fs"
import { promisify } from "util"

const appendFile = promisify(fs.appendFile);

async function requestLogger(req, res, next) {
  try {
    const logMessage = `${new Date()} - ${req.method} - ${req.url} \n`;
    await appendFile('RequestLogger.log', logMessage);
    next();
  } catch (err) {
    next(err);
  }
}

export default requestLogger
