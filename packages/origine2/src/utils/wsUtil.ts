import { logger } from "./logger";
import {origineStore} from "@/store/origineStore";

export class WsUtil {
  public static sendSyncCommand(sceneName: string, lineNumber: number, lineCommandString: string) {

    if(!origineStore.getState().status.editor.isEnableLivePreview){
      return;
    }

    // @ts-ignore
    if (window["currentWs"] && this.getIsCurrentLineJump(lineCommandString)) { // @ts-ignore
      logger.debug("编辑器开始发送同步数据");
      // @ts-ignore
      window["currentWs"].send(`jmp ${sceneName} ${lineNumber}`);
    }
  }

  private static getIsCurrentLineJump(currentLineValue: string | null): boolean {
    const command = currentLineValue?.split(":")[0] ?? "";
    if (command === "unlockCg" || command === "unlockBgm") {
      if (!currentLineValue?.match(/;/g))
        return false;
    }
    return true;
  }
}
