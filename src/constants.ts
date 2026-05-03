/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Event {
  id: string;
  platform: 'Meetup' | 'Luma' | 'LinkedIn' | 'AllEvents' | 'CNCF' | 'Other';
  title: string;
  date: string; // ISO string or human readable
  time: string;
  mode: 'In-person' | 'Online';
  location: string;
  organizer: string;
  attendees?: number;
  rating?: number;
  category: string[];
  url: string;
  description: string;
  frequency?: string;
}

export const EVENT_DATABASE: Event[] = [
  {
    id: 'EVENT_001',
    platform: 'Meetup',
    title: 'Kolkata WordPress May Meetup',
    date: '2026-05-23',
    time: '5:30 PM',
    mode: 'In-person',
    location: 'Kolkata (venue TBA)',
    organizer: 'Kolkata WordPress Meetup Group',
    attendees: 35,
    rating: 4.6,
    category: ['Technology', 'CMS', 'WordPress'],
    url: 'https://www.meetup.com/kolkatawordpressmeetups/events/314435700/',
    description: 'Monthly WordPress community meetup. Topics typically include WordPress development, WooCommerce, plugins, Gutenberg, and open-source contribution.'
  },
  {
    id: 'EVENT_002',
    platform: 'Meetup',
    title: 'Leveraging Internet Retail with WooCommerce',
    date: '2026-05-16',
    time: '5:30 PM',
    mode: 'In-person',
    location: 'Kolkata',
    organizer: 'Kolkata WooCommerce Meetup Group',
    attendees: 9,
    category: ['Technology', 'eCommerce', 'WooCommerce'],
    url: 'https://www.meetup.com/kolkata-woocommerce-group/events/314489097/',
    description: 'Focused on WooCommerce and internet retail strategies. Topics include store setup, plugins, payment gateways, and scaling online shops.'
  },
  {
    id: 'EVENT_003',
    platform: 'Meetup',
    title: 'AI Products for Business',
    date: '2026-05-05',
    time: '12:30 PM',
    mode: 'Online',
    location: 'Virtual',
    organizer: 'Software Architecture and System Design',
    attendees: 24,
    rating: 4.1,
    category: ['AI', 'Machine Learning', 'Business Technology', 'System Design'],
    url: 'https://www.meetup.com/software-architecture-and-system-design-or-core-design/events/314538397/',
    description: 'Explores how AI can power business products — from algorithmic trading systems and CRM automation to intelligent search.'
  },
  {
    id: 'EVENT_004',
    platform: 'Meetup',
    title: 'Google Map Software Architecture',
    date: '2026-05-16',
    time: '4:00 PM',
    mode: 'Online',
    location: 'Virtual',
    organizer: 'Software Architecture and System Design',
    attendees: 312,
    rating: 4.1,
    category: ['System Design', 'Architecture', 'Technology'],
    url: 'https://www.meetup.com/software-architecture-and-system-design-or-core-design/events/314346143/',
    description: 'Deep-dive into the software architecture behind Google Maps — covering scalability, distributed systems, geo-indexing, and real-time data pipelines.'
  },
  {
    id: 'EVENT_005',
    platform: 'Meetup',
    title: 'Kolkata Business Network',
    date: '2026-05-16',
    time: '10:30 AM',
    mode: 'In-person',
    location: 'PRO CO-WORKING CENTRE, Kolkata',
    organizer: 'Kolkata Business Network',
    category: ['Networking', 'Business', 'Startups'],
    url: 'https://www.meetup.com/find/in--kolkata/',
    description: 'Business networking event bringing together entrepreneurs, startup founders, and professionals in Kolkata.'
  },
  {
    id: 'EVENT_006',
    platform: 'Meetup',
    title: 'Entrepreneurs Meetup by We Founders Collab',
    date: '2026-05-16',
    time: '10:30 AM',
    mode: 'In-person',
    location: 'PRO CO-WORKING CENTRE, Kolkata',
    organizer: 'We Founders Collab',
    category: ['Entrepreneurship', 'Startups', 'Networking'],
    url: 'https://www.meetup.com/find/in--kolkata/',
    description: 'Community meetup for startup founders and early-stage entrepreneurs in Kolkata. Pitching, networking, and peer support.'
  },
  {
    id: 'EVENT_007',
    platform: 'AllEvents',
    title: 'Pack-O-Printex Packaging & Printing Expo',
    date: '2026-05-15',
    time: '10:00 AM',
    mode: 'In-person',
    location: 'Biswa Bangla Exhibition & Convention Centre, Kolkata',
    organizer: 'Pack-O-Printex',
    category: ['Industry', 'Manufacturing', 'B2B'],
    url: 'https://allevents.in/kolkata/business',
    description: 'Industry expo connecting packaging and printing businesses with buyers and industry leaders.'
  },
  {
    id: 'EVENT_008',
    platform: 'AllEvents',
    title: 'Kolkata Machine Tools Show 2026',
    date: '2026-05-08',
    time: '10:00 AM',
    mode: 'In-person',
    location: 'Biswa Bangla Mela Prangan, Kolkata',
    organizer: 'Kolkata Machine Tools',
    category: ['Industry', 'Engineering', 'Manufacturing'],
    url: 'https://10times.com/kolkata-in?month=may',
    description: 'Industrial machinery and tools exhibition at Kolkata\'s main exhibition ground.'
  }
];

export const CALENDARS = [
  { name: 'Kolkata Tech', url: 'https://lu.ma/kolkata-events', platform: 'Luma' },
  { name: 'India Tech Meetups', url: 'https://lu.ma/CommunityMeetups', platform: 'Luma' },
  { name: 'India Startups', url: 'https://lu.ma/startupeventsIN', platform: 'Luma' },
  { name: 'Postman Kolkata', url: 'https://lu.ma/pckol', platform: 'Luma' },
  { name: 'CNCF Kolkata', url: 'https://community.cncf.io/cloud-native-kolkata/', platform: 'CNCF' },
];

export const SYSTEM_PROMPT = `
You are an intelligent event discovery assistant specializing in Kolkata and India. You help users find, filter, summarize, and track upcoming events from multiple platforms including Meetup, Luma, LinkedIn, and community organizers.

ALWAYS respond in a friendly, concise manner and always include direct registration links when available.

BEHAVIOR RULES:
1. Always show event title, date/time (IST), venue, platform, and registration link.
2. When filtering by category (tech, networking, startup, etc.), only show events that match.
3. If no events match a filter, say so honestly and suggest the best sources to check live.
4. Never make up events. Only surface events from the confirmed database.
5. For LinkedIn events — always flag that they require login to register.

LIVE SEARCH LINKS:
1. Meetup Kolkata Tech: https://www.meetup.com/find/in--kolkata/technology/
2. Luma Kolkata: https://lu.ma/kolkata-events
3. AllEvents Kolkata: https://allevents.in/kolkata

EVENT DATABASE:
\${JSON.stringify(EVENT_DATABASE, null, 2)}

OUTPUT FORMAT:
When listing events, always use this format:
---
**[Event Title]**
📅 [Date] · [Time] IST
📌 [Venue / Online] · [City]
🏷️ [Platform] · [Category]
👥 [Attendees if known]
🔗 [Registration URL]
> [1-sentence description]
---
`;
