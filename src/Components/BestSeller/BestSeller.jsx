import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Video3 from "../Assets/video1.mp4";
import Video2 from "../Assets/video2.mp4";
import Video4 from "../Assets/video3.mp4";
import Video1 from "../Assets/video4.mp4";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const videos = [
  { url: Video1 },
  { url: Video2 },
  { url: Video3 },
  { url: Video4 },
];

const BestSeller = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = videos.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1, mx: "auto", padding: "0 20px" }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 90,
          pl: 2,
          bgcolor: "background.default",
          "@media (max-width: 600px)": {
            height: 70,
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
          {videos[activeStep].title}
        </Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={6000}
      >
        {videos.map((video, index) => (
          <div key={video.url}>
            {Math.abs(activeStep - index) <= 1 ? (
              <Box
                sx={{
                  height: { xs: "250px", sm: "350px", md: "430px" },
                  maxWidth: { xs: "100%", sm: "90%", md: "80%" },
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto",
                  position: "relative",
                }}
              >
                <video
                  src={video.url}
                  autoPlay
                  loop
                  muted
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ) : null}
          </div>
        ))}
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
    </Box>
  );
};

export default BestSeller;
