import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import trash from '../assets/trash.svg';
import workouts from '../workouts.json';
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


  // data from json file
  const workoutExercises = workouts;


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


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
      toast.success("Log submitted successfully");
      setExercise('');
      setWeight('');
      setReps('');
      setSets('');
      setDate(formattedDate); // Set the date state variable
      fetchLogs();
    } catch (error) {
      console.error('Error logging PR:', error);
      toast.error("Failed to submit log. Please try again later.");
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
                          <option key={exercise.id} value={exercise.name}>
                            {exercise.name}
                          </option>
                        ))}
                        {/* Render options */}
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
          {logs.map((log) => (
            <Col key={log.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Body className="log-card">
                  <div className="exercise">{log.exercise}</div>
                  <div className="log-details">
                    <div>Weight: {log.weight} lbs</div>
                    {log.reps && <div>Reps: {log.reps}</div>}
                    {log.sets && <div>Sets: {log.sets}</div>}
                    <div>Date: {formatDate(log.date)}</div>
                  </div>
                  <div className="delete-icon" onClick={() => handleDelete(log.id)}>
                    <img src={trash} alt="trashcan" className="trash-icon"/>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>


        <Row>
          <Col className='text-center mb-5'>
            {isAuthenticated && <Button onClick={handleExport}>Export</Button>}
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