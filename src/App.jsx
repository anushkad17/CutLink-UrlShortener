import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { getApps } from './utils/Helper'

function App() {

  const CurrentApp = getApps();
  console.log("CurrentApp:", CurrentApp);

  return (
    
    <Router>
      <CurrentApp />
    </Router>
  )
}

export default App