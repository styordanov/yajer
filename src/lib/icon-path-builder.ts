import * as upath from 'upath';

export default class IconPathBuilder {
  static build(icon: string): string {
    return upath.join(__dirname, '..', 'media', icon);
  }
}
