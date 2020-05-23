import { Query, Resolver, UseMiddleware } from "type-graphql";
import { ValidateAuth } from "../middleware/validateAuth.middleware";

@Resolver()
class utilities {
    @Query(() => String)
    ping() {
        return "Pong";
    }

    @UseMiddleware(ValidateAuth)
    @Query(() => String)
    pingAuth() {
        return "Auth Pong";
    }
}
