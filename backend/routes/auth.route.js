import express from "express";
import passport from "passport";

const router = express.Router();

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: process.env.CLIENT_URL + '/login',
  }), 
  (req, res) => {
    console.log("Authentication successful", req.user);
    console.log("Session ID:", req.sessionID);
    console.log("Is authenticated:", req.isAuthenticated());
    
    // Explicitly login to ensure session is saved
    req.login(req.user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.redirect(process.env.CLIENT_URL + '/login');
      }
      
      // Redirect to dashboard or home page
      res.redirect(process.env.CLIENT_URL + '/dashboard');
    });
  }
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

export default router