import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React from "react";
import whatsapp_icon from "../Assets/whatsapp_icon.png";
import "./Footer.css";
// import Fade from "@mui/material/Fade";

import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Emailicon from "../Assets/email.png";

const Footer = () => {
  // const [expanded, setExpanded] = useState(false);

  // const handleExpansion = () => {
  //   setExpanded((prevExpanded) => !prevExpanded);
  // };

  return (
    <div className="footer">
      <div className="footer-logo">
        <p>ShopSJ</p>
      </div>

      {/* Accordion with custom Fade transition */}
      {/* <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 400 }}
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          color: "#fff",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
          aria-controls="collapse-panel-content"
          id="collapse-panel-header"
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Custom transition using Fade
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}

      {/* Accordion with default Collapse transition */}
      <Accordion
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          color: "#fff",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
          aria-controls="collapse-panel-content"
          id="collapse-panel-header"
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Categories
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
            <Link to="/" style={{ textDecoration: "none" }}>
              <h3>ShopNJ</h3>
            </Link>

            <Link to="/mens" style={{ textDecoration: "none" }}>
              <h3>Men</h3>
            </Link>

            <Link to="/womens" style={{ textDecoration: "none" }}>
              <h3>Women</h3>
            </Link>
            <Link to="/kids" style={{ textDecoration: "none" }}>
              <h3>Kids</h3>
            </Link>

            <Link to="/NewCollections" style={{ textDecoration: "none" }}>
              <h3>New Collection</h3>
            </Link>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          color: "#fff",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
          aria-controls="collapse-panel-content"
          id="collapse-panel-header"
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Need Help
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
            <Link to="/returnexchange" style={{ textDecoration: "none" }}>
              <h3>Returns & Exchanges</h3>
            </Link>

            <div className="footer-icons-container">
              <a
                href="https://chat.whatsapp.com/DLS6LXieTArKCTMJs1BM8Y"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>Chat on WhatsApp</h3>
                {/* <img src={whatsapp_icon} alt="WhatsApp Icon" /> */}
              </a>
            </div>
            <Link to="/contactus" style={{ textDecoration: "none" }}>
              <h3>Contact Us</h3>
            </Link>
            {/* <Link to="/tracking" style={{ textDecoration: "none" }}>
              <h3>track</h3>
            </Link> */}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          color: "#fff",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
          aria-controls="collapse-panel-content"
          id="collapse-panel-header"
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Company
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
            <Link to="/shippingpolicy" style={{ textDecoration: "none" }}>
              <h3>Shipping Policy</h3>
            </Link>
            <Link to="/privacypolicy" style={{ textDecoration: "none" }}>
              <h3>Privacy Policy</h3>
            </Link>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          color: "#fff",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
          aria-controls="collapse-panel-content"
          id="collapse-panel-header"
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Get in touch
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
            <div className="footer-social-icons">
              <div className="footer-icons-container">
                <a
                  href="mailto:susuresh158@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={Emailicon} alt="Email Icon" />
                </a>
              </div>
              <div className="footer-icons-container">
                <a
                  href="https://chat.whatsapp.com/DLS6LXieTArKCTMJs1BM8Y"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={whatsapp_icon} alt="WhatsApp Icon" />
                </a>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <div className="footer-copyright">
        <hr />
        <p>Copyright © 2023 - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
