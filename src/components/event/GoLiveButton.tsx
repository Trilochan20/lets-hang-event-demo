import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Sparkles, CheckCircle, Copy } from 'lucide-react';
import { useEventStore } from '@/store/eventStore';

export default function GoLiveButton() {
  const { eventName, dateTime, location, saveEvent, resetForm } = useEventStore();
  const [isLoading, setIsLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [eventId, setEventId] = useState('');
  const [saveMode, setSaveMode] = useState<'created' | 'updated' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const validateForm = () => {
    if (!eventName) return 'Event name is required';
    if (!dateTime) return 'Date and time are required';
    if (!location) return 'Location is required';
    return null;
  };

  const handleGoLive = async () => {
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      setErrorOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const result = await saveEvent();
      setEventId(result.id);
      setSaveMode(result.mode);
      setSuccessOpen(true);

      if (result.mode === 'created') {
        resetForm();
      }
    } catch (error) {
      setErrorMessage('Failed to publish event. Please try again.');
      setErrorOpen(true);
      console.error('Failed to publish event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const eventLink = `${window.location.origin}/event/${eventId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(eventLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <>
      <Button
        data-go-live-button
        size="lg"
        className="w-full md:w-auto md:min-w-[300px] bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg shadow-lg"
        onClick={handleGoLive}
        disabled={isLoading}
      >
        <Sparkles className="w-5 h-5" />
        {isLoading ? 'Publishing...' : 'Go live'}
      </Button>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="sm:max-w-md glassmorphism border-white/40 text-white">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">
              {saveMode === 'updated' ? 'Event Updated!' : 'Event is Live!'}
            </DialogTitle>
            <DialogDescription className="text-center">
              {saveMode === 'updated'
                ? 'Your event has been successfully updated. Share the link below with your guests.'
                : 'Your event has been successfully published. Share the link below with your guests.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
              <input
                type="text"
                value={eventLink}
                readOnly
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-600"
              />
              <Button size="sm" variant="ghost" onClick={copyToClipboard}>
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600" />
                )}
              </Button>
            </div>
            <Button
              onClick={() => setSuccessOpen(false)}
              className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={errorOpen} onOpenChange={setErrorOpen}>
        <DialogContent className="sm:max-w-md glassmorphism border-white/40 text-white">
          <DialogHeader>
            <DialogTitle className="text-white/80 text-2xl font-bold">Validation Error</DialogTitle>
            <DialogDescription className="text-white/80">{errorMessage}</DialogDescription>
          </DialogHeader>
          <Button onClick={() => setErrorOpen(false)} className="w-full glassmorphism hover:bg-white/20 border-white/40 text-white">OK</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

