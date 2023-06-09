import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as jwtStrategy, } from 'passport-jwt';

import { usersModel } from '../persistence/mongo/models/user.model.js'; 
import { hashData, compareHashedData } from '../utils.js';
import { generateToken, authToken } from '../utils.js';


passport.use(
  'registro',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { first_name, last_name, rol } = req.body;
        if (!first_name || !last_name || !email || !password || !rol) {
          return done(null, false);
        }
        const userDB = await usersModel.findOne({ email });
        if (userDB) {
          return done(null, false);
        } else {
          const hashPassword = await hashData(password);
          const newUser = {
            ...req.body,
            password: hashPassword,
            cart: [],
          };
          const newUserDB = await usersModel.create(newUser); 
          const token = generateToken(newUserDB); 
          done(null, newUserDB);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userDB = await usersModel.findOne({ email });
        if (!userDB) {
          return done(null, false);
        }
        const comparePassword = await compareHashedData(
          password,
          userDB.password
        );
        if (!comparePassword) {
          return done(null, false);
        }
        done(null, userDB);
      } catch (error) {
        done(error);
      }
    }
  )
);


const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['cookieToken'];
  }
  return token;
};

passport.use(
    'jwt',
    new jwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: 'secretJWT',
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  )




passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await usersModel.findById(id); 
  done(null, user);
});
