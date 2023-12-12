import React, { Component } from 'react';
import { FaReact } from 'react-icons/fa';

const aboutStyle = {
  background: 'linear-gradient(45deg, red, white)',
  padding: '20px',
  borderRadius: '10px',
  width: '70%',
  margin: 'auto',
  height: '100vh', // Fill the entire viewport height
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const reactLogoStyle = {
  fontSize: '100px', // Adjust the size as needed
  color: 'blue', // Adjust the color as needed
};

export default class About extends Component {
  render() {
    return (
      <div style={aboutStyle}>
        <FaReact style={reactLogoStyle} />
        <h1>About Proverbs App</h1>
        <p>
          Welcome to the Proverbs App! This application is designed to provide insights and wisdom from the Book of Proverbs.
          Explore different chapters and verses to discover timeless principles for a fulfilling life.
        </p>
        <p>
          Developed with <span role="img" aria-label="heart">❤️</span> using React by Andrae D. Bretaña.
        </p>
      </div>
    );
  }
}
