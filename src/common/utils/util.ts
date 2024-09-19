import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

export class Utils {
  static toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  static md5(contents: string): string {
    return crypto.createHash('md5').update(contents).digest('hex');
  }

  static async bcryptHash(contents: string): Promise<string> {
    return await bcrypt.hash(contents, 10);
  }

  static async bcryptCompare(contents: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(contents, hash);
  }
}
