import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Chart from 'chart.js/auto'; // Import Chart from Chart.js
import axios from 'axios';

export function Home() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [logsData, setLogsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const chartRef = useRef(null);

  const handleLogout = () => {
    setLoading(true);
    logout({ returnTo: window.location.origin });
  };

  useEffect(() => {
    // Fetch logs data when the component mounts
    if (isAuthenticated) {
      fetchLogsData();
    }
  }, [isAuthenticated]);

  const fetchLogsData = async () => {
    try {
      // Fetch logs data from your backend server
      const response = await axios.get('http://localhost:3002/api/logs', {
        params: {
          userId: user.sub, // Assuming user.sub contains the user's ID
        },
      });
      setLogsData(response.data);
    } catch (error) {
      console.error('Error fetching logs data:', error);
    }
  };

  useEffect(() => {
    // Update the chart when logs data changes
    updateChart();
  }, [logsData]);

  const updateChart = () => {
    if (logsData.length === 0) return;
  
    const dates = logsData.map(log => {
      // Format the date
      const date = new Date(log.date);
      const formattedDate = date.toLocaleDateString(); // Format date as 'MM/DD/YYYY'
  
      // Combine exercise name and date
      return `${log.exercise} - ${formattedDate}`;
    });
    
    const weights = logsData.map(log => log.weight);
  
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Fitness Progress',
            data: weights,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const scrollToChart = () => {
    chartRef.current.scrollIntoView({ behavior: 'smooth'});
  };

  return (
    <div className="Home">
      <Navbar logout={handleLogout} isAuthenticated={isAuthenticated} user={user} loginWithRedirect={loginWithRedirect} />
      <Container fluid className="mt-4">
        {/* Your existing content */}
        {isAuthenticated ? (
          <Row>
            <Col md={6} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <Card.Title className="dashboard-card-title">Welcome, {user && user.name}!</Card.Title>
                  <Card.Text className="dashboard-card-text">
                    You're logged in. Here you can see various dashboard elements and functionalities.
                  </Card.Text>
                  <NavLink to="/logs" className="btn btn-outline-secondary">
                    Go to Logs
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <Card.Title className="dashboard-card-title">Recent Activity</Card.Title>
                  <Card.Text className="dashboard-card-text">
                    Display recent activity, notifications, or updates here.
                  </Card.Text>
                  <NavLink onClick={scrollToChart} variant="outline-secondary" className="btn dashboard-button">
                    View Activity
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <div className="text-center">
            <p className="not-logged-in-message">You are not logged in. Please log in to view the dashboard.</p>
            <Button onClick={loginWithRedirect} variant="primary" className="login-button">Log In</Button>
          </div>
        )}

        {/* Additional content below the cards */}
        <Row className="mt-4">
          <Col>
            <h2>Additional Content</h2>
            <p>This is some additional content that you want to display below the cards.</p>
            <p>You can add any relevant information or features here.</p>
          </Col>
        </Row>

        {/* Chart component */}
        <Row className="mt-4">
          <Col>
            <Card className="dashboard-card">
              <Card.Body>
                <Card.Title className="dashboard-card-title">Fitness Progress</Card.Title>
                <canvas id="myChart" ref={chartRef} width="400" height="200"></canvas>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
