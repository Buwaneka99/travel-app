import React from 'react';
import './style1.css';
function Header() {
  return (
    <div>
      <section className="home-section">
        <div className="home-container">
          <nav className="navbar-custom">
            <div className="logo-container">
              <div className="menu-icon">
                <i className="fa fa-bars"></i>
              </div>
              <h3>Travel</h3>
            </div>
            <div className="menu-container">
              <div className="menu-close">
                <i className="fa fa-close"></i>
              </div>
              <ul className="menu-list">
                <li><a href="/home">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Travel Packages</a></li>
                <li><a href="/location">Destinations</a></li>
                <li><a href="/hotel">Hotels</a></li>
              </ul>
            </div>
            <div className="auth-container">
              <a href="#">LogIn</a>
              <a href="#">SignUp</a>
            </div>
          </nav>
        </div>
      </section>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    </div>
  );
}

export default Header;
