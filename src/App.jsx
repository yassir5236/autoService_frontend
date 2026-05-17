import './App.css'
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Dashboard from './components/Dashboard.jsx';
import Rentcarlanding from './components/RentCarLanding.jsx';
import PageTransition from './components/PageTransition.jsx';
import AboutUs from './components/AboutUs.jsx';
import ContactUs from './components/ContactUs.jsx';
import HomePage from './components/HomePage.jsx';
import WAFloatingButton from './components/WAFloatingButton.jsx';


function App() {
  const location = useLocation();

  return (
    <>
      {/* WAFloatingButton MUST live here — outside AnimatePresence.
          Framer Motion page transitions apply CSS transforms to their children,
          which creates a new containing block for position:fixed elements,
          causing them to move/shake during transitions. */}
      <WAFloatingButton />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="/my-space" element={<PageTransition><Rentcarlanding /></PageTransition>} />
          {/* <Route path="/about" element={<PageTransition><AboutUs /></PageTransition>} /> */}
          <Route path="/contact" element={<PageTransition><ContactUs /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
