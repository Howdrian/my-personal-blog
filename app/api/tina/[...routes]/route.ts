import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer'
import { TinaAuthJSOptions, TinaAuthJSProvider } from 'tinacms-authjs'
import databaseClient from '../../../../tina/__generated__/databaseClient' // Adjusted path

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : TinaAuthJSProvider({
        databaseClient: databaseClient,
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET,
        }),
      }),
  databaseClient,
})

export const GET = (req) => {
  return handler(req)
}

export const POST = (req) => {
  return handler(req)
}
