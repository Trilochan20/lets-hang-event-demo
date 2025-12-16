import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, X } from 'lucide-react';
import { useEventStore } from '@/store/eventStore';
import { imageStorage } from '@/services/imageStorage';

export default function FlyerCard() {
  const { flyerImageId, setFlyerImage } = useEventStore();
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const loadImage = async () => {
      if (flyerImageId) {
        const url = await imageStorage.getFlyerImage(flyerImageId);
        setImageUrl(url);
      } else {
        setImageUrl('');
      }
    };

    loadImage();
  }, [flyerImageId]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const id = await imageStorage.saveFlyerImage(file);
        setFlyerImage(id);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden glassmorphism border-white/20 w-full max-w-[512px] mx-auto lg:mx-0">
        <div
          {...getRootProps({
            className: 'aspect-square w-full flex items-center justify-center relative',
            style: imageUrl
              ? {
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : undefined,
          })}
        >
          <input {...getInputProps()} />
          {!imageUrl && (
            <>
              <div className="absolute inset-0 bg-linear-to-br from-purple-400/40 to-pink-400/40" />
              <div className="relative z-10 text-center p-8">
                <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none">
                  YOU'RE
                  <br />
                  INVITED
                </h2>
              </div>
            </>
          )}

          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="glassmorphism hover:bg-white/30 border-white/40"
              title="Edit flyer image"
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
            >
              <Edit2 className="w-4 h-4 text-white/80" />
            </Button>

            {imageUrl && (
              <Button
                size="icon"
                variant="secondary"
                className="glassmorphism hover:bg-white/30 border-white/40"
                title="Reset flyer image"
                onClick={(e) => {
                  e.stopPropagation();
                  if (flyerImageId) {
                    imageStorage.deleteFlyerImage(flyerImageId);
                  }
                  setFlyerImage('');
                }}
              >
                <X className="w-4 h-4 text-white/80" />
              </Button>
            )}
          </div>

          {isDragActive && (
            <div className="absolute inset-0 bg-purple-500/50 flex items-center justify-center z-10 backdrop-blur-sm">
              <p className="text-white text-xl font-semibold">Drop image here</p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

