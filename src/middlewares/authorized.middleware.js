export const isAuthorized = (req, res, next) => {

  const statusRol = req.user && req.user.rol;

  if (statusRol) {
    if ( statusRol === 'user' || statusRol === undefined || statusRol === 'undefined' || statusRol === null ) {
      return res.status(403).redirect('/user/errorAuthorization'); 
    } else{

      return next(); 
    }
  }
  return res.status(403).redirect('/user/errorAuthorization');
  //   next();
};


