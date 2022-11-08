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
        console.log({ profile })

        const data = {
          id: profile.id,
          email: profile.email,
          username: profile.username
        }

        console.log({ profile, data })

        return data
      }
    }
  ],
  callbacks: {
    session: async (session, user) => {
      console.log({ session, user })
      return Promise.resolve(session)
    }
  }
}

console.log({ options })

export default (req, res) => NextAuth(req, res, options)