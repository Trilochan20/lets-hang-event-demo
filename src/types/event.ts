export interface Event {
    id?: string;
    eventName: string;
    phoneNumber: string;
    dateTime: Date | null;
    location: string;
    costPerPerson: number;
    description: string;
    capacity: number;
    flyerImageId: string | null;
    pageBackgroundId: string | null;
    pageBackgroundType: 'gradient' | 'image';
    createdAt?: Date;
  }
  
  export interface ImageRecord {
    blob: Blob;
    filename: string;
    uploadedAt: Date;
  }
  
  