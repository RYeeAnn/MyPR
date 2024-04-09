// Routines.jsx

import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from '../components/Navbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export function Routines() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [calendarLoaded, setCalendarLoaded] = useState(false);

  useEffect(() => {
    // Load the calendar only when the user is authenticated
    if (isAuthenticated && !calendarLoaded) {
      setCalendarLoaded(true);
    }
  }, [isAuthenticated, calendarLoaded]);

  return (
    <div className="routines">
      <Navbar logout={logout} isAuthenticated={isAuthenticated} user={user} loginWithRedirect={loginWithRedirect} />
      <div className="calendar-container">
        {calendarLoaded && (
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={[
              { title: 'Shoulders/Triceps', date: '2024-04-01' },
              { title: 'Chest/Biceps', date: '2024-04-02' },
              { title: 'Leg day', date: '2024-04-03' },
              // Add your routines here with respective dates
            ]}
          />
        )}
      </div>
    </div>
  );
}
