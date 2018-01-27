import {start} from 'documittu-template-default'
import apiData from './analyze-result.json'

start({
  title: 'react-material-app',
  pages: require.context('./pages', true, /^\.\/.*\.((md)|([jt]sx?))$/),
  apiDocs: {
    data: apiData,
  },
})
