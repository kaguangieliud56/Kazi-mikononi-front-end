import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { JobProvider } from './context/JobContext'
import { ChatProvider } from './context/ChatContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <JobProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </JobProvider>
    </AuthProvider>
  </React.StrictMode>,
)
