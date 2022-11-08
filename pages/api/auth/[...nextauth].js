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
      // userinfo: {
      //   url: 'https://api.are.na/v2/me',
      //   method: 'GET',
      //   async request({ client, tokens }) {
      //     console.log({ client, tokens })

      //     const { data } = await client.get('https://api.are.na/v2/me')

      //     return {
      //       data: {
      //         id: data.id,
      //         email: data.email,
      //         username: data.username
      //       }
      //     }
      //   }
      // },
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
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      console.log({ token, account, profile } )
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
        token.username = profile.username
      }
      return token
    },
    session: async ({ session, user, token }) => {
      console.log({ session, user, 'session.user': session.user, token })
      const data = {
        id: token.id,
        accessToken: token.accessToken,
        name: token.username
      }
      return Promise.resolve({
        ...session,
        user: data
      })
    }
  }
}

console.log({ options })

export default (req, res) => NextAuth(req, res, options)