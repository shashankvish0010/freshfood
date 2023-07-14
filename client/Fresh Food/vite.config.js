import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:8000/",

      },
      '/register': {
        target: "http://localhost:8000/",
      },
      '/createcoupon' : {
        target: "http://localhost:8000/",
      },
      '/addpartner': {
        target: "http://localhost:8000/",

      },
      '/admin-panel': {
        target: "http://localhost:8000/",

      },
      '/partnerlogin': {
        target: 'http://localhost:8000/',
      },
      '/customerlogin': {
        target: 'http://localhost:8000/'
      },
      '/signup': {
        target: 'http://localhost:8000/'
      },
      '/soft-admin': {
        target: 'http://localhost:8000/'
      },
      '/softadmin-login': {
        target: 'http://localhost:8000/'
      },
      '/partneradmin': {
        target: 'http://localhost:8000/'
      },
      '/add-dish' : {
        target : 'http://localhost:8000/'
      },
      '/partners-db' : {
        target : 'http://localhost:8000/'
      },
      '/confirmation' : {
        target : 'http://localhost:8000/'
      },
      '/getdata' : {
        target : 'http://localhost:8000/'
      },
      '/getcoupons': {
        target : 'http://localhost:8000/'
      },
      '/edit-dish' : {
        target : 'http://localhost:8000/'
      },
      '/search' : {
        target : 'http://localhost:8000/'
      },
      '/paymentverification': {
        target : 'http://localhost:8000/'
      },
      '/checkout': {
        target : 'http://localhost:8000/'
      },
      '/profiledata': {
        target : 'http://localhost:8000/'
      },
      '/saveorder' : {
        target : 'http://localhost:8000/' 
      },
      '/addorder' : {
        target : 'http://localhost:8000/' 
      },
      '/getorders' : {
        target : 'http://localhost:8000/' 
      },
      '/sendorder' : {
        target : 'http://localhost:8000/' 
      },
      '/fetchorder': {
        target : 'http://localhost:8000/' 
      },
      '/dispatchorder' : {
        target : 'http://localhost:8000/' 
      },
      '/totalorder' : {
        target : 'http://localhost:8000/' 
      },
      '/updatecoupon': {
        target : 'http://localhost:8000/' 
      },
      '/updateprofile': {
        target : 'http://localhost:8000/' 
      },
    },
  },
  plugins: [react(), Icons({  }),] ,
})
