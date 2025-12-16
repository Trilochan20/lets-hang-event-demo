import type { Event } from '@/types/event';

class MockBackendService {
  private readonly EVENTS_KEY = 'lets-hang-events';
  private readonly DRAFT_KEY = 'lets-hang-current-draft';

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getEvents(): Record<string, Event> {
    try {
      const data = localStorage.getItem(this.EVENTS_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error reading events from localStorage:', error);
      return {};
    }
  }

  private saveEvents(events: Record<string, Event>): void {
    try {
      localStorage.setItem(this.EVENTS_KEY, JSON.stringify(events));
    } catch (error) {
      console.error('Error saving events to localStorage:', error);
    }
  }

  async createEvent(eventData: Omit<Event, 'id' | 'createdAt'>): Promise<{ id: string }> {
    await this.delay(500);

    const eventId = crypto.randomUUID();
    const events = this.getEvents();
    
    const newEvent: Event = {
      ...eventData,
      id: eventId,
      createdAt: new Date(),
    };

    events[eventId] = newEvent;
    this.saveEvents(events);

    return { id: eventId };
  }

  async getEvent(id: string): Promise<Event | null> {
    await this.delay(300);

    const events = this.getEvents();
    const event = events[id];

    if (!event) {
      return null;
    }

    return {
      ...event,
      dateTime: event.dateTime ? new Date(event.dateTime) : null,
      createdAt: event.createdAt ? new Date(event.createdAt) : undefined,
    };
  }

  async updateEvent(id: string, data: Partial<Event>): Promise<void> {
    await this.delay(400);

    const events = this.getEvents();
    
    if (!events[id]) {
      throw new Error(`Event with id ${id} not found`);
    }

    events[id] = {
      ...events[id],
      ...data,
    };

    this.saveEvents(events);
  }

  async deleteEvent(id: string): Promise<void> {
    await this.delay(300);

    const events = this.getEvents();
    delete events[id];
    this.saveEvents(events);
  }

  async getAllEvents(): Promise<Event[]> {
    await this.delay(400);

    const events = this.getEvents();
    return Object.values(events).map(event => ({
      ...event,
      dateTime: event.dateTime ? new Date(event.dateTime) : null,
      createdAt: event.createdAt ? new Date(event.createdAt) : undefined,
    }));
  }

  saveDraft(draftData: Partial<Event>): void {
    try {
      localStorage.setItem(this.DRAFT_KEY, JSON.stringify(draftData));
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  }

  getDraft(): Partial<Event> | null {
    try {
      const data = localStorage.getItem(this.DRAFT_KEY);
      if (!data) return null;

      const draft = JSON.parse(data);
      return {
        ...draft,
        dateTime: draft.dateTime ? new Date(draft.dateTime) : null,
      };
    } catch (error) {
      console.error('Error reading draft:', error);
      return null;
    }
  }

  clearDraft(): void {
    try {
      localStorage.removeItem(this.DRAFT_KEY);
    } catch (error) {
      console.error('Error clearing draft:', error);
    }
  }
}

export const mockBackend = new MockBackendService();

