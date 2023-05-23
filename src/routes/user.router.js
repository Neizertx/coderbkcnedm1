
import { Router } from 'express';
import passport from 'passport';
import UsersControlls from './../controllers/users.controller.js'


const router = Router();


router.post(
  '/register',
  passport.authenticate('registro', {
    failureRedirect: '/user/errorRegistro',
    successRedirect: '/user/profile',
    passReqToCallback: true, 
  })
);

router.post(
  '/login',
  passport.authenticate('login', {
    failureRedirect: '/user/errorLogin',
    successRedirect: '/user/profile',
    passReqToCallback: true,
  })
);


router.get('/logout', (req, res, next) => {
  req.logout((error)=>{
    if (error) {
      res.redirect('/user/error');
      next();
    } else {
      res.redirect('/user/login')
      next()
    }
  })
});


export default router;
