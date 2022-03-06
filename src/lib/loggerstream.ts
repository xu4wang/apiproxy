
import Logger from "./logger";

class LoggerStream {
    write(message: string) {
        Logger.info(message.substring(0, message.lastIndexOf('\n')));
    }
  }
  
export default LoggerStream