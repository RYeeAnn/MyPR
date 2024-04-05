// Home.jsx

import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';

export function Home() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);

  const workoutExercises = [
    // Push Day Exercises
    { id: 1, name: 'Bench Press', description: 'Strengthen your chest, shoulders, and arms.', category: 'Push day' },
    { id: 2, name: 'Cable Flyes', description: 'Alternative isolation exercise for chest muscles.', category: 'Push day' },
    { id: 3, name: 'Chest Press Machine', description: 'Great for beginners to target chest muscles.', category: 'Push day' },
    { id: 4, name: 'Dumbbell Flyes', description: 'Isolation exercise for chest muscles.', category: 'Push day' },
    { id: 5, name: 'Dumbbell Shoulder Press', description: 'Targets shoulders and triceps.', category: 'Push day' },
    { id: 6, name: 'Incline Bench Press', description: 'Targets upper chest muscles.', category: 'Push day' },
    { id: 7, name: 'Overhead Press', description: 'Targets shoulders, triceps, and upper chest.', category: 'Push day' },
    { id: 8, name: 'Push-ups', description: 'Effective compound exercise for chest, shoulders, and triceps.', category: 'Push day' },
    { id: 9, name: 'Tricep Dips', description: 'Targets triceps and chest muscles.', category: 'Push day' },
    { id: 10, name: 'Tricep Extensions', description: 'Isolation exercise for triceps.', category: 'Push day' },
  
    // Pull Day Exercises
    { id: 11, name: 'Barbell Rows', description: 'Compound exercise for building back strength.', category: 'Pull day' },
    { id: 12, name: 'Bent-over Rows', description: 'Targets upper and middle back muscles.', category: 'Pull day' },
    { id: 13, name: 'Chin-ups', description: 'Similar to pull-ups but with a supinated grip.', category: 'Pull day' },
    { id: 14, name: 'Deadlift', description: 'Full-body exercise targeting back, legs, and grip strength.', category: 'Pull day' },
    { id: 15, name: 'Dumbbell Rows', description: 'Isolation exercise for the back.', category: 'Pull day' },
    { id: 16, name: 'Face Pulls', description: 'Targets rear delts, traps, and upper back.', category: 'Pull day' },
    { id: 17, name: 'Hammer Curls', description: 'Alternative bicep exercise.', category: 'Pull day' },
    { id: 18, name: 'Lat Pulldowns', description: 'Targets lats and upper back muscles.', category: 'Pull day' },
    { id: 19, name: 'Pull-ups', description: 'Great for building upper body strength and targeting back muscles.', category: 'Pull day' },
    { id: 20, name: 'Seated Cable Rows', description: 'Targets middle and lower back muscles.', category: 'Pull day' },
  
    // Leg Day Exercises
    { id: 21, name: 'Calf Raises', description: 'Targets calf muscles for growth and strength.', category: 'Leg day' },
    { id: 22, name: 'Good Mornings', description: 'Strengthens lower back and hamstrings.', category: 'Leg day' },
    { id: 23, name: 'Hack Squats', description: 'Alternative squat variation.', category: 'Leg day' },
    { id: 24, name: 'Leg Curls', description: 'Isolation exercise for hamstring muscles.', category: 'Leg day' },
    { id: 25, name: 'Leg Extensions', description: 'Isolation exercise for quadriceps.', category: 'Leg day' },
    { id: 26, name: 'Leg Press', description: 'Targets quadriceps, hamstrings, and glutes.', category: 'Leg day' },
    { id: 27, name: 'Lunges', description: 'Targets quads, hamstrings, glutes, and calves.', category: 'Leg day' },
    { id: 28, name: 'Romanian Deadlifts', description: 'Targets hamstrings and lower back muscles.', category: 'Leg day' },
    { id: 29, name: 'Squats', description: 'Compound exercise for building lower body strength and muscle mass.', category: 'Leg day' },
    { id: 30, name: 'Step-ups', description: 'Targets quads, hamstrings, and glutes.', category: 'Leg day' },
  ];


  const handleCategoryClick = (category) => {
    const workouts = workoutExercises.filter(exercise => exercise.category === category);
    setSelectedWorkouts(workouts);
  };

  return (
    <div className="App">
      <Navbar logout={logout} isAuthenticated={isAuthenticated} user={user} loginWithRedirect={loginWithRedirect} />
      <Container className="mt-4">
        <Row>
          <Col>
            <h1 className="heading">Welcome to MyPR</h1>
          </Col>
        </Row>

        <Row className='text-center mb-5'>
          <Col>
            <h2 className="subheading">Log into your account and start logging your PRs!</h2>
            <Button variant="secondary" as={NavLink} to="/logs" className="log-pr-button">Log PR</Button>
          </Col>
        </Row>
  
        <Row className='text-center'>
          <Col>
            <h2 className="subheading">Workout Exercises</h2>
            <div className="exercise-list">
              <Button variant="secondary" size='sm' onClick={() => handleCategoryClick('Push day')} className="category-button">Push day</Button>{' '}
              <Button variant="secondary" size='sm' onClick={() => handleCategoryClick('Pull day')} className="category-button">Pull day</Button>{' '}
              <Button variant="secondary" size='sm' onClick={() => handleCategoryClick('Leg day')} className="category-button">Leg day</Button>{' '}
              {selectedWorkouts.length > 0 && (
                <div>
                  <h3 className="selected-heading">Selected Workouts:</h3>
                  {selectedWorkouts.map((workout) => (
                    <Card key={workout.id} className="workout-card">
                      <Card.Body>
                        <Card.Title>{workout.name}</Card.Title>
                        <Card.Text>{workout.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>

      </Container>
    </div>
  )};