import React from "react";

import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip
} from "@mui/material";

function DoctorProfile() {

  const doctor =
    JSON.parse(
      localStorage.getItem(
        "doctorData"
      )
    );

  if (!doctor) {

    return (

      <Typography>
        Doctor not found
      </Typography>

    );

  }

  return (

    <Grid
      container
      justifyContent="center"
    >

      <Grid
        item
        xs={12}
        md={8}
        lg={6}
      >

        <Card
          sx={{
            borderRadius: 4,
            overflow: "hidden"
          }}
        >

          {/* HEADER */}

          <div

            style={{

              background:
                "linear-gradient(135deg,#283593,#5C6BC0)",

              padding: "40px 20px",

              textAlign: "center",

              color: "#fff"

            }}

          >

            <Avatar

              src={
                doctor.profilePicture
              }

              sx={{

                width: 130,

                height: 130,

                margin:
                  "0 auto 20px auto",

                border:
                  "5px solid #fff"

              }}

            />

            <Typography
              variant="h4"
              fontWeight={800}
            >

              Dr. {doctor.name}

            </Typography>

            <Typography
              sx={{
                mt: 1,
                opacity: 0.9
              }}
            >

              {doctor.specialty}

            </Typography>

          </div>

          {/* DETAILS */}

          <CardContent
            sx={{
              padding: 4
            }}
          >

            <Grid
              container
              spacing={3}
            >

              <Grid
                item
                xs={12}
                md={6}
              >

                <Typography
                  color="textSecondary"
                >

                  Email Address

                </Typography>

                <Typography
                  variant="h6"
                >

                  {doctor.email}

                </Typography>

              </Grid>

              <Grid
                item
                xs={12}
                md={6}
              >

                <Typography
                  color="textSecondary"
                >

                  Phone Number

                </Typography>

                <Typography
                  variant="h6"
                >

                  {doctor.phone}

                </Typography>

              </Grid>

              <Grid
                item
                xs={12}
              >

                <Typography
                  color="textSecondary"
                >

                  Experience

                </Typography>

                <Chip

                  label={`${doctor.experience} Years Experience`}

                  color="primary"

                  sx={{
                    mt: 1,
                    fontSize: 15
                  }}

                />

              </Grid>

            </Grid>

          </CardContent>

        </Card>

      </Grid>

    </Grid>

  );

}

export default DoctorProfile;