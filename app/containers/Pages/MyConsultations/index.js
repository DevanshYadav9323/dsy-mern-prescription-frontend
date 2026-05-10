// import React, {
//   useEffect,
//   useState
// } from "react";

// import axios from "axios";

// import {
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Chip
// } from "@mui/material";

// import AppConfig
// from "../../App/constants/config";

// function MyConsultations() {

//   const [consultations,
//     setConsultations] =
//     useState([]);

//   useEffect(() => {

//     fetchConsultations();

//   }, []);

//   const fetchConsultations =
//     async () => {

//     try {

//       const token =
//         localStorage.getItem(
//           "token"
//         );

//       const { data } =
//         await axios.get(

//           `${AppConfig.baseUrl}/consultation/my-consultations`,

//           {
//             headers: {
//               authorization:
//                 `Bearer ${token}`
//             }
//           }

//         );

//       setConsultations(
//         data.data
//       );

//     } catch (error) {

//       console.log(error);

//     }

//   };

//   return (

//     <div>

//       <Grid
//         container
//         spacing={3}
//       >

//         {consultations.map(
//           (item) => (

//           <Grid
//             item
//             xs={12}
//             md={6}
//             key={item._id}
//           >

//             <Card>

//               <CardContent>

//                 <Typography
//                   variant="h6"
//                 >

//                   Dr. {
//                     item.doctor?.name
//                   }

//                 </Typography>

//                 <Typography>

//                   {
//                     item.currentIllnessHistory
//                   }

//                 </Typography>

//                 <Typography
//                   sx={{
//                     mt: 2
//                   }}
//                 >

//                   Transaction ID:
//                   {" "}
//                   {
//                     item.transactionId
//                   }

//                 </Typography>

//                 <Chip

//   label={
//     item.status
//   }

//   sx={{

//     mt: 2,

//     backgroundColor:

//       item.status === "Completed"

//         ? "#4CAF50"

//         : "#FF9800",

//     color: "#fff",

//     fontWeight: 600

//   }}

// />

//               </CardContent>

//             </Card>

//           </Grid>

//         ))}

//       </Grid>

//     </div>

//   );

// }

// export default MyConsultations;


import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Box,
  Button
} from "@mui/material";

import {
  useHistory
} from "react-router";

import AppConfig
from "../../App/constants/config";

function MyConsultations() {

  const history =
    useHistory();

  const [consultations,
    setConsultations] =
    useState([]);

  useEffect(() => {

    fetchConsultations();

  }, []);

  const fetchConsultations =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const { data } =
        await axios.get(

          `${AppConfig.baseUrl}/consultation/my-consultations`,

          {
            headers: {
              authorization:
                `Bearer ${token}`
            }
          }

        );

      setConsultations(
        data.data || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  /*
  =========================================
  EMPTY STATE
  =========================================
  */

  if (
    consultations.length === 0
  ) {

    return (

      <Box

        sx={{

          minHeight: "60vh",

          display: "flex",

          flexDirection: "column",

          justifyContent: "center",

          alignItems: "center",

          textAlign: "center",

          padding: 3

        }}

      >

        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
        >

          No Consultations Yet

        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 500,
            mb: 4
          }}
        >

          You haven’t consulted
          any doctor yet.
          Start by exploring
          available doctors
          and book your first
          consultation.

        </Typography>

        <Button

          variant="contained"

          size="large"

          onClick={() => {

            history.push(
              "/doctors"
            );

          }}

        >

          Consult A Doctor

        </Button>

      </Box>

    );

  }

  return (

    <div>

      <Grid
        container
        spacing={3}
      >

        {consultations.map(
          (item) => (

          <Grid
            item
            xs={12}
            md={6}
            key={item._id}
          >

            <Card

              elevation={3}

              sx={{

                borderRadius: "18px",

                transition:
                  "0.3s",

                "&:hover": {

                  transform:
                    "translateY(-4px)",

                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.12)"

                }

              }}

            >

              <CardContent>

                <Box

                  sx={{

                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "center",

                    mb: 2

                  }}

                >

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >

                    Dr. {
                      item.doctor?.name
                    }

                  </Typography>

                  <Chip

                    label={
                      item.status
                    }

                    sx={{

                      backgroundColor:

                        item.status ===
                        "Completed"

                          ? "#4CAF50"

                          : "#FF9800",

                      color: "#fff",

                      fontWeight: 600

                    }}

                  />

                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2
                  }}
                >

                  {
                    item.doctor?.specialty
                  }

                </Typography>

                <Box
                  sx={{
                    mb: 2
                  }}
                >

                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    gutterBottom
                  >

                    Current Illness

                  </Typography>

                  <Typography
                    variant="body2"
                  >

                    {
                      item.currentIllnessHistory
                    }

                  </Typography>

                </Box>

                <Box
                  sx={{
                    mb: 2
                  }}
                >

                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    gutterBottom
                  >

                    Transaction ID

                  </Typography>

                  <Typography
                    variant="body2"
                  >

                    {
                      item.transactionId
                    }

                  </Typography>

                </Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >

                  Submitted on{" "}

                  {

                    new Date(
                      item.createdAt
                    ).toLocaleDateString()

                  }

                </Typography>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </div>

  );

}

export default MyConsultations;