import React, {
  useState
} from "react";

import {

  Typography,

  Stepper,

  Step,

  StepLabel,

  Button,

  TextField,

  Grid,

  Paper,

  RadioGroup,

  FormControlLabel,

  Checkbox,

  Radio,

  Box

} from "@mui/material";

import {

  Formik,

  Form

} from "formik";

import * as Yup
from "yup";

import axios
from "axios";

import {

  useParams,

  useHistory

} from "react-router";

import {

  toast

} from "react-toastify";

import AppConfig
from "../../App/constants/config";

import dayjs
from "dayjs";

import {

  LocalizationProvider

} from "@mui/x-date-pickers/LocalizationProvider";

import {

  AdapterDayjs

} from "@mui/x-date-pickers/AdapterDayjs";

import {

  DatePicker

} from "@mui/x-date-pickers/DatePicker";

const steps = [

  "Medical History",

  "Family History",

  "Payment"

];

const validationSchema =
  Yup.object({

    consent:

  Yup.boolean()

  .oneOf(
    [true],
    "Consent is required"
  ),

    currentIllnessHistory:
      Yup.string()
      .required(
        "Required"
      ),

    surgery:
      Yup.string()
      .required(
        "Required"
      ),

    surgeryStartDate:
      Yup.date()
      .required(
        "Required"
      ),

    surgeryEndDate:
      Yup.date()
      .required(
        "Required"
      ),

    diabeticStatus:
      Yup.string()
      .required(
        "Required"
      ),

    allergies:
      Yup.string()
      .required(
        "Required"
      ),

    others:
      Yup.string()
      .required(
        "Required"
      ),

    transactionId:
      Yup.string()
      .required(
        "Required"
      )

  });

function ConsultationForm() {

  const history =
    useHistory();

  const { doctorId } =
    useParams();

  const [activeStep,
    setActiveStep] =
    useState(0);

  const stepFields = {

    0: [

      "currentIllnessHistory",

      "surgery",

      "surgeryStartDate",

      "surgeryEndDate"

    ],

    1: [

      "diabeticStatus",

      "allergies",

      "others"

    ],

    2: [

  "transactionId",

  "consent"

]

  };

  const handleNext =
    () => {

    setActiveStep(
      (prev) => prev + 1
    );

  };

  const handleBack =
    () => {

    setActiveStep(
      (prev) => prev - 1
    );

  };

  return (

    <Formik

      initialValues={{

        consent: false,

        currentIllnessHistory:
          "",

        surgery:
          "",

        surgeryStartDate:
          null,

        surgeryEndDate:
          null,

        diabeticStatus:
          "Non-Diabetic",

        allergies:
          "",

        others:
          "",

        transactionId:
          ""

      }}

      validationSchema={
        validationSchema
      }

      onSubmit={
        async (
          values
        ) => {

        try {

          const token =
            localStorage.getItem(
              "patientToken"
            );

          const payload = {

            doctorId,

            ...values

          };

          const { data } =
            await axios.post(

              `${AppConfig.baseUrl}/consultation/create`,

              payload,

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

          toast.success(
            "Consultation submitted successfully"
          );

          history.push(
            "/my-consultations"
          );

        } catch (error) {

          console.log(error);

          toast.error(
            "Submission failed"
          );

        }

      }}

    >

      {({

        values,

        handleChange,

        touched,

        errors,

        validateForm,

        setFieldTouched,

        setFieldValue

      }) => (

        <Form>
          <Paper
            style={{
              padding: 30,
              borderRadius: 20
            }}
          >

            <Stepper
              activeStep={
                activeStep
              }
              alternativeLabel
            >

              {steps.map(
                (label) => (

                <Step
                  key={label}
                >

                  <StepLabel>
                    {label}
                  </StepLabel>

                </Step>

              ))}

            </Stepper>

            <Box mt={5}>

              {/* STEP 1 */}

              {activeStep === 0 && (

                <Grid
                  container
                  spacing={3}
                >

                  <Grid
                    item
                    xs={12}
                  >

                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Current Illness History"
                      name="currentIllnessHistory"
                      value={
                        values.currentIllnessHistory
                      }
                      onChange={
                        handleChange
                      }
                      error={
                        touched.currentIllnessHistory &&
                        Boolean(
                          errors.currentIllnessHistory
                        )
                      }
                      helperText={
                        touched.currentIllnessHistory &&
                        errors.currentIllnessHistory
                      }
                    />

                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >

                    <TextField
                      fullWidth
                      label="Recent Surgery"
                      name="surgery"
                      value={
                        values.surgery
                      }
                      onChange={
                        handleChange
                      }
                      error={
                        touched.surgery &&
                        Boolean(
                          errors.surgery
                        )
                      }
                      helperText={
                        touched.surgery &&
                        errors.surgery
                      }
                    />

                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={6}
                  >

                    <LocalizationProvider
                      dateAdapter={
                        AdapterDayjs
                      }
                    >

                      <DatePicker

                        label="Surgery Start Date"

                        renderInput={(params) => (
    <TextField {...params} fullWidth />
  )}

                        value={
                          values.surgeryStartDate
                            ? dayjs(
                                values.surgeryStartDate
                              )
                            : null
                        }

                        onChange={(value) => {

                          setFieldValue(
                            "surgeryStartDate",
                            value
                          );

                        }}

                        slotProps={{

                          textField: {

                            fullWidth: true,

                            error:
                              touched.surgeryStartDate &&
                              Boolean(
                                errors.surgeryStartDate
                              ),

                            helperText:
                              touched.surgeryStartDate &&
                              errors.surgeryStartDate

                          }

                        }}

                      />

                    </LocalizationProvider>

                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={6}
                  >

                    <LocalizationProvider
                      dateAdapter={
                        AdapterDayjs
                      }
                    >

                      <DatePicker

                        label="Surgery End Date"

                        renderInput={(params) => (
    <TextField {...params} fullWidth />
  )}

                        value={
                          values.surgeryEndDate
                            ? dayjs(
                                values.surgeryEndDate
                              )
                            : null
                        }

                        onChange={(value) => {

                          setFieldValue(
                            "surgeryEndDate",
                            value
                          );

                        }}

                        slotProps={{

                          textField: {

                            fullWidth: true,

                            error:
                              touched.surgeryEndDate &&
                              Boolean(
                                errors.surgeryEndDate
                              ),

                            helperText:
                              touched.surgeryEndDate &&
                              errors.surgeryEndDate

                          }

                        }}

                      />

                    </LocalizationProvider>

                  </Grid>

                </Grid>

              )}

              {/* STEP 2 */}

              {activeStep === 1 && (

                <Grid
                  container
                  spacing={3}
                >

                  <Grid
                    item
                    xs={12}
                  >

                    <Typography
                      gutterBottom
                    >

                      Diabetic Status

                    </Typography>

                    <RadioGroup
                      row
                      name="diabeticStatus"
                      value={
                        values.diabeticStatus
                      }
                      onChange={
                        handleChange
                      }
                    >

                      <FormControlLabel
                        value="Diabetic"
                        control={<Radio />}
                        label="Diabetic"
                      />

                      <FormControlLabel
                        value="Non-Diabetic"
                        control={<Radio />}
                        label="Non-Diabetic"
                      />

                    </RadioGroup>

                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >

                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Any Allergies"
                      name="allergies"
                      value={
                        values.allergies
                      }
                      onChange={
                        handleChange
                      }
                      error={
                        touched.allergies &&
                        Boolean(
                          errors.allergies
                        )
                      }
                      helperText={
                        touched.allergies &&
                        errors.allergies
                      }
                    />

                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >

                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Others"
                      name="others"
                      value={
                        values.others
                      }
                      onChange={
                        handleChange
                      }
                      error={
                        touched.others &&
                        Boolean(
                          errors.others
                        )
                      }
                      helperText={
                        touched.others &&
                        errors.others
                      }
                    />

                  </Grid>

                </Grid>

              )}

              {/* STEP 3 */}

{activeStep === 2 && (

  <div>

    <Paper
      elevation={2}
      style={{
        padding: 30,
        borderRadius: 20
      }}
    >

      <Grid
        container
        spacing={4}
        alignItems="center"
      >

        {/* LEFT SECTION */}

        <Grid
          item
          xs={12}
          md={6}
          style={{
            borderRight:
              window.innerWidth > 900
                ? "1px solid #ddd"
                : "none"
          }}
        >

          <Typography
            variant="h6"
            align="center"
            gutterBottom
            style={{
              fontWeight: 600
            }}
          >

            Scan and Pay using
            UPI App

          </Typography>

          <div
            style={{
              textAlign:
                "center",
              marginTop: 20
            }}
          >

            <img

              src="https://s3.ap-south-1.amazonaws.com/shopkya-data-staging/shops/Daily%20needsQR.jpeg"

              alt="QR"

              style={{

                width: 220,

                height: 220,

                objectFit:
                  "contain",

                border:
                  "1px solid #ddd",

                padding: 10,

                borderRadius: 10

              }}

            />

          </div>

          <Typography
            align="center"
            style={{
              marginTop: 25,
              fontWeight: 700,
              fontSize: 18
            }}
          >

            UPI ID :
            {" "}
            doctor@upi

          </Typography>

        </Grid>

        {/* RIGHT SECTION */}

        <Grid
          item
          xs={12}
          md={6}
        >

          <Typography
            variant="h6"
            gutterBottom
            style={{
              fontWeight: 600
            }}
          >

            Pay Using Any App

          </Typography>

          <Typography
            variant="h3"
            style={{
              fontWeight: 700,
              color: "#1A237E",
              marginTop: 15
            }}
          >

            ₹ 600

          </Typography>

          <Typography
            style={{
              marginTop: 10,
              marginBottom: 30,
              fontWeight: 500
            }}
          >

            (After Payment)

          </Typography>

          <TextField

            fullWidth

            label="Enter Transaction ID"

            name="transactionId"

            value={
              values.transactionId
            }

            onChange={
              handleChange
            }

            error={
              touched.transactionId &&
              Boolean(
                errors.transactionId
              )
            }

            helperText={
              touched.transactionId &&
              errors.transactionId
            }

          />

        </Grid>

      </Grid>

      {/* CONSENT SECTION */}

      <div
        style={{
          marginTop: 40,
          borderTop:
            "1px solid #ddd",
          paddingTop: 30
        }}
      >

        <Typography
          variant="h6"
          gutterBottom
          style={{
            fontWeight: 600
          }}
        >

          CONSENT FOR ONLINE
          CONSULTATION

        </Typography>

        <Typography
          style={{
            lineHeight: 1.9,
            color: "#555",
            marginTop: 15,
            marginBottom: 20
          }}
        >

          I HAVE UNDERSTOOD
          THAT THIS IS AN
          ONLINE CONSULTATION
          WITHOUT A PHYSICAL
          CHECKUP OF MY
          SYMPTOMS.
          THE DOCTOR HENCE
          RELIES ON MY
          DESCRIPTION OF THE
          PROBLEM OR SCANNED
          REPORTS PROVIDED
          BY ME.
          WITH THIS
          UNDERSTANDING,
          I HEREBY GIVE MY
          CONSENT FOR ONLINE
          CONSULTATION.

        </Typography>

        <FormControlLabel

          control={

            <Checkbox

              checked={
                values.consent
              }

              onChange={(e) => {

                setFieldValue(

                  "consent",

                  e.target.checked

                );

              }}

            />

          }

          label="YES, I ACCEPT"

        />

        {touched.consent &&
          errors.consent && (

          <Typography
            color="error"
            variant="body2"
          >

            {
              errors.consent
            }

          </Typography>

        )}

      </div>

    </Paper>

  </div>

)}

              {/* BUTTONS */}

              <div
                style={{

                  marginTop: 40,

                  display: "flex",

                  justifyContent:
                    "space-between"

                }}
              >

                <Button
                  disabled={
                    activeStep === 0
                  }
                  onClick={
                    handleBack
                  }
                >

                  Back

                </Button>

                {activeStep ===
                steps.length - 1 ? (

                    <>

                        <Button

  variant="contained"

  color="primary"

  onClick={

    async () => {

    const currentFields =
      stepFields[2];

    const validationErrors =
      await validateForm();

    const hasErrors =
      currentFields.some(
        (field) =>
          validationErrors[
            field
          ]
      );

    if (hasErrors) {

      currentFields.forEach(
        (field) => {

        setFieldTouched(
          field,
          true
        );

      });

      return;

    }

    document
      .querySelector("form")
      .requestSubmit();

  }}

>

  Submit Consultation

</Button>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >

                    Submit Consultation

                  </Button> */}

                    </>

                  

                ) : (

                  <Button

                    variant="contained"

                    color="primary"

                    onClick={

                      async () => {

                      const currentFields =
                        stepFields[
                          activeStep
                        ];

                      const validationErrors =
                        await validateForm();

                      const hasErrors =
                        currentFields.some(
                          (field) =>
                            validationErrors[
                              field
                            ]
                        );

                      if (hasErrors) {

                        currentFields.forEach(
                          (field) => {

                          setFieldTouched(
                            field,
                            true
                          );

                        });

                        return;

                      }

                      handleNext();

                    }}

                  >

                    Next

                  </Button>

                )}

              </div>

            </Box>

          </Paper>

        </Form>

      )}

    </Formik>

  );

}

export default ConsultationForm;