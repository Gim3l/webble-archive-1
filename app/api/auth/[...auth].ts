import { passportAuth } from "blitz"
import db from "db"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"

export default passportAuth({
  successRedirectUrl: "/",
  errorRedirectUrl: "/",
  authenticateOptions: { scope: "openid email profile" },
  strategies: [
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          process.env.NODE_ENV === "production"
            ? "https://webble.co/api/auth/google/callback"
            : "http://localhost:3000/api/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        const email = profile.email ?? profile.emails[0]?.value

        if (!email) {
          return done(
            new Error("Google OAuth couldn't retrieve your email." + JSON.stringify(profile))
          )
        }

        const user = await db.user.upsert({
          where: { email },
          create: {
            email,
            firstName: profile.name.givenName || "",
            lastName: profile.name.familyName || "",
          },
          update: { email },
        })

        const publicData = { userId: user.id, roles: [user.role], source: "google" }

        return done(null, {
          publicData,
          redirectUrl:
            process.env.NODE_ENV === "production" ? "https://webble.co" : "http://localhost:3000",
        })
      }
    ),
  ],
})
