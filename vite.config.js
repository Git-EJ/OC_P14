import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnvValues={
    "process.env": Object.entries(env).reduce((acc, [key, value]) => {
        return { ...acc, [key] :value }
    }, {})
  }
  return {
    plugins: [react()],
    define: processEnvValues
  }
})


// default config:
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })