/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Calendar, MapPin, Users, Star, ExternalLink, Globe } from "lucide-react";
import { Event } from "../constants";

interface EventCardProps {
  event: Event;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  const isOnline = event.mode === 'Online';
  
  return (
    <motion.div
      id={`event-card-${event.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="bg-white border border-brand-border p-6 flex flex-col justify-between hover:shadow-xl transition-shadow group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-bg -mr-12 -mt-12 rounded-full blur-2xl group-hover:bg-brand-dark/5 transition-colors" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-tighter border ${
            isOnline 
            ? 'bg-[#EFF6FF] text-[#1E40AF] border-[#DBEAFE]' 
            : 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
          }`}>
            {isOnline ? 'Online Session' : 'Confirmed In-Person'}
          </span>
          <span className="text-[10px] font-mono text-gray-300 font-bold">#{event.id}</span>
        </div>

        <h3 className="text-xl font-bold leading-tight mb-3 text-brand-dark group-hover:text-black transition-colors">
          {event.title}
        </h3>
        
        <p className="text-xs text-gray-500 line-clamp-2 mb-6 font-medium leading-relaxed">
          {event.description}
        </p>

        <div className="space-y-2.5 mb-8">
          <div className="flex items-center gap-3 text-xs">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-bold text-gray-600">
              {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} · {event.time} IST
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-bold text-gray-600 truncate max-w-[200px]">
              {event.location}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-bold text-gray-600">
              {event.attendees ? `${event.attendees} Attendees` : 'Open Event'} · {event.platform}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 mb-6">
        {event.category.slice(0, 3).map((cat) => (
          <span key={cat} className="text-[9px] bg-gray-50 text-gray-400 px-2 py-0.5 border border-brand-border font-bold uppercase tracking-wider">
            {cat}
          </span>
        ))}
      </div>

      <a
        id={`event-link-${event.id}`}
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
          index % 2 === 0 
          ? 'bg-brand-dark text-white hover:bg-black shadow-lg shadow-brand-dark/10' 
          : 'border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white'
        }`}
      >
        {isOnline ? 'Access Session' : 'Reserve Spot'}
        <ExternalLink className="w-3 h-3" />
      </a>
    </motion.div>
  );
}
