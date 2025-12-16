import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { ImageRecord } from '@/types/event';

interface LetsHangDB extends DBSchema {
  'flyer-images': {
    key: string;
    value: ImageRecord;
  };
  'background-images': {
    key: string;
    value: ImageRecord;
  };
}

class ImageStorage {
  private dbPromise: Promise<IDBPDatabase<LetsHangDB>>;
  private blobUrls: Map<string, string> = new Map();

  constructor() {
    this.dbPromise = openDB<LetsHangDB>('letsHangDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('flyer-images')) {
          db.createObjectStore('flyer-images');
        }
        if (!db.objectStoreNames.contains('background-images')) {
          db.createObjectStore('background-images');
        }
      },
    });
  }

  async saveFlyerImage(file: File): Promise<string> {
    const id = crypto.randomUUID();
    const db = await this.dbPromise;
    
    const record: ImageRecord = {
      blob: file,
      filename: file.name,
      uploadedAt: new Date(),
    };

    await db.put('flyer-images', record, id);
    return id;
  }

  async getFlyerImage(id: string): Promise<string> {
    if (this.blobUrls.has(id)) {
      return this.blobUrls.get(id)!;
    }

    const db = await this.dbPromise;
    const record = await db.get('flyer-images', id);
    
    if (!record) {
      return '';
    }

    const url = URL.createObjectURL(record.blob);
    this.blobUrls.set(id, url);
    return url;
  }

  async deleteFlyerImage(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('flyer-images', id);
    
    if (this.blobUrls.has(id)) {
      URL.revokeObjectURL(this.blobUrls.get(id)!);
      this.blobUrls.delete(id);
    }
  }

  async saveBackgroundImage(file: File): Promise<string> {
    const id = crypto.randomUUID();
    const db = await this.dbPromise;
    
    const record: ImageRecord = {
      blob: file,
      filename: file.name,
      uploadedAt: new Date(),
    };

    await db.put('background-images', record, id);
    return id;
  }

  async getBackgroundImage(id: string): Promise<string> {
    if (this.blobUrls.has(id)) {
      return this.blobUrls.get(id)!;
    }

    const db = await this.dbPromise;
    const record = await db.get('background-images', id);
    
    if (!record) {
      return '';
    }

    const url = URL.createObjectURL(record.blob);
    this.blobUrls.set(id, url);
    return url;
  }

  async deleteBackgroundImage(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('background-images', id);
    
    if (this.blobUrls.has(id)) {
      URL.revokeObjectURL(this.blobUrls.get(id)!);
      this.blobUrls.delete(id);
    }
  }

  cleanup(): void {
    this.blobUrls.forEach(url => URL.revokeObjectURL(url));
    this.blobUrls.clear();
  }
}

export const imageStorage = new ImageStorage();

