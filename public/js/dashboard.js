// Global variable to store the ID of the post to be deleted
let postIdToDelete = null;

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

// Function to show the delete confirmation modal
const showDeleteModal = (postId) => {
  postIdToDelete = postId;
  document.getElementById('delete-modal').style.display = 'block';
};

// Function to hide the delete confirmation modal
const hideDeleteModal = () => {
  document.getElementById('delete-modal').style.display = 'none';
  postIdToDelete = null;
};

// Function to delete the post
const deletePost = async () => {
  if (postIdToDelete) {
    const response = await fetch(`/api/posts/${postIdToDelete}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
  hideDeleteModal();
};

// Event listener for the post list
document.querySelector('.post-list').addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-post')) {
    const postId = event.target.getAttribute('data-id');
    showDeleteModal(postId);
  }
});

// Event listeners for the delete confirmation modal
document.getElementById('confirm-delete').addEventListener('click', deletePost);
document.getElementById('cancel-delete').addEventListener('click', hideDeleteModal);

// Close the modal if user clicks outside of it
window.onclick = (event) => {
  const modal = document.getElementById('delete-modal');
  if (event.target == modal) {
    hideDeleteModal();
  }
};