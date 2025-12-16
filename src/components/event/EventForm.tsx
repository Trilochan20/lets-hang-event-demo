import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus, X } from 'lucide-react';
import { useEventStore } from '@/store/eventStore';
import { useRef, useState } from 'react';

const eventSchema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  phoneNumber: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number'),
  dateTime: z.string().min(1, 'Date and time are required'),
  location: z.string().min(1, 'Location is required'),
  costPerPerson: z.string(),
  description: z.string(),
  capacity: z.string(),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function EventForm() {
  const {
    eventName,
    phoneNumber,
    dateTime,
    location,
    costPerPerson,
    description,
    capacity,
    updateEventField,
  } = useEventStore();

  const [showCapacity, setShowCapacity] = useState(() => Boolean(capacity && capacity > 0));
  const dateTimeInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventName: eventName || '',
      phoneNumber: phoneNumber || '',
      dateTime: dateTime ? new Date(dateTime).toISOString().slice(0, 16) : '',
      location: location || '',
      costPerPerson: costPerPerson && costPerPerson > 0 ? costPerPerson.toString() : '',
      description: description || '',
      capacity: capacity?.toString() || '',
    },
  });

  const dateTimeValue = useWatch({ control, name: 'dateTime' });
  const dateTimeRegister = register('dateTime');
  const openDateTimePicker = () => {
    const el = dateTimeInputRef.current as (HTMLInputElement & { showPicker?: () => void }) | null;
    if (el?.showPicker) el.showPicker();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      <div>
        <Input
          {...register('eventName')}
          placeholder="Name your event"
          className="bg-transparent border-0 h-auto text-white placeholder:text-white/80 text-4xl md:text-5xl leading-tight font-medium font-syne px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => updateEventField('eventName', e.target.value)}
        />
        {errors.eventName && (
          <p className="text-red-400 text-sm mt-1">{errors.eventName.message}</p>
        )}
      </div>

      <Card className="glassmorphism-dark border-white/20">
        <CardContent className="py-3 px-4">
          <div className="flex items-center gap-3">
          💾
            <Input
              {...register('phoneNumber')}
              placeholder="Enter phone number to save the draft"
              className="bg-transparent border-0 text-white placeholder:text-white/60 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => updateEventField('phoneNumber', e.target.value)}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="shrink-0 rounded-md bg-white/10 hover:bg-white/20 text-white"
              aria-label="Save draft"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          {errors.phoneNumber && (
            <p className="text-red-400 text-sm mt-2">{errors.phoneNumber.message}</p>
          )}
        </CardContent>
      </Card>

      <Card className="glassmorphism-dark border-white/20 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/15">
            <div className=" relative flex-1 ">
            
              {!dateTimeValue && (
                <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-white/60 text-sm">
                🗓️ &nbsp; Date and time
                </span>
              )}
              
              <Input
                {...dateTimeRegister}
                ref={(el) => {
                  dateTimeRegister.ref(el);
                  dateTimeInputRef.current = el;
                }}
                type="datetime-local"
                className={`bg-transparent border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0 appearance-none caret-white ${
                  dateTimeValue ? 'text-white' : 'text-transparent datetime-empty'
                }`}
                onClick={() => openDateTimePicker()}
                onBlur={(e) => {
                  dateTimeRegister.onBlur(e);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openDateTimePicker();
                  }
                }}
                onChange={(e) => {
                  dateTimeRegister.onChange(e);
                  const date = e.target.value ? new Date(e.target.value) : null;
                  updateEventField('dateTime', date);
                }}
              />
            </div>
          </div>
          {errors.dateTime && (
            <div className="px-4 pb-2">
              <p className="text-red-400 text-sm">{errors.dateTime.message}</p>
            </div>
          )}

          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/15">
          📍
            <Input
              {...register('location')}
              placeholder="Location"
              className="bg-transparent border-0 text-white placeholder:text-white/60 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => updateEventField('location', e.target.value)}
            />
          </div>
          {errors.location && (
            <div className="px-4 pb-2">
              <p className="text-red-400 text-sm">{errors.location.message}</p>
            </div>
          )}

          <div className="flex items-center gap-3 px-4 py-3">
          💵
            <Input
              {...register('costPerPerson')}
              type="number"
              placeholder="Cost per person"
              className="bg-transparent border-0 text-white placeholder:text-white/60 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => updateEventField('costPerPerson', parseFloat(e.target.value) || 0)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="glassmorphism-dark border-white/20">
        <CardContent className="p-0">
          <Textarea
            {...register('description')}
            placeholder="Describe your event"
            className="bg-transparent border-0 text-white placeholder:text-white/60 min-h-[110px] px-4 py-4 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
            onChange={(e) => updateEventField('description', e.target.value)}
          />
        </CardContent>
      </Card>

      {showCapacity && (
        <Card className="glassmorphism-dark border-white/20">
          <CardContent className="py-3 px-4">
            <div className="flex items-center gap-3">
              👥
              <Input
                {...register('capacity')}
                type="number"
                placeholder="Capacity"
                className="bg-transparent border-0 text-white placeholder:text-white/60 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) => updateEventField('capacity', parseInt(e.target.value) || 0)}
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="shrink-0 rounded-full bg-white/10 hover:bg-white/20 text-white"
                aria-label="Remove capacity"
                onClick={() => {
                  setShowCapacity(false);
                  setValue('capacity', '');
                  updateEventField('capacity', 0);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap gap-2 items-center">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-[18px]"
          onClick={() => setShowCapacity(true)}
        >
          <Plus className="w-4 h-4" />
          Capacity
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-[18px]"
        >
          <Plus className="w-4 h-4" />
          Photo gallery
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-[18px]"
        >
          <Plus className="w-4 h-4" />
          Links
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-white/50 hover:text-white hover:bg-transparent px-2 rounded-[18px]"
        >
          Show more
        </Button>
      </div>
    </motion.div>
  );
}

