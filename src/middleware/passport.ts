import { PassportStatic } from "passport";
import { Strategy, StrategyOptions } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import keys from "../keys/keys";
import registeredUsers from "../registeredUsers";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys,
};

export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      const user = await registeredUsers.find((el) => el.id === payload.id); //TODO Доработать
    })
  );
};
