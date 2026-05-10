// import React, {
//   useEffect,
//   useState
// } from "react";

// import axios from "axios";

// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Chip,
//   CircularProgress
// } from "@mui/material";

// import AppConfig
// from "../../App/constants/config";

// import { toast }
// from "react-toastify";

// import Button
// from "@mui/material/Button";

// import { useHistory }
// from "react-router";

// function ConsultationData() {

//   const [loading, setLoading] =
//     useState(true);

//   const [consultations,
//     setConsultations] =
//     useState([]);
    
//     const history = useHistory();

//   useEffect(() => {

//     getConsultations();

//   }, []);

//   const getConsultations =
//     async () => {

//     try {

//       const token =
//         localStorage.getItem(
//           "doctorToken"
//         );

//       const { data } =
//         await axios.get(
//           `${AppConfig.baseUrl}/consultation/doctor`,
//           {
//             headers: {
//               authorization:
//                 `Bearer ${token}`
//             }
//           }
//         );

//       if (data.error) {

//         toast.error(
//           data.message
//         );

//         return;

//       }

//       setConsultations(
//         data.data
//       );

//     } catch (error) {

//       console.log(error);

//       toast.error(
//         "Failed to fetch consultations"
//       );

//     } finally {

//       setLoading(false);

//     }

//   };

//   if (loading) {

//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           padding: 50
//         }}
//       >

//         <CircularProgress />

//       </div>
//     );

//   }

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
//             lg={4}
//             key={item._id}
//           >

//             <Card>

//               <CardContent>

//                 <Typography
//                   variant="h6"
//                 >

//                   {item.patient?.name}

//                 </Typography>

//                 <Typography
//                   variant="body2"
//                   color="textSecondary"
//                   gutterBottom
//                 >

//                   {item.patient?.email}

//                 </Typography>

//                 <Typography
//                   variant="body2"
//                 >

//                   <strong>
//                     Illness:
//                   </strong>

//                   {" "}

//                   {
//                     item.currentIllnessHistory
//                   }

//                 </Typography>

//                 <Typography
//                   variant="body2"
//                   sx={{
//                     marginTop: 1
//                   }}
//                 >

//                   <strong>
//                     Allergies:
//                   </strong>

//                   {" "}

//                   {item.allergies}

//                 </Typography>

//                 <Typography
//                   variant="body2"
//                   sx={{
//                     marginTop: 1
//                   }}
//                 >

//                   <strong>
//                     Transaction ID:
//                   </strong>

//                   {" "}

//                   {
//                     item.transactionId
//                   }

//                 </Typography>

//                 <Chip
//                   label={item.status}

//                   color={
//                     item.status ===
//                     "Completed"
//                     ? "success"
//                     : "warning"
//                   }

//                   sx={{
//                     marginTop: 2
//                   }}
//                 />

//                 <Button
//   fullWidth
//   variant="contained"
//   color="primary"
//   sx={{
//     marginTop: 2
//   }}
//   onClick={() => {

//     history.push(
//       `/consultation-details/${item._id}`
//     );

//   }}
// >

//   View Details

// </Button>

//               </CardContent>

//             </Card>

//           </Grid>

//         ))}

//       </Grid>

//     </div>

//   );

// }

// export default ConsultationData;


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
  Chip,
  CircularProgress,
  Box,
  Avatar,
  Button,
  Divider
} from "@mui/material";

import AppConfig
from "../../App/constants/config";

import { toast }
from "react-toastify";

import {
  useHistory
} from "react-router";

function ConsultationData() {

  const [loading, setLoading] =
    useState(true);

  const [consultations,
    setConsultations] =
    useState([]);

  const history =
    useHistory();

  useEffect(() => {

    getConsultations();

  }, []);

  const getConsultations =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "doctorToken"
        );

      const { data } =
        await axios.get(

          `${AppConfig.baseUrl}/consultation/doctor`,

          {
            headers: {
              authorization:
                `Bearer ${token}`
            }
          }

        );

      if (data.error) {

        toast.error(
          data.message
        );

        return;

      }

      setConsultations(
        data.data || []
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch consultations"
      );

    } finally {

      setLoading(false);

    }

  };

  /*
  ========================================
  LOADING
  ========================================
  */

  if (loading) {

    return (

      <Box

        sx={{

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          minHeight: "60vh"

        }}

      >

        <CircularProgress />

      </Box>

    );

  }

  /*
  ========================================
  EMPTY STATE
  ========================================
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

          px: 3

        }}

      >

        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
        >

          No Consultation Requests Yet

        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 550,
            lineHeight: 1.8
          }}
        >

          Once patients start
          requesting consultations,
          their details and medical
          history will appear here
          for review and prescription.

        </Typography>

      </Box>

    );

  }

  return (

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
          lg={4}
          key={item._id}
        >

          <Card

            elevation={0}

            sx={{

              borderRadius: "20px",

              border:
                "1px solid rgba(0,0,0,0.08)",

              transition: "0.25s",

              height: "100%",

              backgroundColor:
                "#fff",

              "&:hover": {

                transform:
                  "translateY(-4px)",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)"

              }

            }}

          >

            <CardContent
              sx={{
                p: 3
              }}
            >

              {/* HEADER */}

              <Box

                sx={{

                  display: "flex",

                  alignItems: "center",

                  justifyContent:
                    "space-between",

                  mb: 3

                }}

              >

                <Box

                  sx={{

                    display: "flex",

                    alignItems: "center",

                    gap: 2

                  }}

                >

                  <Avatar

                    src={
                      item.patient
                        ?.profilePicture
                    }

                    sx={{
                      width: 56,
                      height: 56
                    }}

                  />

                  <Box>

                    <Typography
                      variant="h6"
                      fontWeight={700}
                    >

                      {
                        item.patient?.name
                      }

                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >

                      {
                        item.patient?.email
                      }

                    </Typography>

                  </Box>

                </Box>

                <Chip

                  label={
                    item.status
                  }

                  size="small"

                  sx={{

                    backgroundColor:

                      item.status ===
                      "Completed"

                        ? "#E8F5E9"

                        : "#FFF3E0",

                    color:

                      item.status ===
                      "Completed"

                        ? "#2E7D32"

                        : "#E65100",

                    fontWeight: 600

                  }}

                />

              </Box>

              <Divider
                sx={{
                  mb: 3
                }}
              />

              {/* ILLNESS */}

              <Box
                sx={{
                  mb: 2.5
                }}
              >

                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  sx={{
                    mb: 1
                  }}
                >

                  Current Illness

                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.8
                  }}
                >

                  {
                    item.currentIllnessHistory
                  }

                </Typography>

              </Box>

              {/* ALLERGIES */}

              <Box
                sx={{
                  mb: 2.5
                }}
              >

                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  sx={{
                    mb: 1
                  }}
                >

                  Allergies

                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >

                  {
                    item.allergies
                  }

                </Typography>

              </Box>

              {/* TRANSACTION */}

              <Box
                sx={{
                  mb: 3
                }}
              >

                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  sx={{
                    mb: 1
                  }}
                >

                  Transaction ID

                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >

                  {
                    item.transactionId
                  }

                </Typography>

              </Box>

              {/* FOOTER */}

              <Box

                sx={{

                  display: "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  gap: 2

                }}

              >

                <Typography
                  variant="caption"
                  color="text.secondary"
                >

                  {

                    new Date(
                      item.createdAt
                    ).toLocaleDateString()

                  }

                </Typography>

                <Button

                  variant="outlined"

                  onClick={() => {

                    history.push(

                      `/consultation-details/${item._id}`

                    );

                  }}

                  sx={{

                    borderRadius:
                      "10px",

                    textTransform:
                      "none",

                    fontWeight: 600

                  }}

                >

                  View Details

                </Button>

              </Box>

            </CardContent>

          </Card>

        </Grid>

      ))}

    </Grid>

  );

}

export default ConsultationData;