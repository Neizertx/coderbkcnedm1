export const isAuthenticated = (req, res, next) => {


  if (req.session.passport) {
    next();
  } else {
    res.redirect('/user/errorLogin');
  }
};
