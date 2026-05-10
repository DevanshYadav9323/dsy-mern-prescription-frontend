import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {

  Grid,

  Card,

  CardContent,

  Typography,

  Button,

  Avatar,

  Box

} from "@mui/material";

import {

  useHistory

} from "react-router";

import AppConfig
from "../../App/constants/config";

function Doctors() {

  const history =
    useHistory();

  const [doctors,
    setDoctors] =
    useState([]);

  useEffect(() => {

    getDoctors();

  }, []);

  const getDoctors =
    async () => {

    try {

      const { data } =
        await axios.get(

          `${AppConfig.baseUrl}/doctor/list`

        );

      setDoctors(
        data.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>
      <Grid
        container
        spacing={3}
      >

        {doctors.map(
          (doctor) => (

          <Grid
            item
            xs={12}
            md={4}
            key={doctor._id}
          >

            <Card

              style={{

                borderRadius: 20,

                overflow:
                  "hidden",

                boxShadow:
                  "0 6px 20px rgba(0,0,0,0.08)",

                height: "100%"

              }}

            >

              <CardContent>

                <Box

                  display="flex"

                  flexDirection="column"

                  alignItems="center"

                >

                  <Avatar

                    src={
                      doctor.profilePicture
                    }

                    alt={
                      doctor.name
                    }

                    sx={{

                      width: 110,

                      height: 110,

                      marginBottom: 2,

                      border:
                        "4px solid #A32CDE"

                    }}

                  />

                  <Typography
                    variant="h6"
                    gutterBottom
                  >

                    Dr. {
                      doctor.name
                    }

                  </Typography>

                  <Typography
                    color="textSecondary"
                    gutterBottom
                  >

                    {
                      doctor.specialty
                    }

                  </Typography>

                  <Typography
                    variant="body2"
                  >

                    {
                      doctor.experience
                    }
                    {" "}
                    Years Experience

                  </Typography>

                </Box>

                <Button

                  fullWidth

                  variant="contained"

                  color="primary"

                  sx={{
                    marginTop: 3
                  }}

                  onClick={() => {

                    history.push(

                      `/consult/${doctor._id}`

                    );

                  }}

                >

                  Consult

                </Button>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </div>

  );

}

export default Doctors;