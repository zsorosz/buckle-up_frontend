import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <a href="#">our story</a>
              </li>
              <li>
                <a href="#">our services</a>
              </li>
              <li>
                <a href="#">benefits</a>
              </li>
              <li>
                <a href="#">team</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>support</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Subscription options</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>legal</h4>
            <ul>
              <li>
                <a href="#">terms & conditions</a>
              </li>
              <li>
                <a href="#">privacy policy</a>
              </li>
              <li>
                <a href="#">terms of use</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <a href="#">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
