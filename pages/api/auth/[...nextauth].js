import NextAuth from 'next-auth'

const options = {
  providers: [
    {
      id: 'arena',
      name: 'Are.na',
      type: 'oauth',
      authorization: 'https://dev.are.na/oauth/authorize',
      token: 'https://dev.are.na/oauth/token',
      userinfo: 'https://api.are.na/v2/me',
      clientId: process.env.ARENA_CLIENT_ID,
      clientSecret: process.env.ARENA_CLIENT_SECRET,
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          username: profile.username
        }
      }
    }
  ]
}

export default (req, res) => NextAuth(req, res, options)