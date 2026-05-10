import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid
} from "@mui/material";

import {
  useParams
} from "react-router";

import AppConfig
from "../../App/constants/config";

import { toast }
from "react-toastify";

import { useHistory }
from "react-router";

function ConsultationDetails() {

  const { id } =
    useParams();

  const [consultation,
    setConsultation] =
    useState(null);

    const history = useHistory();

  // const [form,
  //   setForm] =
  //   useState({

  //     careToBeTaken: "",

  //     medicines: ""

  //   });

  const [form, setForm] = useState({

  careToBeTaken: "",

  medicines: ""

});

const [existingPrescription,
  setExistingPrescription] =
  useState(null);

  useEffect(() => {

    getConsultation();
    fetchPrescription();

  }, []);

  const getConsultation =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "doctorToken"
        );

      const { data } =
        await axios.get(
          `${AppConfig.baseUrl}/consultation/${id}`,
          {
            headers: {
              authorization:
                `Bearer ${token}`
            }
          }
        );

      setConsultation(
        data.data
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load consultation"
      );

    }

  };

  const fetchPrescription =
  async () => {

  try {

    const token =
      localStorage.getItem(
        "doctorToken"
      );

    const { data } =
      await axios.get(

        `${AppConfig.baseUrl}/prescription/consultation/${id}`,

        {

          headers: {

            authorization:
              `Bearer ${token}`

          }

        }

      );

    if (data.data) {

      setExistingPrescription(
        data.data
      );

      setForm({

        careToBeTaken:
          data.data.careToBeTaken || "",

        medicines:
          data.data.medicines || ""

      });

    }

  } catch (error) {

    console.log(error);

  }

};


  const handleChange =
    (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    });

  };

  const submitPrescription =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "doctorToken"
        );

      const payload = {

        consultationId:
          consultation._id,

        careToBeTaken:
          form.careToBeTaken,

        medicines:
          form.medicines

      };

      const { data } =
        await axios.post(
          `${AppConfig.baseUrl}/prescription/create`,
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

      history.push("/prescriptions")


      toast.success(
        data.message
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to create prescription"
      );

    }

  };

  if (!consultation) {

    return <div>Loading...</div>;

  }

  return (

    <div>

      <Card>

        <CardContent>

          <Grid
            container
            spacing={2}
          >

            <Grid
              item
              xs={12}
            >

              <Typography
                variant="h6"
              >

                Patient:
                {" "}
                {
                  consultation.patient?.name
                }

              </Typography>

            </Grid>

            <Grid
              item
              xs={12}
            >

              <Typography>

                Illness:
                {" "}
                {
                  consultation.currentIllnessHistory
                }

              </Typography>

            </Grid>

            <Grid
              item
              xs={12}
            >

              <Typography>

                Allergies:
                {" "}
                {
                  consultation.allergies
                }

              </Typography>

            </Grid>

            <Grid
              item
              xs={12}
            >

              <Typography>

                Other Details:
                {" "}
                {
                  consultation.others
                }

              </Typography>

            </Grid>

            <Grid
              item
              xs={12}
            >

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Care To Be Taken"
                name="careToBeTaken"
                value={
                  form.careToBeTaken
                }
                onChange={
                  handleChange
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
                rows={4}
                label="Medicines"
                name="medicines"
                value={
                  form.medicines
                }
                onChange={
                  handleChange
                }
              />

            </Grid>

            <Grid
              item
              xs={12}
            >

              <Button
                variant="contained"
                color="primary"
                onClick={
                  submitPrescription
                }
              >

                {/* Create Prescription */}
                {
  existingPrescription
    ? "Update Prescription"
    : "Create Prescription"
}

              </Button>

            </Grid>

          </Grid>

        </CardContent>

      </Card>

    </div>

  );

}

export default ConsultationDetails;