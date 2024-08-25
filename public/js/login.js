const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  const errorMessageElement = document.querySelector('#login-error-message');

  if (username && password) {
    try {
      const response = await fetch('/api/users/login', {
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
      errorMessageElement.textContent = error.message || 'Failed to log in. Please try again.';
      errorMessageElement.style.display = 'block';
    }
  } else {
    errorMessageElement.textContent = 'Please enter both a username and password.';
    errorMessageElement.style.display = 'block';
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);