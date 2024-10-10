// Function called after Google Sign-In
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('User signed in');
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail());
  
    // After login, fetch and display events
    fetchEvents();
  }
  
  // Fetch events from the backend
  function fetchEvents() {
    fetch('http://localhost:5000/events')  // Replace with your actual backend URL
      .then(response => response.json())
      .then(events => {
        const eventsContainer = document.getElementById('events-container');
        eventsContainer.innerHTML = '';
  
        events.forEach(event => {
          const eventDiv = document.createElement('div');
          eventDiv.classList.add('event');
          
          const eventName = document.createElement('h3');
          eventName.textContent = event.name;
          
          const eventDate = document.createElement('p');
          eventDate.textContent = `Date: ${new Date(event.date).toLocaleDateString()}`;
  
          const eventLocation = document.createElement('p');
          eventLocation.textContent = `Location: ${event.location}`;
  
          const eventSchool = document.createElement('p');
          eventSchool.textContent = `School: ${event.school}`;
  
          const eventDescription = document.createElement('p');
          eventDescription.textContent = event.description;
  
          eventDiv.appendChild(eventName);
          eventDiv.appendChild(eventDate);
          eventDiv.appendChild(eventLocation);
          eventDiv.appendChild(eventSchool);
          eventDiv.appendChild(eventDescription);
  
          eventsContainer.appendChild(eventDiv);
        });
      })
      .catch(err => console.error(err));
  }
  
  // Log out function (optional)
  function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
      document.getElementById('events-container').innerHTML = '';
    });
  }
  