# Let's Hang - Event Creation App

- built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

### 1. Event Form
- Event name
- Phone number for draft saving
- date/time, location fields
- Cost per person,
- Capacity [ to be added as extra ]
- Description textarea
- Expandable "Show more" section

### 2. Flyer Card with Image Upload
- Customizable event flyer with "YOU'RE INVITED" design
- Edit button to upload custom flyer images
- Images are stored in IndexedDB

### 3. Background Customization
- 3 preset gradient backgrounds:
  - Pink Purple (default)
  - Blue Teal
  - Warm Sunset
- Custom image upload for page background
- Images stored in IndexedDB

### 4. Customizable Modules
- Quick Links - Add custom links (website, social media, tickets)
- RSVP - Enable RSVP functionality
- Photo Gallery - Upload event photos
- Announcements - Add event updates
- Polls - Create simple polls
- Map - Add location map

### 5. Go Live Functionality
- Form validation
- Success modal with shareable link
- Copy to clipboard functionality

### 6. Local Storage & Draft Saving
- Mock backend service for event storage

## Tech Stack

- **React 18+** with TypeScript
- **Vite** 
- **Tailwind CSS** 
- **shadcn/ui** 
- **Zustand** - State management with persist middleware
- **IndexedDB** (via idb) - Image storage
- **react-hook-form** + **zod** - Form handling and validation
- **framer-motion** - Smooth animations
- **react-dropzone** - File upload handling
- **lucide-react** - Icons library

## Storage

- **localStorage**: Event data, drafts, and form state
- **IndexedDB**: Flyer images and background images
- Zustand persist middleware for automatic state synchronization

