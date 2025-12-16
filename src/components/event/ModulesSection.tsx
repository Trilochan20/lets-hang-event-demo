import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Megaphone, Image as ImageIconLucide, Link as LinkIcon, Plus } from 'lucide-react';

export default function ModulesSection() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-6"
    >
      <Card className="glassmorphism border-white/20">
        <CardContent className="pt-6 pb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-12 mb-6 px-4">
              <div className="flex items-center justify-center text-white/40">
                <Megaphone className="w-12 h-12" />
              </div>
              <div className="flex items-center justify-center text-white/40">
                <LinkIcon className="w-12 h-12" />
              </div>
              <div className="flex items-center justify-center text-white/40">
                <ImageIconLucide className="w-12 h-12" />
              </div>
              <div className="flex items-center justify-center text-white/40">
                <span className="text-2xl font-bold">RSVP</span>
              </div>
            </div>
            <h3 className="text-base font-normal text-white mb-6">
              Customize your event your way
            </h3>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="w-full glassmorphism-btn hover:bg-white/20 border-white/40 text-white rounded-[8px]"
              >
                🎨 &nbsp; Customize
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg glassmorphism-dark border-white/40 text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Customize</DialogTitle>
              </DialogHeader>

              <div className="relative">
                <div className="mb-4">
                  <div className="flex items-center gap-3 rounded-lg border border-white/20 bg-white/5 px-3 py-2">
                    <div className="text-white/50">🔎</div>
                    <div className="text-white/60 text-sm">Search for specific tool</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-4 rounded-lg px-2 py-3 hover:bg-white/5">
                    <div className="min-w-0">
                      <div className="font-semibold text-white">📝 Questionnaires</div>
                      <div className="text-sm text-white/60 line-clamp-2">
                        Create questionnaires for your event. Hosts can create questions and view responses.
                      </div>
                      <div className="mt-1 text-xs text-white/40">Free</div>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="shrink-0 border-white/30 text-white hover:bg-white/10"
                      aria-label="Add Questionnaires"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="flex items-start justify-between gap-4 rounded-lg px-2 py-3 hover:bg-white/5">
                    <div className="min-w-0">
                      <div className="font-semibold text-white">🧩 New section</div>
                      <div className="text-sm text-white/60 line-clamp-2">
                        Add a custom section to showcase anything you want on your event page.
                      </div>
                      <div className="mt-1 text-xs text-white/40">Free</div>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="shrink-0 border-white/30 text-white hover:bg-white/10"
                      aria-label="Add New section"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="flex items-start justify-between gap-4 rounded-lg px-2 py-3 hover:bg-white/5">
                    <div className="min-w-0">
                      <div className="font-semibold text-white">💌 Invite</div>
                      <div className="text-sm text-white/60 line-clamp-2">
                        Personally invite each and every guest within seconds.
                      </div>
                      <div className="mt-1 text-xs text-white/40">Paid</div>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="shrink-0 border-white/30 text-white hover:bg-white/10"
                      aria-label="Add Invite"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="flex items-start justify-between gap-4 rounded-lg px-2 py-3 hover:bg-white/5">
                    <div className="min-w-0">
                      <div className="font-semibold text-white">🖼️ Photo Gallery</div>
                      <div className="text-sm text-white/60 line-clamp-2">
                        Add photos for guests to view and relive the vibe.
                      </div>
                      <div className="mt-1 text-xs text-white/40">Free</div>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="shrink-0 border-white/30 text-white hover:bg-white/10"
                      aria-label="Add Photo Gallery"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="flex items-start justify-between gap-4 rounded-lg px-2 py-3 hover:bg-white/5">
                    <div className="min-w-0">
                      <div className="font-semibold text-white">🔗 Links</div>
                      <div className="text-sm text-white/60 line-clamp-2">
                        Share links to event guides, menus, playlists, and more.
                      </div>
                      <div className="mt-1 text-xs text-white/40">Free</div>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="shrink-0 border-white/30 text-white hover:bg-white/10"
                      aria-label="Add Links"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="flex items-start justify-between gap-4 rounded-lg px-2 py-3 hover:bg-white/5">
                    <div className="min-w-0">
                      <div className="font-semibold text-white">📣 Announcements</div>
                      <div className="text-sm text-white/60 line-clamp-2">
                        Post updates & messages to keep your guests informed.
                      </div>
                      <div className="mt-1 text-xs text-white/40">Free</div>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="shrink-0 border-white/30 text-white hover:bg-white/10"
                      aria-label="Add Announcements"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
      </CardContent>
    </Card>

    <Button
      size="lg"
      className="w-full h-auto py-6 glassmorphism hover:bg-white/20 border-white/40 
        text-white font-semibold text-lg shadow-lg rounded-[18px]"
      onClick={() => {
        const goLiveBtn = document.querySelector('[data-go-live-button]') as HTMLButtonElement;
        if (goLiveBtn) goLiveBtn.click();
      }}
    >
     🚀 <br /> Go live
    </Button>
    </motion.div>
  );
}

