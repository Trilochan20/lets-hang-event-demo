import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Image as ImageIcon } from 'lucide-react';
import { useEventStore } from '@/store/eventStore';
import { imageStorage } from '@/services/imageStorage';

const gradientOptions = [
  { id: 'gradient-pink-purple', name: 'Pink Purple', class: 'gradient-pink-purple' },
  { id: 'gradient-blue-teal', name: 'Blue Teal', class: 'gradient-blue-teal' },
  { id: 'gradient-warm-sunset', name: 'Warm Sunset', class: 'gradient-warm-sunset' },
];

export default function BackgroundChanger() {
  const { setPageBackground } = useEventStore();
  const [open, setOpen] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const id = await imageStorage.saveBackgroundImage(file);
        setPageBackground(id, 'image');
        setOpen(false);
      }
    },
  });

  const handleGradientSelect = (gradientId: string) => {
    setPageBackground(gradientId, 'gradient');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="flex w-full max-w-[512px] mx-auto mt-4 glassmorphism hover:bg-white/30 border-white/40 text-white rounded-[12px] h-15 ml-0"
        >
          Change background
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md glassmorphism border-white/40 text-white">
        <DialogHeader>
          <DialogTitle className="text-white/80 text-2xl font-bold">Change Background</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3 text-white/80">Preset Gradients</h3>
            <div className="grid grid-cols-3 gap-3">
              {gradientOptions.map((gradient) => (
                <button
                  key={gradient.id}
                  onClick={() => handleGradientSelect(gradient.id)}
                  className={`${gradient.class} h-20 rounded-lg border-2 border-transparent hover:border-white transition-all cursor-pointer`}
                  title={gradient.name}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-white/80">Upload Custom Image</h3>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
              }`}
            >
              <input {...getInputProps()} />
              <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-white/80">
                {isDragActive ? 'Drop image here' : 'Click or drag image here'}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

