import React from "react";

import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip
} from "@mui/material";

function PatientProfile() {

  const patient =
    JSON.parse(
      localStorage.getItem(
        "patientData"
      )
    );

  if (!patient) {

    return (

      <Typography>
        Patient not found
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
                "linear-gradient(135deg,#00695C,#26A69A)",

              padding: "40px 20px",

              textAlign: "center",

              color: "#fff"

            }}

          >

            <Avatar

              src={
                patient.profilePicture
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

              {patient.name}

            </Typography>

            <Typography
              sx={{
                mt: 1,
                opacity: 0.9
              }}
            >

              Patient Profile

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

                  {patient.email}

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

                  {patient.phone}

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

                  Age

                </Typography>

                <Chip

                  label={`${patient.age} Years`}

                  color="success"

                  sx={{
                    mt: 1,
                    fontSize: 15
                  }}

                />

              </Grid>

              <Grid
                item
                xs={12}
              >

                <Typography
                  color="textSecondary"
                >

                  History of Surgery

                </Typography>

                <div
                  style={{
                    marginTop: 10
                  }}
                >

                  {patient.surgeryHistory?.map(
                    (item, index) => (

                    <Chip

                      key={index}

                      label={item}

                      sx={{
                        mr: 1,
                        mb: 1
                      }}

                    />

                  ))}

                </div>

              </Grid>

              <Grid
                item
                xs={12}
              >

                <Typography
                  color="textSecondary"
                >

                  History of Illness

                </Typography>

                <div
                  style={{
                    marginTop: 10
                  }}
                >

                  {patient.illnessHistory?.map(
                    (item, index) => (

                    <Chip

                      key={index}

                      label={item}

                      color="warning"

                      sx={{
                        mr: 1,
                        mb: 1
                      }}

                    />

                  ))}

                </div>

              </Grid>

            </Grid>

          </CardContent>

        </Card>

      </Grid>

    </Grid>

  );

}

export default PatientProfile;