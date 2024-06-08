export interface EnvConfiguration {
  port: number
  jwtSecret: string
}

export default () => ({
  config: {
    port: parseInt(process.env.PORT, 10) || 3000,
    jwtSecret: process.env.JWT_SECRET,
  },
})
