import React, {useState, useEffect} from 'react';
import homebanner1 from '../../assets/images/home_banner_1.png';
import homebanner2 from '../../assets/images/home_banner_2.png';
import homebanner3 from '../../assets/images/home_banner_3.png';
import Navbar from '../../components/Navbar/Navbar';
import Search from '../../components/Search/Search';
import Footer from '../../components/Footer/Footer';
import './HomePage.css'
import About from '../../components/About/About';
import AWrapper from '../../components/About/AWrapper';
import Services from '../../components/Services/Services';
import Support from '../../components/Support/Support';
// import LoginForm from '../../components/LoginForm/LoginForm';


function HomePage() {
    const [position, setPosition] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((prevIndex) => (prevIndex + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

  
  
    
  return (
    <div className="home_container" id='/'>
        <div className="home_side" style={{ transform: `translateX(-${position * 100}vw)` }}>
            <div className="home1">
                <img src={homebanner1} alt="Home 1" />
            </div>
            <div className="home2">
                <img src={homebanner2} alt="Home 2" />
            </div>
            <div className="home3">
                <img src={homebanner3} alt="Home 3" />
            </div>
        </div>
        <Navbar/>
        <AWrapper />
        <Search />
        <About />
        <Services />
        <Support />
        <h1>phân lề</h1>
        <Footer />
    </div>
  )
}


export default HomePage