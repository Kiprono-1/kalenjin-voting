import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Results from './pages/Results'
import Admin from './pages/Admin'
import About from './pages/About'
import Awards from './pages/Awards'
import Foundation from './pages/Foundation'
import Login from './pages/Login'
import Apply from './pages/Apply'
import Contact from './pages/Contact'
import Layout from './components/Layout'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout currentPageName="Home">
            <Home />
          </Layout>
        } />
        <Route path="/home" element={
          <Layout currentPageName="Home">
            <Home />
          </Layout>
        } />
        <Route path="/results" element={
          <Layout currentPageName="Results">
            <Results />
          </Layout>
        } />

        <Route path="/admin" element={
          <Layout currentPageName="Admin">
            <Admin />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout currentPageName="About">
            <About />
          </Layout>
        } />
        <Route path="/awards" element={
          <Layout currentPageName="Awards">
            <Awards />
          </Layout>
        } />
        <Route path="/foundation" element={
          <Layout currentPageName="Foundation">
            <Foundation />
          </Layout>
        } />
        <Route path="/apply" element={
          <Layout currentPageName="Apply">
            <Apply />
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout currentPageName="Contact">
            <Contact />
          </Layout>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
