import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './app/App'
import 'react-loading-skeleton/dist/skeleton.css'
import "primereact/resources/themes/lara-light-cyan/theme.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
