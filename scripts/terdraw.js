import * as mc from "@minecraft/server";

export class Terdraw {
  static async load(path, player, location) {
    const heightmapFile = await import(`./ter/${path}/heightmap`);
    mc.system.runJob(this.gen(location, player, heightmapFile.heightmap));
  }

  static *gen(location, player, heightmap) {
    for (let x = 0; x < 32; x++) {
      for (let y = 0; y < 32; y++) {
        const locationWithoutHeight = {
          x: x * 16 + location.x,
          y: location.y + 320,
          z: y * 16 + location.z,
        };
        player.teleport(locationWithoutHeight);
        for (let xf = 0; xf < 16; xf++) {
          for (let yf = 0; yf < 16; yf++) {
            const startLocation = {
              x: x * 16 + xf + location.x,
              y: location.y,
              z: y * 16 + yf + location.z,
            };
            const finalLocation = {
              x: x * 16 + xf + location.x,
              y:
                heightmap[
                  `{\n  \"x\": ${x * 16 + xf},\n  \"y\": ${y * 16 + yf}\n}`
                ] + location.y,
              z: y * 16 + yf + location.z,
            };

            player.dimension.fillBlocks(
              new mc.BlockVolume(startLocation, finalLocation),
              "minecraft:stone",
              { ignoreChunkBoundErrors: true }
            );
          }
        }

        yield;
      }
    }
  }
}
