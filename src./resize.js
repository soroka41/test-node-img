var fs = require('fs'),
  sharp = require('sharp'),
  uuidv4 = require('uuid/v4'),
  path = require('path');




class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize({
        width: 300,
        height: 300,
        kernel: sharp.kernel.nearest,
        centreSampling: true,
        centerSampling : true,
        fit: 'cover',
        position: 'centre',
      })
      .max()
      .crop(sharp.strategy.entropy)
      .toFile(filepath);

    return filename;
  }
  static filename() {
    return `${uuidv4()}.png`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;