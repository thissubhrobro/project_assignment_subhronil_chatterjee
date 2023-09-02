import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import "./App.css";
import axios from "axios";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string().required("Name is required"),
  age: Yup.number()
    .positive("Age must be positive")
    .integer("Age must be an integer")
    .required("Age is required"),
  instituteName: Yup.string().required("Institute Name is required"),
  courseName: Yup.string().required("Course Name is required"),
  canadaInstituteName: Yup.string().required(
    "Canada Institute Name is required"
  ),
  canadaProgramName: Yup.string().required("Canada Program Name is required"),
  countryFrom: Yup.string().required("Country From is required"),
  englishListening: Yup.string().required("Listening score is required"),
  englishSpeaking: Yup.string().required("Speaking score is required"),
  englishReading: Yup.string().required("Reading score is required"),
  englishWriting: Yup.string().required("Writing score is required"),
  highLevelEducation: Yup.string().required("Favorite Color is required"),
  futureGoals: Yup.string().required("Future Goals are required"),
  tuitionPayment: Yup.string().required("Please select Yes or No"),
  tuitionAmount: Yup.string().required("Tuition Amount is required"),
  gic: Yup.string().required("Please select Yes or No"),
  gicAmount: Yup.string().required("Tuition Amount is required"),
  jobDetails: Yup.string().required("Please provide job details"),
});

const serverUrl = `http://localhost:5173/test`;

const App = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      age: "",
      instituteName: "",
      courseName: "",
      canadaInstituteName: "",
      canadaProgramName: "",
      countryFrom: "",
      englishListening: "",
      englishSpeaking: "",
      englishReading: "",
      englishWriting: "",
      highLevelEducation: "",
      futureGoals: "",
      tuitionPayment: "",
      tuitionAmount: "",
      gic: "",
      gicAmount: "",
      jobDetails: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("values after submitting", values);
      alert("Thanks for submitting");
      try {
        const response = await axios.post(serverUrl, values);

        if (response.status === 200) {
          // Display a success message to the user
          alert("Form submitted successfully. An email has been sent.");
          // You can also reset the form here if needed.
        } else {
          alert("Form submission failed. Please try again later.");
        }
      } catch (error) {
        console.error("Error submitting form: " + error);
        // alert("Form submission failed. Please try again later.");
      }
      formik.resetForm();
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{ my: 2 }}>
        SOP Generation Tool UI:
      </Typography>
      <Grid
        container
        sx={{ my: 3, bgcolor: "#fff", p: 3, borderRadius: 5, boxShadow: 3 }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formik.values.age}
                onChange={formik.handleChange}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Highest Level of Education</InputLabel>
                <Select
                  name="highLevelEducation"
                  value={formik.values.highLevelEducation}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.highLevelEducation &&
                    Boolean(formik.errors.highLevelEducation)
                  }
                >
                  <MenuItem value="">
                    <em>Choose</em>
                  </MenuItem>
                  <MenuItem value="Grade 12">Grade 12</MenuItem>
                  <MenuItem value="Diploma">Diploma</MenuItem>
                  <MenuItem value="Bachelors Degree">Bachelors Degree</MenuItem>
                  <MenuItem value="Masters Degree">Masters Degree</MenuItem>
                  <MenuItem value="PhD">PhD</MenuItem>
                </Select>
              </FormControl>
              {formik.touched.highLevelEducation &&
              formik.errors.highLevelEducation ? (
                <div className="error">{formik.errors.highLevelEducation}</div>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Institute where you completed your highest level of education"
                name="instituteName"
                value={formik.values.instituteName}
                onChange={formik.handleChange}
                error={
                  formik.touched.instituteName &&
                  Boolean(formik.errors.instituteName)
                }
                helperText={
                  formik.touched.instituteName && formik.errors.instituteName
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="What did you study"
                name="courseName"
                value={formik.values.courseName}
                onChange={formik.handleChange}
                error={
                  formik.touched.courseName && Boolean(formik.errors.courseName)
                }
                helperText={
                  formik.touched.courseName && formik.errors.courseName
                }
              />
            </Grid>
            <FormControl component="fieldset">
              <Box sx={{ my: 2 }}>
                <Typography variant="body1" sx={{ px: 3, my: 2 }}>
                  Do you have any relevant work experience?
                  <br />
                  <em>
                    Write None if no work experience. Provide the following
                    details if yes:
                    <br />
                    1. Job Title
                    <br />
                    2. Company Name
                    <br />
                    3. Job duties
                    <br />
                    Sample Answer: I worked as a Sales Manager at Effizient
                    Immigration Inc from Jan 2022 till Feb 2023. In this role, I
                    managed sales operations, reaching out to leads, lead the
                    outreach program, ensured meeting monthly targets.
                  </em>
                </Typography>
              </Box>
            </FormControl>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Job Details"
                name="jobDetails"
                value={formik.values.jobDetails}
                onChange={formik.handleChange}
                error={
                  formik.touched.jobDetails && Boolean(formik.errors.jobDetails)
                }
                helperText={
                  formik.touched.jobDetails && formik.errors.jobDetails
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="What institute did you get admitted to in Canada"
                name="canadaInstituteName"
                value={formik.values.canadaInstituteName}
                onChange={formik.handleChange}
                error={
                  formik.touched.canadaInstituteName &&
                  Boolean(formik.errors.canadaInstituteName)
                }
                helperText={
                  formik.touched.canadaInstituteName &&
                  formik.errors.canadaInstituteName
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="What is your program of study in Canada"
                name="canadaProgramName"
                value={formik.values.canadaProgramName}
                onChange={formik.handleChange}
                error={
                  formik.touched.canadaProgramName &&
                  Boolean(formik.errors.canadaProgramName)
                }
                helperText={
                  formik.touched.canadaProgramName &&
                  formik.errors.canadaProgramName
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Which country are you applying from"
                name="countryFrom"
                value={formik.values.countryFrom}
                onChange={formik.handleChange}
                error={
                  formik.touched.countryFrom &&
                  Boolean(formik.errors.countryFrom)
                }
                helperText={
                  formik.touched.countryFrom && formik.errors.countryFrom
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={4}
                label="What are your future goals?"
                name="futureGoals"
                value={formik.values.futureGoals}
                onChange={formik.handleChange}
                error={
                  formik.touched.futureGoals &&
                  Boolean(formik.errors.futureGoals)
                }
                helperText={
                  formik.touched.futureGoals && formik.errors.futureGoals
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="English Scores - Listening"
                name="englishListening"
                value={formik.values.englishListening}
                onChange={formik.handleChange}
                error={
                  formik.touched.englishListening &&
                  Boolean(formik.errors.englishListening)
                }
                helperText={
                  formik.touched.englishListening &&
                  formik.errors.englishListening
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="English Scores - Reading"
                name="englishReading"
                value={formik.values.englishReading}
                onChange={formik.handleChange}
                error={
                  formik.touched.englishReading &&
                  Boolean(formik.errors.englishReading)
                }
                helperText={
                  formik.touched.englishReading && formik.errors.englishReading
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="English Scores - Speaking"
                name="englishSpeaking"
                value={formik.values.englishSpeaking}
                onChange={formik.handleChange}
                error={
                  formik.touched.englishSpeaking &&
                  Boolean(formik.errors.englishSpeaking)
                }
                helperText={
                  formik.touched.englishSpeaking &&
                  formik.errors.englishSpeaking
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="English Scores - Writing"
                name="englishWriting"
                value={formik.values.englishWriting}
                onChange={formik.handleChange}
                error={
                  formik.touched.englishWriting &&
                  Boolean(formik.errors.englishWriting)
                }
                helperText={
                  formik.touched.englishWriting && formik.errors.englishWriting
                }
              />
            </Grid>

            <FormControl component="fieldset" sx={{ px: 2, my: 2 }}>
              <Typography>Did you pay your first year tuition?</Typography>
              <RadioGroup
                name="tuitionPayment"
                value={formik.values.tuitionPayment}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  className="radio-button"
                  value="Yes"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  className="radio-button"
                  value="No"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
              {formik.touched.tuitionPayment && formik.errors.tuitionPayment ? (
                <div style={{ color: "red" }}>
                  {formik.errors.tuitionPayment}
                </div>
              ) : null}
            </FormControl>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="How much tuition fee did you pay?"
                name="tuitionAmount"
                value={formik.values.tuitionAmount}
                onChange={formik.handleChange}
                error={
                  formik.touched.tuitionAmount &&
                  Boolean(formik.errors.tuitionAmount)
                }
                helperText={
                  formik.touched.tuitionAmount && formik.errors.tuitionAmount
                }
              />
            </Grid>

            <FormControl component="fieldset" sx={{ px: 2, my: 2 }}>
              <Typography>Did you do a GIC?</Typography>
              <RadioGroup
                name="gic"
                value={formik.values.gic}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  className="radio-button"
                  value="Yes"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  className="radio-button"
                  value="No"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
              {formik.touched.gic && formik.errors.gic ? (
                <div style={{ color: "red" }}>{formik.errors.gic}</div>
              ) : null}
            </FormControl>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="How much did you pay towards GIC?"
                name="gicAmount"
                value={formik.values.gicAmount}
                onChange={formik.handleChange}
                error={
                  formik.touched.gicAmount && Boolean(formik.errors.gicAmount)
                }
                helperText={formik.touched.gicAmount && formik.errors.gicAmount}
              />
            </Grid>

            <Grid item xs={12} align="center" sx={{ mb: 3 }}>
              <Button
                className="submit-button"
                type="submit"
                onClick={formik.submitForm}
                variant="contained"
                color="primary"
                // disabled={!formik.isValid}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default App;
