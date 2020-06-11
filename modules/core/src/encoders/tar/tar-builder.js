import Tar from './tar';

const TAR_BUILDER_OPTIONS = {
  recordsPerBlock: 20
};

export default class TARBuilder {
  /** @type {Tar} */
  tape;
  /** @type {number} */
  count;

  static get properties() {
    return {
      id: 'tar',
      name: 'TAR',
      extensions: ['tar'],
      mimeType: 'application/x-tar',
      builder: TARBuilder,
      options: TAR_BUILDER_OPTIONS
    };
  }

  /**
   * @param {Partial<typeof TAR_BUILDER_OPTIONS>} options
   */
  constructor(options) {
    this.options = {...TAR_BUILDER_OPTIONS, ...options};
    this.tape = new Tar(this.options.recordsPerBlock);
    this.count = 0;
  }

  /**
   * @param {File} file
   */
  async add(file) {
    const buffer = await file.arrayBuffer();
    this.tape.append(file.name, new Uint8Array(buffer));
    this.count++;
  }

  async build() {
    return Promise.resolve(this.tape.save());
  }
}
