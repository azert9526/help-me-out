import winston from 'winston';
import path from 'path';

//nu functioneaza cum trebuie
const getCallerFile = () => {
  const stack = new Error().stack;
  if (!stack) return "unknown";
  const stackLines = stack.split("\n");
  const callerLine = stackLines[3] || "";
  const match = callerLine.match(/\(([^)]+)\)/);
  if (match && match[1]) {
    return path.basename(match[1].split(":")[0]); 
  }
  return "unknown";
};



const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf((info) => {
      const caller = getCallerFile();
      return `[${info.timestamp}] [${caller}] ${info.level.toUpperCase()}: ${info.message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: "logs/app.log" })
  ],
});

export default logger;
