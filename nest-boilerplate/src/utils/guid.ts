export class Guid {
  static newGuid(isCharOnly = false) {
    let pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    if (isCharOnly) {
      pattern = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx';
    }
    return pattern.replace(/[xy]/g, c => {
      // tslint:disable-next-line:no-bitwise
      const r = (Math.random() * 16) | 0,
        // tslint:disable-next-line:no-bitwise
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  static shortGuid(length: number) {
    const guid = Guid.newGuid();
    if (length && length < guid.length) {
      return guid.slice(0, length);
    }

    return guid;
  }

  static shortGuidCharOnly(length: number) {
    const guid = Guid.newGuid(true);
    if (length && length < guid.length) {
      return guid.slice(0, length);
    }

    return guid;
  }
}
