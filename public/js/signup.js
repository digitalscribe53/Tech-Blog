const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const errorMessageElement = document.querySelector('#signup-error-message');

  if (username && password) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        const result = await response.json();
        throw new Error(result.message);
      }
    } catch (error) {
      errorMessageElement.textContent = error.message || 'Failed to sign up. Please try again.';
      errorMessageElement.style.display = 'block';
    }
  } else {
    errorMessageElement.textContent = 'Please enter both a username and password.';
    errorMessageElement.style.display = 'block';
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);