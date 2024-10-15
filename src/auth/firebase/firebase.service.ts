import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private app: admin.app.App;

  constructor() {
    if (!admin.apps.length) {
      this.app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
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
