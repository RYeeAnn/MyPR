import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from '../components/Navbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export function Routines() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [events, setEvents] = useState([]);
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '' });

  useEffect(() => {
    if (isAuthenticated && !calendarLoaded) {
      setCalendarLoaded(true);
    }
  }, [isAuthenticated, calendarLoaded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, date } = formData;
    if (title.trim() !== '' && date.trim() !== '') {
      const newEvent = { title, date };
      setEvents([...events, newEvent]);
      setFormData({ title: '', date: '' }); // Reset form fields after submission
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="routines">
      <Navbar logout={logout} isAuthenticated={isAuthenticated} user={user} loginWithRedirect={loginWithRedirect} />
      <Container>
        <Card className="mt-4">
          <Card.Body>
            {isAuthenticated && (
              <div className="add-event-form">
                <h2 className="mb-4">Add Event</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="title">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="date">
                    <Form.Label>Date:</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary">Add Event</Button>
                </Form>
              </div>
            )}
          </Card.Body>
        </Card>
        <div className="calendar-container mt-4">
          {calendarLoaded && (
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
