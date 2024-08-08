import './App.css'
import Challenges from './components/Challenges'
import Features from './components/Features'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import Stories from './components/Stories'

function App() {

  return (
    <div className='app'>
      <Header />
      <Home />
      <Challenges />
      <Features />
      <Stories />
      <Footer/>
    </div>
  )
}

export default App
