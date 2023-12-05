import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      // 入口文件，因为库模式不能用html页面作为入口
      entry: resolve(__dirname, 'src/DateInput/index.ts'),
      // 库名称
      name: 'DateInput',
      // 打包后文件的名称
      fileName: (format) => `date-input.${format}.ts`,
      // 不写也可以，默认就是['es','umd']
      formats: ['es', 'umd'],
    },
    // 自定义底层的 Rollup 打包配置
    rollupOptions: {
      // 确保某些库不进行打包，作为外部依赖
      external: ['vue'],
      output: {
        // 打包时全局变量Vue就是vue
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
