import { useEffect, useState } from 'react';
import { useEventStore } from '@/store/eventStore';
import { imageStorage } from '@/services/imageStorage';
import FlyerCard from '@/components/event/FlyerCard';
import BackgroundChanger from '@/components/event/BackgroundChanger';
import EventForm from '@/components/event/EventForm';
import ModulesSection from '@/components/event/ModulesSection';
import GoLiveButton from '@/components/event/GoLiveButton';
import Header from '@/components/layout/Header';

function App() {
  const { pageBackgroundId, pageBackgroundType, loadEvent, resetForm, resetToken } = useEventStore();
  const [backgroundUrl, setBackgroundUrl] = useState<string>('');

  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/^\/event\/([^/]+)\/?$/);
    if (match) {
      void loadEvent(match[1]);
      return;
    }
    resetForm();
  }, [loadEvent, resetForm]);

  useEffect(() => {
    const loadBackground = async () => {
      if (pageBackgroundType === 'image' && pageBackgroundId) {
        const url = await imageStorage.getBackgroundImage(pageBackgroundId);
        setBackgroundUrl(url);
      } else {
        setBackgroundUrl('');
      }
    };

    loadBackground();
  }, [pageBackgroundId, pageBackgroundType]);

  const getBackgroundClass = () => {
    if (pageBackgroundType === 'gradient') {
      return pageBackgroundId || 'gradient-pink-purple';
    }
    return '';
  };

  const backgroundStyle = backgroundUrl
    ? { backgroundImage: `url(${backgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};

  return (
    <div
      className={`min-h-screen ${getBackgroundClass()}`}
      style={backgroundStyle}
    >
      <Header />

      <main className="max-w-[1600px] mx-auto px-4 md:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[560px_minmax(0,1fr)] gap-6 lg:gap-8">
          <div className="lg:sticky lg:top-6 lg:self-start">
            <FlyerCard />
            <BackgroundChanger />
          </div>

          <div className="space-y-6">
            <EventForm key={`event-form-${resetToken}`} />
            <ModulesSection key={`modules-${resetToken}`} />
          </div>
        </div>
      </main>

      <div className="hidden">
        <GoLiveButton />
      </div>
    </div>
  );
}

export default App;
