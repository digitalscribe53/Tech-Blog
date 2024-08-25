document.querySelector('#comment-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-content').value.trim();
  const postId = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];

  if (content) {
      const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({ content, post_id: postId }),
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.ok) {
          // Reload the page to show the new comment
          document.location.reload();
      } else {
          alert('Failed to post comment.');
      }
  }
});
