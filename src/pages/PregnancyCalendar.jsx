import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { 
  ChevronLeft, Calendar as CalendarIcon, CheckCircle, Clock, AlertTriangle, X,
  Home as HomeIcon, Heart, Bell, Settings
} from 'lucide-react';
import { Button } from '../components/ui/button';
import MonthCalendar from '@/components/calendar/MonthCalendar';
import DayDetailSheet from '@/components/calendar/DayDetailSheet';

const pregnancyEvents = [
  {
    week_range: '8-12',
    title: 'First ANC Check-Up',
    type: 'anc_visit',
    detail: 'This is your first antenatal care (ANC) visit. At this visit, a health worker may check your blood pressure, weight, and general health, and may request blood/urine tests. This helps to pick up problems early and keep you and your baby safe.',
    notifBefore: 'It is time for your first ANC check-up. If you haven\'t seen a health worker yet, please plan a visit this week.',
    notifDay: 'Reminder: Please try to attend your first ANC check-up as soon as possible.'
  },
  {
    week_range: '13-16',
    title: 'Follow-Up ANC Visit',
    type: 'anc_visit',
    detail: 'Follow-up ANC visits help your health worker see how your pregnancy is progressing. They may review your test results, check your blood pressure and weight, and answer your questions.',
    notifBefore: 'A follow-up ANC visit is recommended around this time. Plan a visit to your clinic.',
    notifDay: 'Today is a good day to visit your clinic for ANC follow-up.'
  },
  {
    week_range: '18-22',
    title: 'Recommended Ultrasound Scan',
    type: 'ultrasound',
    detail: 'Around this time, many women are advised to have an ultrasound scan to check the baby\'s growth and development. Talk to your health worker about whether this is needed for you and where to get it.',
    notifBefore: 'From week 18–22, ask your health worker about an ultrasound scan to check your baby\'s development.',
    notifDay: 'This is a good time to have an ultrasound scan, if advised by your health worker.'
  },
  {
    week_range: '24-28',
    title: 'Blood Sugar (Glucose) Check',
    type: 'blood_test',
    detail: 'Some women develop high blood sugar during pregnancy (gestational diabetes). Checking your blood sugar during this period can help detect this early and keep you and your baby safer.',
    notifBefore: 'Ask your health worker if it is time to check your blood sugar in pregnancy.',
    notifDay: 'Reminder: If advised, please try to get your blood sugar test done in this period.'
  },
  {
    week_range: '28-32',
    title: 'More Frequent ANC Visits',
    type: 'anc_visit',
    detail: 'In the last trimester, you may need more frequent ANC visits to monitor your blood pressure, baby\'s growth, and any danger signs. Your health worker will guide you on how often to come.',
    notifBefore: 'From this stage, your ANC visits may become more frequent. Please follow your health worker\'s advice on when to come.',
    notifDay: 'Reminder: Check with your clinic if an ANC visit is due this week.'
  },
  {
    week_range: '34-36',
    title: 'Birth Plan & Transport',
    type: 'birth_planning',
    detail: 'This is the time to plan for your delivery. Decide where you will go, who will go with you, how you will get there, and what you will take with you (clothes, documents, baby items). Making a plan now can reduce stress later.',
    notifBefore: 'Start preparing your birth plan – where to go, how to go, who will accompany you.',
    notifDay: 'Have you packed your bag and discussed your plan with your family?'
  },
  {
    week_range: '28-40',
    title: 'Know 3rd Trimester Danger Signs',
    type: 'danger_signs',
    detail: 'In late pregnancy, watch for these danger signs: heavy bleeding, severe headache, blurred vision, swelling of face or hands, baby\'s movement much less than usual. If you notice any of these, seek care immediately.',
    notifBefore: 'Remember: If you have heavy bleeding, severe headache, or less baby movement, go to a clinic/hospital immediately.',
    notifDay: 'Keep an eye on your body and baby\'s movement today. If something feels wrong, seek care.'
  }
];

export default function PregnancyCalendar() {
  const [profile, setProfile] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayEvents, setDayEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const profiles = await base44.entities.UserProfile.list();
    if (profiles.length > 0) {
      setProfile(profiles[0]);
    }
    setLoading(false);
  };

  const calculatePregnancyWeek = () => {
    if (!profile?.last_menstrual_period) return null;
    const lmp = new Date(profile.last_menstrual_period);
    const today = new Date();
    const diffTime = Math.abs(today - lmp);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    return weeks > 0 && weeks <= 42 ? weeks : null;
  };

  const pregnancyWeek = calculatePregnancyWeek();

  const getEventStatus = (event) => {
    if (!pregnancyWeek) return 'pending';
    
    const [start, end] = event.week_range.split('-').map(Number);
    
    if (pregnancyWeek >= start && pregnancyWeek <= end) return 'current';
    if (pregnancyWeek > end) return 'completed';
    return 'upcoming';
  };

  const convertEventsToCalendarFormat = () => {
    if (!profile?.last_menstrual_period) return [];
    
    const lmp = new Date(profile.last_menstrual_period);
    const calendarEvents = [];
    
    pregnancyEvents.forEach(event => {
      const [start] = event.week_range.split('-').map(Number);
      const eventDate = new Date(lmp);
      eventDate.setDate(lmp.getDate() + (start * 7));
      
      calendarEvents.push({
        date: eventDate.toISOString().split('T')[0],
        title: event.title,
        subtitle: `Week ${event.week_range}`,
        type: event.type,
        detail: event.detail,
        notifBefore: event.notifBefore,
        notifDay: event.notifDay,
        fullEvent: event
      });
    });
    
    return calendarEvents;
  };

  const calendarEvents = convertEventsToCalendarFormat();

  const handleDayClick = (day, events) => {
    setSelectedDay(day);
    setDayEvents(events);
  };

  const handleEventClick = (event) => {
    setSelectedDay(null);
    setDayEvents([]);
    setSelectedEvent(event.fullEvent || event);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-24">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-4">
          <Link to={createPageUrl('Pregnancy')} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Pregnancy Calendar</h1>
        </div>
        {pregnancyWeek && (
          <p className="text-white/80">Week {pregnancyWeek} • Important milestones & check-ups</p>
        )}
      </div>

      <div className="px-6 -mt-4">
        <MonthCalendar
          events={calendarEvents}
          currentWeek={pregnancyWeek}
          onDayClick={handleDayClick}
          type="pregnancy"
        />
      </div>

      {/* Event List Below Calendar */}
      <div className="px-6 mt-6">
        <h2 className="font-bold text-lg text-gray-800 mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {pregnancyEvents.slice(0, 3).map((event, index) => {
            const status = getEventStatus(event);
            
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedEvent(event)}
                className={`w-full bg-white rounded-2xl p-4 shadow-sm border-2 text-left ${
                  status === 'current' ? 'border-pink-200 bg-pink-50/30' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    status === 'current' ? 'bg-pink-500' : 'bg-gray-300'
                  }`}>
                    <CalendarIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm">{event.title}</h3>
                    <p className="text-xs text-gray-500">Week {event.week_range}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Day Detail Sheet */}
      <AnimatePresence>
        {selectedDay && (
          <DayDetailSheet
            day={selectedDay}
            events={dayEvents}
            onClose={() => {
              setSelectedDay(null);
              setDayEvents([]);
            }}
            onEventClick={handleEventClick}
          />
        )}
      </AnimatePresence>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold px-2 py-1 rounded-full bg-pink-100 text-pink-700">
                    Week {selectedEvent.week_range}
                  </span>
                </div>
                <button onClick={() => setSelectedEvent(null)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {selectedEvent.title}
                </h2>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {selectedEvent.detail}
                </p>

                <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-4 mb-6">
                  <h3 className="font-bold text-pink-800 mb-2">Reminder</h3>
                  <p className="text-pink-700 text-sm">{selectedEvent.notifDay}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link to={createPageUrl('Pregnancy')}>
                    <Button variant="outline" className="w-full">
                      View Dos & Don'ts
                    </Button>
                  </Link>
                  <Link to={createPageUrl('Learn')}>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center">
        <Link to={createPageUrl('Home')} className="flex flex-col items-center text-gray-400">
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to={createPageUrl('MyHealth')} className="flex flex-col items-center text-gray-400">
          <Heart className="w-6 h-6" />
          <span className="text-xs mt-1">My Health</span>
        </Link>
        <Link to={createPageUrl('Notifications')} className="flex flex-col items-center text-gray-400">
          <Bell className="w-6 h-6" />
          <span className="text-xs mt-1">Alerts</span>
        </Link>
        <Link to={createPageUrl('Settings')} className="flex flex-col items-center text-gray-400">
          <Settings className="w-6 h-6" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </div>
  );
}