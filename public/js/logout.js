const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

document.querySelector('#logout').addEventListener('click', logout);

// Redirect to login if idle for more than 5 minutes
setInterval(() => {
  if (localStorage.getItem('lastActivity')) {
    const lastActivity = new Date(localStorage.getItem('lastActivity'));
    const now = new Date();
    const idleTime = (now - lastActivity) / 1000 / 60; // in minutes

    if (idleTime > 5) {
      alert('You have been idle for more than 5 minutes. Please log in again.');
      logout();
    }
  }
}, 60000); // Check every minute

// Update last activity time on any user interaction
document.addEventListener('mousemove', () => {
  localStorage.setItem('lastActivity', new Date());
});
document.addEventListener('keypress', () => {
  localStorage.setItem('lastActivity', new Date());
});