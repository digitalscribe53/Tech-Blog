const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    // Check if the user has been idle for more than 5 minutes
    const now = new Date();
    const lastActivity = new Date(req.session.lastActivity);
    const idleTime = (now - lastActivity) / 1000 / 60; // in minutes

    if (idleTime > 5) {
      req.session.logged_in = false;
      res.redirect('/login');
    } else {
      // Update last activity time
      req.session.lastActivity = now;
      next();
    }
  }
};
  
  module.exports = withAuth;
  