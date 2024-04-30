// Home.jsx

import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Row, Col, Button, Card, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import bench from '../assets/bench.jpg'
import deadlift from '../assets/deadlift.jpg'
import squat from '../assets/squat.jpg';


export function Home() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [weightConversion, setWeightConversion] = useState('');
  const [showWeightConversion, setShowWeightConversion] = useState(false);
  const [convertedWeight, setConvertedWeight] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('kg');

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
    setActiveCategory(category);
  };

    // Function to get image based on workout name
    const getImage = (workoutName) => {
      switch (workoutName.toLowerCase()) {
        case 'bench press':
          return bench;
        case 'deadlift':
          return deadlift;
        case 'squats':
          return squat;
        default:
          return '';
      }
    };

    // Function to render welcome text
    const renderWelcomeText = () => {
      return (
        <div className="text-center">
          <h2>Welcome to MyPR</h2>
          <p>Log your personal records and track your progress!</p>
        </div>
      );
    };

    const handleWeightConversionClick = () => {
      setSelectedWorkouts([]); // Clear selected workouts
      setActiveCategory(''); // Clear active category
      setShowWeightConversion(true); // Show weight conversion input field
    };
  
    const handleConversionSubmit = (e) => {
      e.preventDefault();
      const weight = parseFloat(weightConversion);
      if (!isNaN(weight)) {
        let converted = '';
        if (selectedUnit === 'kg') {
          // Convert kg to lbs
          converted = weight * 2.20462;
          setConvertedWeight(`${weightConversion} kg is approximately ${converted.toFixed(2)} lbs`);
        } else if (selectedUnit === 'lb') {
          // Convert lbs to kg
          converted = weight / 2.20462;
          setConvertedWeight(`${weightConversion} lbs is approximately ${converted.toFixed(2)} kg`);
        }
      } else {
        setConvertedWeight('Invalid input. Please enter a valid number.');
      }
    };

    return (
      <div className="Home">
        {/* Navbar component */}
        <Navbar logout={logout} isAuthenticated={isAuthenticated} user={user} loginWithRedirect={loginWithRedirect} />
        <Container fluid className="mt-4">
          <Row className="mt-5">
            {/* Sidebar */}
            <div className="sidebar-title">
              <p>SideBar</p>
            </div>
            <Col xs={12} md={6} lg={2} className="mb-4 border-right">
              <Nav className="flex-column">
                <Nav.Item>
                  <Nav.Link onClick={handleWeightConversionClick}>Weight Conversion</Nav.Link>
                </Nav.Item>
                <div className="sidebar-title">
                  <p>Page Directs</p>
                </div>
                <Nav.Link to="/logs" as={NavLink}>
                  Logs
                </Nav.Link>
                <Nav.Link to="/routines" as={NavLink}>
                  Routines
                </Nav.Link>
              </Nav>
              <div className="sidebar-title">
                <p>Workout Categories</p>
              </div>
              <Nav className="flex-column">
                <Nav.Item>
                  <Nav.Link onClick={() => handleCategoryClick('Push day')} active={activeCategory === 'Push day'}>
                    Push day
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => handleCategoryClick('Pull day')} active={activeCategory === 'Pull day'}>
                    Pull day
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => handleCategoryClick('Leg day')} active={activeCategory === 'Leg day'}>
                    Leg day
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            {/* Display either welcome text or selected workouts */}
            <Col xs={12} md={6} lg={8}>
              {activeCategory ? (
                <Row>
                  {selectedWorkouts.map((workout) => (
                    <Col key={workout.id} xs={12} md={6} lg={4} className="mb-4">
                      <Card className="h-100">
                        <Card.Img variant="top" src={getImage(workout.name)} />
                        <Card.Body>
                          <Card.Title>{workout.name}</Card.Title>
                          <Card.Text>{workout.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                renderWelcomeText()
              )}
  
              {/* Display weight conversion input field if showWeightConversion is true */}
              {showWeightConversion && (
                <div className="mt-4 d-flex flex-column justify-content-center align-items-center">
                  <h4>Weight Conversion</h4>
                  <form onSubmit={handleConversionSubmit}>
                    <input
                      type="text"
                      value={weightConversion}
                      onChange={(e) => setWeightConversion(e.target.value)}
                      placeholder={`Enter weight (${selectedUnit})`}
                    />
                    <div>
                      <label>
                        <input
                          type="radio"
                          value="kg"
                          checked={selectedUnit === 'kg'}
                          onChange={() => setSelectedUnit('kg')}
                        />
                        kg
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="lb"
                          checked={selectedUnit === 'lb'}
                          onChange={() => setSelectedUnit('lb')}
                        />
                        lb
                      </label>
                    </div>
                    <Button type="submit">Convert</Button>
                  </form>
                  {convertedWeight && <p className="mt-2">Converted Weight: {convertedWeight}</p>}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  
  export default Home;