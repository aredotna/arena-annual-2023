import NextAuth from 'next-auth'

console.log({ ARENA_CLIENT_ID: process.env.ARENA_CLIENT_ID, ARENA_CLIENT_SECRET: process.env.ARENA_CLIENT_SECRET })

const options = {
  providers: [
    {
      id: 'arena',
      name: 'Are.na',
      type: 'oauth',
      scope: 'write read',
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

console.log({ options })

export default (req, res) => NextAuth(req, res, options)