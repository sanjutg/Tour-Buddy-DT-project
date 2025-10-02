// src/components/UserLoginScreen.jsx
import { useState } from 'react';
import Lottie from 'lottie-react';
import bgAnim from "../assets/bg.json";

export default function UserLogin() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleLogin = () => {
    alert(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nPassword: ${password}\nAddress: ${address}`);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Reverse geocoding using OpenStreetMap Nominatim API (free)
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            if (data && data.display_name) {
              setAddress(data.display_name);
            } else {
              setAddress(`${latitude}, ${longitude}`);
            }
            setIsGettingLocation(false);
          })
          .catch(error => {
            console.error('Error getting address:', error);
            setAddress(`${latitude}, ${longitude}`);
            setIsGettingLocation(false);
          });
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enter address manually.');
        setIsGettingLocation(false);
      }
    );
  };

  const styles = {
    loginContainer: {
      display: 'flex',
      minHeight: '100vh',
      width: '100vw',
      flexDirection: 'row',
      backgroundColor: '#d1c3ad',
    },
    leftSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#684a39',
      padding: '20px'
    },
    userTitle: {
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px'
    },
    starBadge: {
      backgroundColor: '#F7B1AB',
      borderRadius: '50px',
      padding: '10px'
    },
    lottieContainer: {
      width: '350px',
      height: '350px'
    },
    rightSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '40px',
      backgroundColor: '#d1c3ad',
    },
    formTitle: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '30px'
    },
    inputField: {
      width: '100%',
      backgroundColor: 'white',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '16px',
      fontSize: '16px',
      boxSizing: 'border-box'
    },
    addressContainer: {
      position: 'relative',
      width: '100%',
      marginBottom: '16px'
    },
    addressInput: {
      width: '100%',
      backgroundColor: 'white',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '12px 50px 12px 12px',
      fontSize: '16px',
      boxSizing: 'border-box'
    },
    locationButton: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: isGettingLocation ? '#ccc' : '#ae7860fc',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 8px',
      cursor: isGettingLocation ? 'not-allowed' : 'pointer',
      fontSize: '12px'
    },
    loginButton: {
      background: 'linear-gradient(135deg, #ae7860fc, #795050ff)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '18px',
      padding: '12px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.leftSection}>
        <h2 style={styles.userTitle}>
          <span style={styles.starBadge}>★</span> User
        </h2>
        <div style={styles.lottieContainer}>
          <Lottie animationData={bgAnim} loop autoPlay />
        </div>
      </div>

      <div style={styles.rightSection}>
        <h1 style={styles.formTitle}>User Login</h1>
        
        <input
          type="text"
          placeholder="What can we call you?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.inputField}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.inputField}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.inputField}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.inputField}
        />

        <div style={styles.addressContainer}>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={styles.addressInput}
          />
          <button
            onClick={getLocation}
            disabled={isGettingLocation}
            style={styles.locationButton}
          >
            {isGettingLocation ? '📍...' : '📍'}
          </button>
        </div>

        <button onClick={handleLogin} style={styles.loginButton}>
          Login
        </button>
      </div>
    </div>
  );
}