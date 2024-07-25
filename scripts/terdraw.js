import * as mc from "@minecraft/server";

export class Terdraw {
  static async load(path, player, location) {
    const heightmapFile = await import(`./ter/${path}/heightmap`);
    mc.system.runJob(this.gen(location, player, heightmapFile.heightmap));
  }

  static *gen(location, player, heightmap) {
    for (let x = 0; x < 511; x++) {
      for (let y = 0; y < 511; y++) {
        const locationWithoutHeight = {
          x: x + location.x,
          y: location.y,
          z: y + location.z,
        };
        const finalLocation = {
          x: x + location.x,
          y: heightmap[`{\n  \"x\": ${x},\n  \"y\": ${y}\n}`] + location.y,
          z: y + location.z,
        };

        player.teleport(locationWithoutHeight);
        player.dimension.fillBlocks(
          new mc.BlockVolume(locationWithoutHeight, finalLocation),
          "minecraft:stone",
          { ignoreChunkBoundErrors: true }
        );
        yield;
      }
    }
  }
}
