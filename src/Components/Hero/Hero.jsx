import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import kid_icon from "../Assets/kidlisticon.jpg";
import men_icon from "../Assets/menlistcon.jpg";
import new_icon from "../Assets/new.jpg";
import women_icon from "../Assets/womenlisticon.jpg";
import "./Hero.css";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Hero = () => {
  const theme = useTheme();
  const [allwebproducts, setAllwebProducts] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = allwebproducts.length * 3;

  const preloadImage = (src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  };

  const fetchInfo = () => {
    fetch("http://18.234.167.23/allwebproducts")
      .then((res) => res.json())
      .then((data) => setAllwebProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    fetchInfo();

    allwebproducts.forEach((product) => {
      preloadImage(product.webimage1);
      preloadImage(product.webimage2);
      preloadImage(product.webimage3);
    });
  }, [allwebproducts]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const getImageForStep = (product, step) => {
    switch (step % 3) {
      case 0:
        return product.webimage1 || "";
      case 1:
        return product.webimage2 || "";
      case 2:
        return product.webimage3 || "";
      default:
        return "";
    }
  };

  return (
    <>
      <ul className="list_catcategory">
        <li>
          <Link to="/Mens" style={{ textDecoration: "none" }}>
            <img src={men_icon} alt="Men" className="category-icon" />
            <h3 className="category-title">Men</h3>
          </Link>
        </li>
        <li>
          <Link to="/womens" style={{ textDecoration: "none" }}>
            <img src={women_icon} alt="Women" className="category-icon" />
            <h3 className="category-title">Women</h3>
          </Link>
        </li>
        <li>
          <Link to="/kids" style={{ textDecoration: "none" }}>
            <img src={kid_icon} alt="Kid" className="category-icon" />
            <h3 className="category-title">Kid</h3>
          </Link>
        </li>
        <li>
          <Link to="/NewCollections" style={{ textDecoration: "none" }}>
            <img
              src={new_icon}
              alt="New Collections"
              className="category-icon"
            />
            <h3 className="category-title">New Collections</h3>
          </Link>
        </li>
      </ul>
      <div className="boxofview">
        <Box
          sx={{
            maxWidth: "100%",
            flexGrow: 4,
            mx: "auto",
            padding: "0 20px",
            "@media (max-width: 600px)": {
              padding: "0 10px",
            },
          }}
        >
          {allwebproducts.length > 0 ? (
            <>
              <Paper
                square
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: 80,
                  pl: 2,
                  bgcolor: "background.default",
                  "@media (max-width: 600px)": {
                    height: 60,
                    pl: 1,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    "@media (max-width: 600px)": {
                      fontSize: "1rem",
                    },
                  }}
                >
                  {allwebproducts[Math.floor(activeStep / 3)]?.title}
                </Typography>
              </Paper>
              <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                interval={6000}
              >
                {allwebproducts.map((product, index) =>
                  [0, 1, 2].map((subIndex) => (
                    <div key={`${product._id}-${subIndex}`}>
                      {Math.abs(activeStep - (index * 3 + subIndex)) <= 1 ? (
                        <Box
                          component="img"
                          sx={{
                            height: { xs: "250px", sm: "350px", md: "430px" },
                            maxWidth: { xs: "100%", sm: "90%", md: "80%" },
                            objectFit: "cover",
                            display: "block",
                            margin: "0 auto",
                          }}
                          src={getImageForStep(product, subIndex)}
                          alt={product.title || "Product Image"}
                        />
                      ) : null}
                    </div>
                  ))
                )}
              </AutoPlaySwipeableViews>
              <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                    sx={{
                      "@media (max-width: 600px)": {
                        fontSize: "0.75rem",
                      },
                    }}
                  >
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{
                      "@media (max-width: 600px)": {
                        fontSize: "0.75rem",
                      },
                    }}
                  >
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                  </Button>
                }
              />
            </>
          ) : (
            <p>No products available.</p>
          )}
        </Box>
      </div>
    </>
  );
};

export default Hero;
