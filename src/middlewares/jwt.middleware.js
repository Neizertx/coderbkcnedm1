import jwt from 'jsonwebtoken';

export function jwtValidation(req, res, next) {
  const autHeader = req.get('Authorization');
  console.log('autHeader', req)
  const token = autHeader && autHeader.split(' ')[1];
  if (!token) {
  
    return res.redirect('errorAuthorization');
  }

  const isValidUser = jwt.verify(token, 'secretJWT');
  if (isValidUser) {
    console.log(isValidUser);
    req.user = isValidUser.user; 
    next();
  } else {
   
    res.redirect('errorAuthorization');
  }

  res.send(token);
  console.log(token);
  next();
}
