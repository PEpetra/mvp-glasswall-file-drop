import React from "react";
import "../App.css";
import logo from "../logo.svg";
import Modal from "./Modal";
import { CSSTransition } from "react-transition-group";
import ProcessFile from "../components/ProcessFile"

const initialState = {
  showModal: false
};

class App extends React.Component {
  state = initialState;

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  };

  handleContainerClick = event => {
    event.stopPropagation();
  };

  render() {
    return (
      <React.Fragment>
        <div className={`app ${this.state.showMenu ? "show-menu" : ""}`}>
          <div className="app-header">
            <div className="app-header-inner">
              <div className="logo"><a href="https://glasswallsolutions.com/" target="blank" ><img src={logo} alt="Logo" height="100" /></a></div>
              <nav>
                <button className="menu-button" onClick={this.toggleMenu}></button>
                <button className="info-button" onClick={this.toggleModal} style={{ display: "none" }}></button>
                <ul className="app-menu-list">
                  <li><a href="https://glasswallsolutions.com/file-drop/">Product Info</a></li>
                  {/* <li><a href="https://glasswall-store.com/">Visit Store</a></li> */}
                  <li><a href="https://glasswallsolutions.com/contact">Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
          <ProcessFile toggleModal={this.toggleModal} />
          <div className="app-footer">
            <div className="app-footer-inner">
              <section className="app-footer-left">
                <div className="logo"><a href="https://glasswallsolutions.com/" target="blank" ><img src={logo} alt="Logo" height="100" /></a></div>
                <span class="copyright">© Copyright 2020 - Glasswall Solutions Ltd. All Rights Reserved</span>
                <div class="social-menu">
                  <a href="https://twitter.com/GlasswallGlobal" target="_blank" rel="noopener noreferrer">
                    <div class="social-icon twitter"></div>
                  </a>
                  <a href="https://www.linkedin.com/company/glasswall-solutions-limited/" target="_blank" rel="noopener noreferrer">
                    <div class="social-icon linkedin"></div>
                  </a>
                  <a href="https://medium.com/glasswall-engineering" target="_blank" rel="noopener noreferrer">
                    <div class="social-icon medium"></div>
                  </a>
                  <a href="https://www.youtube.com/channel/UCfBGg3aM-LqawBCmbToVuCQ" target="_blank" rel="noopener noreferrer">
                    <div class="social-icon youtube"></div>
                  </a>
                </div>
              </section>
              <div className="app-footer-menu">
                <div class="app-footer-menu-title">
                  <a href="https://glasswallsolutions.com/technology/">Technology</a>
                </div>
                <ul>
                  <li><a href="https://glasswallsolutions.com/technology/">d-FIRST</a></li>
                </ul>
              </div>
              <div className="app-footer-menu">
                <div class="app-footer-menu-title">
                  <a href="https://glasswallsolutions.com/products/">Products</a>
                </div>
                <ul>
                  <li><a href="https://glasswallsolutions.com/products/#sdk">SDK</a></li>
                  <li><a href="https://glasswallsolutions.com/products/#email">Email</a></li>
                  <li><a href="https://glasswallsolutions.com/products/#cloud">Cloud</a></li>
                  <li><a href="https://glasswallsolutions.com/products/#appliances">Appliances</a></li>
                  <li><a href="https://glasswallsolutions.com/pricing">Pricing</a></li>
                </ul>
              </div>
              <div className="app-footer-menu">
                <div class="app-footer-menu-title">
                  <a href="https://glasswallsolutions.com/resources/">Resources</a>
                </div>
                <ul>
                  <li><a href="https://glasswallsolutions.com/ceo-blog/">CEO BLog</a></li>
                  <li><a href="https://glasswallsolutions.com/customer-success-stories/">Success Stories</a></li>
                  <li><a href="https://glasswallsolutions.com/threat-intelligence/">Threat Intelligence</a></li>
                  <li><a href="https://medium.com/glasswall-engineering">Tech Blog</a></li>
                </ul>
              </div>
              <div className="app-footer-menu">
                <div class="app-footer-menu-title">
                  <a href="https://glasswallsolutions.com/company/">About Us</a>
                </div>
                <ul>
                  <li><a href="https://glasswallsolutions.com/company/">Company</a></li>
                  <li><a href="https://glasswallsolutions.com/partners/">Partners</a></li>
                  <li><a href="https://glasswallsolutions.com/contact/">Contact</a></li>
                  <li><a href="https://support.glasswallsolutions.com/support/login">Support</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="app-sub-footer">
            <a href="https://glasswallsolutions.com/privacy-policy/">
              <span class="footer__legend__link">
                Read our Privacy Policy -
								</span>
            </a>
            <span class="footer__address">Continental House, Oakridge, West End, Surrey, GU24 9PJ. Tel: +44 (0) 203 814 3890<br /></span>
          </div>
        </div>
        <CSSTransition in={this.state.showModal} timeout={500} classNames="modal" unmountOnExit>
          <Modal onClose={this.toggleModal} containerClick={this.handleContainerClick} key={7} />
        </CSSTransition>
      </React.Fragment>
    );
  }
}

export default App;
