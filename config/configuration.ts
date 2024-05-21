export interface EnvConfiguration {
  port: number
}

export default () => ({
  config: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
})
