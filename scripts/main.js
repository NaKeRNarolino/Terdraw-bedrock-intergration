import * as mc from "@minecraft/server";
import { Terdraw } from "./terdraw";

mc.world.afterEvents.chatSend.subscribe((data) => {
  const { message, sender: player } = data;
  const tokens = message.split(" ");
  if (tokens[0] == ">terdraw") {
    if (tokens[1] == "load") {
      Terdraw.load(tokens[2], player, player.location);
      console.warn("Loading " + tokens[2]);
    }
  }
});
