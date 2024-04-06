import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import trash from '../assets/trash.svg';
import * as XLSX from 'xlsx';

export function Logs() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [logs, setLogs] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Initialize with current date
  const userId = isAuthenticated ? user.sub : null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  const workoutExercises = [
    { id: 1, name: 'Barbell Rows', description: 'Compound exercise for building back strength.', category: 'Pull day' },
    { id: 2, name: 'Bench Press', description: 'Strengthen your chest, shoulders, and arms.', category: 'Push day' },
    { id: 3, name: 'Bent-over Rows', description: 'Targets upper and middle back muscles.', category: 'Pull day' },
    { id: 4, name: 'Cable Flyes', description: 'Alternative isolation exercise for chest muscles.', category: 'Push day' },
    { id: 5, name: 'Calf Raises', description: 'Targets calf muscles for growth and strength.', category: 'Leg day' },
    { id: 6, name: 'Chest Press Machine', description: 'Great for beginners to target chest muscles.', category: 'Push day' },
    { id: 7, name: 'Chin-ups', description: 'Similar to pull-ups but with a supinated grip.', category: 'Pull day' },
    { id: 8, name: 'Deadlift', description: 'Full-body exercise targeting back, legs, and grip strength.', category: 'Pull day' },
    { id: 9, name: 'Dumbbell Flyes', description: 'Isolation exercise for chest muscles.', category: 'Push day' },
    { id: 10, name: 'Dumbbell Rows', description: 'Isolation exercise for the back.', category: 'Pull day' },
    { id: 11, name: 'Dumbbell Shoulder Press', description: 'Targets shoulders and triceps.', category: 'Push day' },
    { id: 12, name: 'Face Pulls', description: 'Targets rear delts, traps, and upper back.', category: 'Pull day' },
    { id: 13, name: 'Good Mornings', description: 'Strengthens lower back and hamstrings.', category: 'Leg day' },
    { id: 14, name: 'Hack Squats', description: 'Alternative squat variation.', category: 'Leg day' },
    { id: 15, name: 'Hammer Curls', description: 'Alternative bicep exercise.', category: 'Pull day' },
    { id: 16, name: 'Incline Bench Press', description: 'Targets upper chest muscles.', category: 'Push day' },
    { id: 17, name: 'Lat Pulldowns', description: 'Targets lats and upper back muscles.', category: 'Pull day' },
    { id: 18, name: 'Leg Curls', description: 'Isolation exercise for hamstring muscles.', category: 'Leg day' },
    { id: 19, name: 'Leg Press', description: 'Targets quadriceps, hamstrings, and glutes.', category: 'Leg day' },
    { id: 20, name: 'Leg Extensions', description: 'Isolation exercise for quadriceps.', category: 'Leg day' },
    { id: 21, name: 'Lunges', description: 'Targets quads, hamstrings, glutes, and calves.', category: 'Leg day' },
    { id: 22, name: 'Overhead Press', description: 'Targets shoulders, triceps, and upper chest.', category: 'Push day' },
    { id: 23, name: 'Pull-ups', description: 'Great for building upper body strength and targeting back muscles.', category: 'Pull day' },
    { id: 24, name: 'Push-ups', description: 'Effective compound exercise for chest, shoulders, and triceps.', category: 'Push day' },
    { id: 25, name: 'Romanian Deadlifts', description: 'Targets hamstrings and lower back muscles.', category: 'Leg day' },
    { id: 26, name: 'Seated Cable Rows', description: 'Targets middle and lower back muscles.', category: 'Pull day' },
    { id: 27, name: 'Squats', description: 'Compound exercise for building lower body strength and muscle mass.', category: 'Leg day' },
    { id: 28, name: 'Step-ups', description: 'Targets quads, hamstrings, and glutes.', category: 'Leg day' },
    { id: 29, name: 'Tricep Dips', description: 'Targets triceps and chest muscles.', category: 'Push day' },
    { id: 30, name: 'Tricep Extensions', description: 'Isolation exercise for triceps.', category: 'Push day' },
  ];

  useEffect(() => {
    // Fetch logs when the component mounts
    if (isAuthenticated) {
      fetchLogs();
    }
  }, [isAuthenticated]);

  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/logs', { params: { userId } });
      const newLogs = response.data;
  
      const filteredLogs = newLogs.filter(newLog => !logs.find(log => log.id === newLog.id));
      const sortedLogs = [...filteredLogs, ...logs].sort((a, b) => b.id - a.id);
  
      setLogs(sortedLogs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };
  
  const handleDelete = async (logId) => {
    try {
      await axios.delete(`http://localhost:3002/api/logs/${logId}`)
      setLogs(logs.filter((log) => log.id !== logId));
      toast.success("Log deleted successfully");
    } catch (error) {
      console.error('Error deleting log', error);
      toast.error("Failed to delete log. Please try again later.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Get the current date
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
  
      const postData = {
        exercise,
        weight,
        userId,
        date: formattedDate // Add the formatted date to the postData
      };
  
      // Remove conditionals for sets and reps
      if (sets) {
        postData.sets = sets;
      }
      if (reps) {
        postData.reps = reps;
      }
  
      await axios.post('http://localhost:3002/api/log-pr', postData);
  
      setExercise('');
      setWeight('');
      setReps('');
      setSets('');
      setDate(formattedDate); // Set the date state variable
  
      fetchLogs();
    } catch (error) {
      console.error('Error logging PR:', error);
      setErrorMessage('Failed to log PR. Please try again later.');
    }
  };

    const handleExport = () => {
        const data = logs.map((log) => ({
          Exercise: log.exercise,
          Weight: log.weight,
          Reps: log.reps || '',
          Sets: log.sets || '',
          Date: formatDate(log.date),
        }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Logs');

    XLSX.writeFile(workbook, 'logs.xlsx');
  };

  return (
    <div className="App">
      <Navbar logout={logout} isAuthenticated={isAuthenticated} user={user} loginWithRedirect={loginWithRedirect} />
      <Container className="mt-4">
      <Row>
  <Col>
    {isAuthenticated && (
      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Exercise and Weight */}
          <Col md={6}>
            <Form.Group controlId="exercise">
              <Form.Label>Select Exercise</Form.Label>
              <Form.Control as="select" value={exercise} onChange={(e) => setExercise(e.target.value)}>
                <option value="">Select an exercise</option>
                {workoutExercises.map((exercise) => (
                  <option key={exercise.id} value={exercise.name}>{exercise.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="weight">
              <Form.Label>Enter Weight (lb or kg)</Form.Label>
              <Form.Control type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {/* Reps and Sets */}
          <Col md={6}>
            <Form.Group controlId="reps">
              <Form.Label>Reps</Form.Label>
              <Form.Control type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="sets">
              <Form.Label>Sets</Form.Label>
              <Form.Control type="number" value={sets} onChange={(e) => setSets(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {/* Date */}
          <Col>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="secondary" type="submit" style={{ marginTop: '1rem '}}>
          Log PR
        </Button>
      </Form>
    )}
  </Col>
</Row>

        
        <Row className="mt-4">
          <Col className='mb-5'>
            <h2>Logged PRs</h2>
            <div className="logs-list">
              {logs.map((log, index) => (
                <Card key={index} className="mb-2">
                  <Card.Body>
                  {log.exercise}: {log.weight} {log.reps ? `- ${log.reps} reps` : ''}{log.sets ? `- ${log.sets} sets` : ''}
                  <div className="date_delete">
                  {formatDate(log.date)}
                    <div onClick={() => handleDelete(log.id)} style={{ cursor: 'pointer' }}>
                        <img src={trash} alt="trashcan" style={{ transition: 'transform 0.2s' }} className="delete-icon"/>
                    </div>
                  </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>

        <Row>
            <Col className='text-center mb-5'>
                <Button onClick={handleExport}>Export</Button>
            </Col>
        </Row>

        {errorMessage && (
          <Row className="mt-3">
            <Col>
              <Alert variant="danger">{errorMessage}</Alert>
            </Col>
          </Row>
        )}
        
      </Container>

      <ToastContainer />
    </div>
  );
}
