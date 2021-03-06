import {
  Strategy as JwtStrategy,
  ExtractJwt
} from "passport-jwt";
// db things
import db from "../database";
//passport-jwt config code refactored from https://www.npmjs.com/package/passport-jwt
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;
export default passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      db.findById("users", jwt_payload.id)
        .then(user => {
          if (user) {
            let userPayload = {
              id: user.id,
              email: user.email,
              is_admin: user.is_admin
            };
            delete userPayload.password;
            return done(null, user);
          }
          return done(null, false, "Unthorized");
        })
        .catch(err => console.log(err));
    })
  );
};
