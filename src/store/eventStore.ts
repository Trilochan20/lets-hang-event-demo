import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Event } from '@/types/event';
import { mockBackend } from '../services/mockBackend';

type EventDraft = {
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
};

interface EventState extends EventDraft {
  resetToken: number;
  currentEventId: string | null;
  updateEventField: <K extends keyof EventDraft>(field: K, value: EventDraft[K]) => void;
  setFlyerImage: (imageId: string | null) => void;
  setPageBackground: (id: string | null, type: 'gradient' | 'image') => void;
  saveEvent: () => Promise<{ id: string; mode: 'created' | 'updated' }>;
  loadEvent: (id: string) => Promise<boolean>;
  resetForm: () => void;
  loadDraft: () => void;
}

const defaultDraft: EventDraft = {
  eventName: '',
  phoneNumber: '',
  dateTime: null,
  location: '',
  costPerPerson: 0,
  description: '',
  capacity: 0,
  flyerImageId: null,
  pageBackgroundId: 'gradient-pink-purple',
  pageBackgroundType: 'gradient' as const,
};

export const useEventStore = create<EventState>()(
  persist(
    (set, get) => ({
      ...defaultDraft,
      resetToken: 0,
      currentEventId: null,

      updateEventField: <K extends keyof EventDraft>(field: K, value: EventDraft[K]) => {
        set({ [field]: value } as Pick<EventDraft, K>);
      },

      setFlyerImage: (imageId: string | null) => {
        set({ flyerImageId: imageId });
      },

      setPageBackground: (id: string | null, type: 'gradient' | 'image') => {
        set({ 
          pageBackgroundId: id, 
          pageBackgroundType: type 
        });
      },

      saveEvent: async () => {
        const state = get();
        const eventData: Omit<Event, 'id' | 'createdAt'> = {
          eventName: state.eventName,
          phoneNumber: state.phoneNumber,
          dateTime: state.dateTime,
          location: state.location,
          costPerPerson: state.costPerPerson,
          description: state.description,
          capacity: state.capacity,
          flyerImageId: state.flyerImageId,
          pageBackgroundId: state.pageBackgroundId,
          pageBackgroundType: state.pageBackgroundType,
        };

        if (state.currentEventId) {
          await mockBackend.updateEvent(state.currentEventId, eventData);
          mockBackend.clearDraft();
          return { id: state.currentEventId, mode: 'updated' };
        }

        const result = await mockBackend.createEvent(eventData);
        set({ currentEventId: result.id });
        mockBackend.clearDraft();
        return { id: result.id, mode: 'created' };
      },

      loadEvent: async (id: string) => {
        const event = await mockBackend.getEvent(id);
        if (!event) {
          return false;
        }

        set((state) => ({
          ...state,
          eventName: event.eventName,
          phoneNumber: event.phoneNumber,
          dateTime: event.dateTime,
          location: event.location,
          costPerPerson: event.costPerPerson,
          description: event.description,
          capacity: event.capacity,
          flyerImageId: event.flyerImageId,
          pageBackgroundId: event.pageBackgroundId,
          pageBackgroundType: event.pageBackgroundType,
          currentEventId: id,
          resetToken: state.resetToken + 1,
        }));

        return true;
      },

      resetForm: () => {
        set((state) => ({
          ...defaultDraft,
          currentEventId: null,
          resetToken: state.resetToken + 1,
        }));
        mockBackend.clearDraft();
      },

      loadDraft: () => {
        const draft = mockBackend.getDraft();
        if (draft) {
          set((state) => ({
            ...state,
            ...draft,
            currentEventId: null,
            resetToken: state.resetToken + 1,
          }));
        }
      },
    }),
    {
      name: 'event-draft',
      partialize: (state) => ({
        eventName: state.eventName,
        phoneNumber: state.phoneNumber,
        dateTime: state.dateTime,
        location: state.location,
        costPerPerson: state.costPerPerson,
        description: state.description,
        capacity: state.capacity,
        flyerImageId: state.flyerImageId,
        pageBackgroundId: state.pageBackgroundId,
        pageBackgroundType: state.pageBackgroundType,
      }),
    }
  )
);

