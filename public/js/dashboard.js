// Show the new post form when the "New Post" button is clicked
document.querySelector('#new-post').addEventListener('click', () => {
  const form = document.querySelector('#new-post-form');
  form.style.display = 'block';  // Show the form
});

// Handle the new post form submission
document.querySelector('#new-post-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
      const response = await fetch('/api/posts', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.ok) {
          // Reload the dashboard to display the new post
          document.location.replace('/dashboard');
      } else {
          alert('Failed to create post.');
      }
  }
});
