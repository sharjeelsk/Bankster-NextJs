"use client";

import React, { useEffect, useState } from "react";
import { Autocomplete, Button, TextField, Chip, Slider } from "@mui/material";
import axios from "axios";
import { connect } from "react-redux";
import { setSnackbar } from "../../redux/flags/flagActions";
import { setUser, storeUserType } from "../../redux/user/userActions";
import GetNameModal from "../components/FindCandidates/GetNameModal";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useRouter, useSearchParams } from "next/navigation";

function SendJobEmail(props) {
  const [emails, setEmails] = useState([]);
  const [formValues, setFormValues] = useState({
    title: "",
    minimumSalary: 10,
    maximumSalary: 15,
    minimumExperience: 4,
    maximumExperience: 55,
    country: "India",
    city: "",
    state: "",
    message: "",
    signature: "",
    subject: "",
    // minimumAge:18,
    // maximumAge:18,
    // companyName:"",
    // industry:"",
    // functionalArea:"",
    // companyInfo:"",
    // jobDescription:"",
    // ug:"",
    // pg:"",
    // product:"",
    // rolesAndResponsibilities:[],jobTags:[],desiredProfile:"",workMode:"hybrid",
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const querySearch = searchParams.get("key");

  const getCities = (state) => {
    console.log(state);
    var config = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries/IN/states/${state}/cities`,
      headers: {
        "X-CSCAPI-KEY":
          "cGZ2TlJRcVBmejZ1OHRuOFRNZGd1ZENDa1hKbXVFVDlqVEFvdGxjUA==",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setCities(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const parsedItem = querySearch
    ? JSON.parse(decodeURIComponent(querySearch))
    : null;

  useEffect(() => {
    var config = {
      method: "get",
      url: "https://api.countrystatecity.in/v1/countries/IN/states",
      headers: {
        "X-CSCAPI-KEY":
          "cGZ2TlJRcVBmejZ1OHRuOFRNZGd1ZENDa1hKbXVFVDlqVEFvdGxjUA==",
      },
    };

    axios(config)
      .then(function (response) {
        console.log("stateresposne", response);
        setStates(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    if (parsedItem) {
      setEmails(parsedItem.map((item) => item.email));
    }
  }, []);

  const handleSubmit = () => {
    console.log(formValues, emails);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT}/api/recruiter/sendJobEmail`,
        { ...formValues, emails },
        { headers: { token: props.user.user } }
      )
      .then((res) => {
        console.log(res);
        props.setSnackbar({
          type: "success",
          text: "Email Sent Successfully",
          open: true,
        });
        router.push("/searchcandidates");
      })
      .catch((err) => {
        console.log(err);
        props.setSnackbar({
          type: "error",
          text: "Error in sending mail",
          open: true,
        });
      });
  };

  const saveEmail = (title) => {
    console.log(formValues, emails);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT}/api/recruiter/saveEmails`,
        { ...formValues, emails, title },
        { headers: { token: props.user.user } }
      )
      .then((res) => {
        console.log(res);
        setOpen(false);
        props.setSnackbar({
          type: "success",
          text: "Email Saved Successfully",
          open: true,
        });
        router.push("/searchcandidates");
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
        props.setSnackbar({
          type: "error",
          text: "Error in saving mail",
          open: true,
        });
      });
  };

  const handleSubmit2 = (title) => {
    saveEmail(title);
  };

  return (
    <div>
      <Header id="3" />
      <GetNameModal
        open={open}
        setOpen={setOpen}
        title="Job Email Title"
        description="Enter title with which you want to save your search"
        leftButton="Cancel"
        rightButton="Submit"
        handleSubmit={handleSubmit2}
      />
      <section className="jobemail-head">
        <div className="jobemail shadow-sm">
          <h1>Compose Job Email</h1>
          <section className="mb-4">
            <Autocomplete
              multiple
              limitTags={3}
              id="multiple-limit-tags" //                id="tags-filled"
              value={emails}
              options={[]}
              onChange={(e, val) => setEmails(val)}
              // defaultValue={[tags[13]]}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="filled"
                    label={option}
                    {...getTagProps({ index })}
                    key={index}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Candidate Emails"

                  // placeholder="Enter Candidate Emails"
                />
              )}
            />
          </section>
          <TextField
            onChange={(e) =>
              setFormValues({ ...formValues, subject: e.target.value })
            }
            variant="outlined"
            id="outlined-basic"
            label="Subject"
            fullWidth
            className="my-3"
          />

          <h3>Job Details</h3>
          <TextField
            inputProps={{ maxLength: 30 }}
            value={formValues.title}
            onChange={(e) =>
              setFormValues({ ...formValues, title: e.target.value })
            }
            fullWidth
            variant="outlined"
            id="outlined-basic"
            label="Job Title"
            className="mt-2 mb-3"
          />

          <h4>Minimum Salary (In Lakh)</h4>
          <Slider
            onChange={(ev, value) =>
              setFormValues({ ...formValues, minimumSalary: value })
            }
            value={formValues.minimumSalary}
            min={0}
            max={75}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
          <p className="slider-info">
            Minimum Salary is {formValues.minimumSalary}
          </p>

          <p className="note-text">Maximum Salary is 75+ Lakh</p>

          <h4>Maximum Salary (In Lakh)</h4>
          <Slider
            onChange={(ev, value) =>
              setFormValues({ ...formValues, maximumSalary: value })
            }
            value={formValues.maximumSalary}
            min={0}
            max={75}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
          <p className="slider-info">
            Maximum Salary is {formValues.maximumSalary}
          </p>

          <h4>Minimum Experience (In Years)</h4>
          <Slider
            onChange={(ev, value) =>
              setFormValues({ ...formValues, minimumExperience: value })
            }
            value={formValues.minimumExperience}
            min={0}
            max={30}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
          <p className="slider-info">
            Minimum Experience is {formValues.minimumExperience}
          </p>

          <h4>Maximum Experience (In Years)</h4>
          <Slider
            onChange={(ev, value) =>
              setFormValues({ ...formValues, maximumExperience: value })
            }
            value={formValues.maximumExperience}
            min={0}
            max={30}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
          <p className="slider-info">
            Maximum Experience is {formValues.maximumExperience}
          </p>
          {/* <h3 className="sub-heading">Job Location</h3> */}

          <div className="my-4">
            <Autocomplete
              fullWidth
              onChange={(event, newValue) => {
                getCities(newValue.iso2);
                setFormValues({ ...formValues, state: newValue.name });
              }}
              id="controllable-states-demo"
              options={states}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Select State" />
              )}
            />
          </div>
          <div className="my-4">
            <Autocomplete
              fullWidth
              value={formValues.city}
              onInputChange={(event, newValue) => {
                setFormValues({ ...formValues, city: newValue });
              }}
              id="controllable-states-demo"
              options={cities.map((i) => i.name)}
              //getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Select City" />
              )}
            />
          </div>
          <TextField
            id="filled-multiline-static"
            label="Message"
            multiline
            rows={4}
            onChange={(e) =>
              setFormValues({ ...formValues, message: e.target.value })
            }
            variant="filled"
            fullWidth
            className="my-3"
          />
          <TextField
            id="filled-multiline-static"
            label="Signature"
            multiline
            rows={4}
            onChange={(e) =>
              setFormValues({ ...formValues, signature: e.target.value })
            }
            variant="filled"
            fullWidth
            className="my-3"
          />
          <Button onClick={() => setOpen(true)}>Save Email</Button>
          <Button onClick={() => handleSubmit()} variant="contained">
            Send Email
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
const mapStateToProps = ({ banksterUser }) => {
  return {
    user: banksterUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSnackbar: (obj) => dispatch(setSnackbar(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SendJobEmail);
