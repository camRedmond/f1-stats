import React, { useState } from 'react';
import {
    Routes,
    Route,
    Link,
} from "react-router-dom";
import './App.scss';
import Home from './routes/home/Home';
import Schedule from './routes/schedule/Schedule';
import Standings from './routes/standings/Standings';

function App() {
    const [theme, setTheme] = useState(sessionStorage.getItem('storedTheme') ? sessionStorage.getItem('storedTheme') : "dark");
    sessionStorage.setItem('storedTheme', theme)
    document.documentElement.setAttribute("data-theme", theme);


    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        const themeButton = document.getElementById('themeChange');
        if (newTheme === 'light') {
            themeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>`
        } else {
            themeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="1166">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>`
        }
        document.documentElement.setAttribute("data-theme", newTheme);
        sessionStorage.setItem("storedTheme", newTheme)
        setTheme(newTheme);
    }


    return (
        <>
            <div className='navbar' id='navbar-main'>
                <div className='container'>
                    <div className='navbar-title'>
                        <Link to={'/'} style={{'textDecoration': 'none', 'color': '#e4e6eb'}}>
                            <h3>F1Stats</h3>
                        </Link>
                    </div>
                    <div className='theme-toggle'>
                        <button className="c-button" id="themeChange" onClick={() => toggleTheme()}>
                            {document.documentElement.getAttribute("data-theme") === 'dark'
                            ? <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-reactid="1166">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            }
                        </button>
                    </div>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/driver-standings" element={<Standings active={'driver'} />} />
                <Route path="/constructor-standings" element={<Standings active={'constructor'} />} />
            </Routes>
            <div className='footer text-center'>
                <h6>Cameron Redmond &copy;</h6>
                <p>F1Stats Archive Coming Soon...</p>
                &#183;
                <span>
                    <p><a href='https://formula1.com/' target={'_blank'}>track images from F1</a></p>
                </span>
            </div>
        </>
    )
}

export default App;