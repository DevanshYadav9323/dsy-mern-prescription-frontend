// import React, {
//   useEffect,
//   useState
// } from "react";

// import axios from "axios";

// import AppConfig from "../../App/constants/config";

// function DashboardData() {

//   const [doctor, setDoctor] =
//     useState(null);

//   useEffect(() => {

//     getProfile();

//   }, []);

//   const getProfile =
//   async () => {

//   try {

//     const token =
//       localStorage.getItem(
//         "doctorToken"
//       );

//     const { data } =
//       await axios.get(
//         `${AppConfig.baseUrl}/doctor/profile`,
//         {
//           headers: {
//             authorization:
//               `Bearer ${token}`
//           }
//         }
//       );

//     setDoctor(data.doctor);

//   } catch (error) {

//     console.log(error);

//   }

// };

// if (!doctor) {

//   return <div>Loading...</div>;

// }

// return (

// <div>

//   <h1>
//     Welcome Dr. {doctor.name}
//   </h1>

//   <p>
//     Specialty:
//     {" "}
//     {doctor.specialty}
//   </p>

//   <p>
//     Experience:
//     {" "}
//     {doctor.experience}
//     {" "}
//     Years
//   </p>

// </div>

// );
// }

// export default DashboardData;


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
  Box,
  Avatar,
  CircularProgress
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

import AppConfig
from "../../App/constants/config";

function DashboardData() {

  const [loading,
    setLoading] =
    useState(true);

  const [dashboard,
    setDashboard] =
    useState(null);

  useEffect(() => {

    getDashboard();

  }, []);

  const getDashboard =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "doctorToken"
        );

      const { data } =
        await axios.get(

          `${AppConfig.baseUrl}/doctor/dashboard`,

          {
            headers: {
              authorization:
                `Bearer ${token}`
            }
          }

        );

      setDashboard(
        data.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <CircularProgress />

      </Box>

    );

  }

  if (!dashboard) {

    return (

      <Typography>
        Failed to load dashboard.
      </Typography>

    );

  }

  const {
    doctor,
    stats,
    chartData
  } = dashboard;

  const pieData = [

    {
      name: "Completed",
      value:
        stats.completedConsultations
    },

    {
      name: "Pending",
      value:
        stats.pendingConsultations
    }

  ];

  
  

  // const COLORS = [
  //   "#4CAF50",
  //   "#FF9800"
  // ];

  const COLORS = [
    "#283593",
    "#EC407A"
  ];

  return (

    <Box>

      {/* HEADER */}

      {/* <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: "24px",
          border:
            "1px solid rgba(0,0,0,0.08)"
        }}
      >

        <CardContent>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3
            }}
          >

            <Avatar
              src={doctor.profilePicture}
              sx={{
                width: 90,
                height: 90
              }}
            />

            <Box>

              <Typography
                variant="h4"
                fontWeight={700}
              >

                Welcome Dr. {doctor.name}

              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >

                {doctor.specialty}

              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >

                {doctor.experience} Years Experience

              </Typography>

            </Box>

          </Box>

        </CardContent>

      </Card> */}

      {/* STATS */}

      <Grid
        container
        spacing={3}
        sx={{ mb: 4 }}
      >

        <Grid item xs={12} md={3}>

          <Card
            elevation={0}
            sx={{
              borderRadius: "20px",
              border:
                "1px solid rgba(0,0,0,0.08)"
            }}
          >

            <CardContent>

              <Typography
                color="text.secondary"
                gutterBottom
              >

                Total Consultations

              </Typography>

              <Typography
                variant="h3"
                fontWeight={700}
              >

                {
                  stats.totalConsultations
                }

              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={3}>

          <Card
            elevation={0}
            sx={{
              borderRadius: "20px",
              border:
                "1px solid rgba(0,0,0,0.08)"
            }}
          >

            <CardContent>

              <Typography
                color="text.secondary"
                gutterBottom
              >

                Completed

              </Typography>

              <Typography
                variant="h3"
                fontWeight={700}
              >

                {
                  stats.completedConsultations
                }

              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={3}>

          <Card
            elevation={0}
            sx={{
              borderRadius: "20px",
              border:
                "1px solid rgba(0,0,0,0.08)"
            }}
          >

            <CardContent>

              <Typography
                color="text.secondary"
                gutterBottom
              >

                Pending

              </Typography>

              <Typography
                variant="h3"
                fontWeight={700}
              >

                {
                  stats.pendingConsultations
                }

              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={3}>

          <Card
            elevation={0}
            sx={{
              borderRadius: "20px",
              border:
                "1px solid rgba(0,0,0,0.08)"
            }}
          >

            <CardContent>

              <Typography
                color="text.secondary"
                gutterBottom
              >

                Prescriptions

              </Typography>

              <Typography
                variant="h3"
                fontWeight={700}
              >

                {
                  stats.totalPrescriptions
                }

              </Typography>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

      {/* CHARTS */}

      <Grid container spacing={3}>

        {/* BAR CHART */}

        <Grid item xs={12} md={8}>

          <Card
            elevation={0}
            sx={{
              borderRadius: "20px",
              border:
                "1px solid rgba(0,0,0,0.08)",
              height: "100%"
            }}
          >

            <CardContent>

              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
              >

                Consultation Activity

              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
              >

                Last 7 days consultations

              </Typography>

              {
                chartData.length > 0
                ? (

                  <ResponsiveContainer
                    width="100%"
                    height={320}
                  >

                    <BarChart
                      data={chartData}
                    >

                      <XAxis
                        dataKey="day"
                      />

                      <Tooltip />

                      <Bar
                        dataKey="consultations"
                        radius={[8,8,0,0]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                )

                : (

                  <Typography>
                    No chart data available.
                  </Typography>

                )
              }

            </CardContent>

          </Card>

        </Grid>

        {/* PIE CHART */}

        <Grid item xs={12} md={4}>

          <Card
            elevation={0}
            sx={{
              borderRadius: "20px",
              border:
                "1px solid rgba(0,0,0,0.08)",
              height: "100%"
            }}
          >

            <CardContent>

              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
              >

                Consultation Status

              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
              >

                Completed vs Pending

              </Typography>

              {
                stats.totalConsultations > 0
                ? (

                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >

                    <PieChart>

                      <Pie
                        data={pieData}
                        innerRadius={70}
                        outerRadius={100}
                        dataKey="value"
                      >

                        {
                          pieData.map(
                            (
                              entry,
                              index
                            ) => (

                              <Cell
                                key={index}
                                fill={COLORS[index]}
                              />

                            )
                          )
                        }

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                )

                : (

                  <Typography>
                    No consultation data available.
                  </Typography>

                )
              }

            </CardContent>

          </Card>

        </Grid>

      </Grid>

    </Box>

  );

}

export default DashboardData;