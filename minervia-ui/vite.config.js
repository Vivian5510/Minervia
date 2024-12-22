import {defineConfig, loadEnv} from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.minervia.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.minervia.vip/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === 'production' ? '/' : '/',
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src')
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    // vite 相关配置
    server: {
      port: 80,
      host: true,
      open: true,
      proxy: {
        '/swagger-ui': {
          target: 'http://localhost:8080',  // 后端服务监听在 8080 端口
          changeOrigin: true,               // 确保请求头中的 Origin 被修改为目标地址
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('/swagger-ui Proxying request:', req.method, req.url);  // 打印请求信息
            });
          }
        },
        '/v3': {
          target: 'http://localhost:8080',  // 后端服务监听在 8080 端口
          changeOrigin: true,               // 确保请求头中的 Origin 被修改为目标地址
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('/v3 Proxying request:', req.method, req.url);  // 打印请求信息
            });
          }
        },
        '/dev-api': {
          target: 'http://localhost:8080', // 确保这里包含了端口号
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, ''),
          configure: (proxy, options) => {
            // 代理请求调试
            proxy.on('proxyReq', (proxyReq, req, res) => {
              // 获取目标 URL 完整的协议、主机、端口
              const targetUrl = new URL(proxy.options.target);
              const finalUrl = targetUrl.protocol + '//' + targetUrl.host + proxyReq.path;
              console.log('Proxying request:', req.method, req.url, '->', finalUrl);
            });
          }
        }
      }
    },
    //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    }
  }
})
