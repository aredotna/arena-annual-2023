import NextAuth from 'next-auth'

const options = {
  providers: [
    {
      id: 'arena',
      name: 'Are.na',
      type: 'oauth',
      authorization: {
        url: 'https://dev.are.na/oauth/authorize',
        params: {
          scope: 'write'
        }
      },
      token: 'https://dev.are.na/oauth/token',
      userinfo: 'https://api.are.na/v2/me',
      clientId: process.env.ARENA_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_SECRET,
      profile: (profile) => {
        const data = {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          username: profile.username
        }
        
        console.log({ profile, data })

        return data
      }
    }
  ]
}

console.log({ options })

export default (req, res) => NextAuth(req, res, options)