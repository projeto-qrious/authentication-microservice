import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private app: admin.app.App;

  constructor() {
    const firebaseConfigBase64 = process.env.FIREBASE_CONFIG_BASE64;
    if (!firebaseConfigBase64) {
      throw new Error('FIREBASE_CONFIG_BASE64 environment variable is missing');
    }

    const serviceAccount = JSON.parse(
      Buffer.from(firebaseConfigBase64, 'base64').toString('utf-8'),
    );

    if (!admin.apps.length) {
      this.app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://qrious-51310-default-rtdb.firebaseio.com/',
      });
    } else {
      this.app = admin.app();
    }
  }

  getAuth(): admin.auth.Auth {
    return this.app.auth();
  }

  getDatabase(): admin.database.Database {
    return this.app.database();
  }

  async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return await this.getAuth().verifyIdToken(idToken);
  }
}
