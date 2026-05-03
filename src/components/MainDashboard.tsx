/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { Search, Filter, Calendar as CalendarIcon, MapPin, SearchCheck, ExternalLink, RefreshCw } from "lucide-react";
import { EVENT_DATABASE, CALENDARS, Event } from "../constants";
import EventCard from "./EventCard";

export default function MainDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [timeFilter, setTimeFilter] = useState("Upcoming");

  const categories = useMemo(() => {
    const cats = new Set<string>();
    EVENT_DATABASE.forEach(e => e.category.forEach(c => cats.add(c)));
    return ["All", ...Array.from(cats)].sort();
  }, []);

  const filteredEvents = useMemo(() => {
    return EVENT_DATABASE.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || event.category.includes(selectedCategory);
      
      // Simple time filtering for this demo (May 2026 dates)
      const eventDate = new Date(event.date);
      const now = new Date("2026-05-03"); // Mock "today" based on instructions
      
      let matchesTime = true;
      if (timeFilter === "This Week") {
        const nextWeek = new Date(now);
        nextWeek.setDate(now.getDate() + 7);
        matchesTime = eventDate >= now && eventDate <= nextWeek;
      } else if (timeFilter === "This Weekend") {
        const day = now.getDay();
        const nextFriday = new Date(now);
        nextFriday.setDate(now.getDate() + (day <= 5 ? 5 - day : 5));
        const nextSunday = new Date(nextFriday);
        nextSunday.setDate(nextFriday.getDate() + 2);
        matchesTime = eventDate >= nextFriday && eventDate <= nextSunday;
      }

      return matchesSearch && matchesCategory && matchesTime;
    });
  }, [searchTerm, selectedCategory, timeFilter]);

  return (
    <div className="min-h-screen bg-brand-bg pb-24 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-brand-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-dark flex items-center justify-center">
              <span className="text-white font-black text-xl">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight uppercase leading-none">Kolkata Event Scout</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Confirmed Listings • May 2026</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:flex-1 md:justify-end">
            <div className="relative w-full md:w-80 group">
              <input
                type="text"
                placeholder="Search events, venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-brand-border px-4 py-2.5 pl-10 text-xs font-medium focus:outline-none focus:border-brand-dark shadow-sm transition-colors"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-brand-dark transition-colors" />
            </div>
            <nav className="hidden lg:flex gap-6 text-[10px] font-bold uppercase tracking-widest border-l border-brand-border pl-6">
              <a href="#" className="border-b-2 border-brand-dark pb-1">Discover</a>
              <a href="#" className="text-gray-400 hover:text-brand-dark transition-colors">Scrape</a>
              <a href="#" className="text-gray-400 hover:text-brand-dark transition-colors">About</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full px-8 py-10 flex flex-1 overflow-hidden h-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 w-full">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-10">
            <div>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Timeframe</h3>
              <ul className="space-y-4">
                {[
                  { id: "Upcoming", label: "Upcoming" },
                  { id: "This Week", label: "This Week" },
                  { id: "This Weekend", label: "This Weekend" }
                ].map(t => (
                  <li 
                    key={t.id}
                    onClick={() => setTimeFilter(t.id)}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <span className={`text-sm font-medium transition-colors ${timeFilter === t.id ? "text-brand-dark" : "text-gray-400 group-hover:text-brand-dark"}`}>
                      {t.label}
                    </span>
                    <span className={`w-2 h-2 rounded-full border transition-all ${
                      timeFilter === t.id ? "bg-brand-dark border-brand-dark scale-125" : "border-brand-border group-hover:border-brand-dark"
                    }`}></span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Categories</h3>
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-xs font-semibold py-1.5 transition-colors uppercase tracking-wider ${
                      selectedCategory === cat ? "text-brand-dark border-l-2 border-brand-dark pl-3" : "text-gray-400 hover:text-brand-dark pl-3 border-l-2 border-transparent"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Directories</h3>
              <div className="space-y-2">
                {CALENDARS.slice(0, 3).map(cal => (
                  <a
                    key={cal.name}
                    href={cal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-white border border-brand-border text-[11px] font-bold uppercase tracking-widest hover:border-brand-dark transition-all group shadow-sm hover:shadow-md"
                  >
                    <span className="block text-gray-400 mb-1">{cal.name}</span>
                    <span className="text-blue-600 truncate block group-hover:underline">Visit Live {cal.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Event Results */}
          <div className="lg:col-span-3">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-4xl lg:text-5xl font-light tracking-tight italic font-serif text-brand-dark">Upcoming in Kolkata</h2>
                <div className="flex items-center gap-3 mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  <span className="flex items-center text-brand-dark">
                    <SearchCheck className="w-3 h-3 mr-1.5" />
                    {filteredEvents.length} Verified
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>Sync: May 3, 2026</span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="px-5 py-2.5 bg-brand-dark text-[10px] font-bold uppercase tracking-[0.15em] text-white cursor-pointer shadow-lg shadow-brand-dark/20">Grid</div>
                <div className="px-5 py-2.5 border border-brand-border text-[10px] font-bold uppercase tracking-[0.15em] text-brand-dark hover:bg-white cursor-pointer transition-colors">List</div>
              </div>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-brand-border p-16 text-center shadow-sm">
                <div className="w-16 h-16 bg-brand-bg flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark uppercase tracking-widest mb-3">No Results Found</h3>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest max-w-xs mx-auto mb-8">Try clearing your filters or refreshing the sync.</p>
                <button 
                  onClick={() => { setSelectedCategory("All"); setTimeFilter("Upcoming"); setSearchTerm(""); }}
                  className="px-8 py-3 bg-brand-dark text-white text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95"
                >
                  Reset Discovery
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="h-16 border-t border-brand-border bg-white mt-auto flex items-center justify-between px-8 text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
        <div className="flex gap-8">
          <span className="flex items-center"><RefreshCw className="w-3 h-3 mr-2 animate-spin-slow" /> Real-time active</span>
          <span>Database: {EVENT_DATABASE.length} Events</span>
        </div>
        <div className="hidden sm:flex gap-6">
          <span className="text-brand-dark border-b border-brand-dark">Privacy</span>
          <span>Terms</span>
          <span>Help</span>
        </div>
      </footer>
    </div>
  );
}
