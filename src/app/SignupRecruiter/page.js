"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { Grid, Button, Alert } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import "../style/singuprecruiter.scss";
import { connect } from "react-redux";
import { setUser } from "../../redux/user/userActions";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useForm } from "react-hook-form";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { setLoading } from "../../redux/loading/loadingActions";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Login = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [allPlans, setAllPlans] = useState([]);
  const [plan, setPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [error, setError] = useState("");
  const [candidateTotal, setCandidateTotal] = useState("...");

  const router = useRouter();

  const handleRadioChange = (event) => {
    setPlan(event.target.value);
    if (event.target.value === "Custom") {
      setPaymentMethod("Offline");
    } else if (event.target.value === "Free") {
      setPaymentMethod("Online");
    }
  };
  const openPayModal = (subscription, data) => {
    const options = {
      key: "rzp_live_R0NDdbIKIMSjU7", //rzp_test_BbBTgCM0XfV6iH
      amount: subscription.amount * 100, //  = INR 1
      name: "Bankster India",
      description: "Payment",
      image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
      handler: function (response) {
        console.log(response);
        props.setLoading(true);

        axios
          .post(
            `${process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT}/api/recruiter/signup`,
            {
              email: data.email,
              password: values.password,
              fullName: data.fullName,
              mobileNo: data.mobileNo,
              companyName: data.company,
              designation: data.designation,
              subscriptionId: subscription._id,
              paymentId: response,
            }
          )
          .then((res) => {
            console.log(res);
            setError("");
            props.setLoading(false);
            if (res.data.msg === "success") {
              //setting the user token locally to use it later on any request for recruiter
              props.setUser(res.data.result);
              //navigation to recruiter dashboard
              router.push("/recruiterhome");
            }
          })
          .catch((err) => {
            props.setLoading(false);
            console.log(err);
            if (err.response) {
              if (err.response.data.length > 0) {
                setError(err.response.data);
              }
            }
          });
      },
      prefill: {
        name: "Gaurav",
        contact: "9999999999",
        email: "demo@demo.com",
      },
      notes: {
        address: "some address",
      },
      theme: {
        color: "blue",
        hide_topbar: false,
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT}/api/subscription/allSubscription`
      )
      .then((res) => {
        console.log(res);
        if (res.data.msg === "success") {
          setAllPlans(res.data.result);
          if (res.data.result.length > 0) {
            setPlan(res.data.result[0].name);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT}/api/candidate/getAllCandidatesLength`
      )
      .then((res) => {
        console.log(res);
        setCandidateTotal(res.data.result);
      });
  }, []);

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //signup of recruiter

  const onSubmit = (data) => {
    let subscription = allPlans.filter((item) => item.name === plan)[0];
    console.log(data, subscription);

    //before assigning any plan to recruiter -- verify if recruiter already exist that means all NO requests of signup

    if (paymentMethod === "Offline") {
      props.setLoading(true);
      axios
        .post(
          `${process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT}/api/recruiter/sendVerificationToken`,
          {
            email: data.email,
            password: values.password,
            fullName: data.fullName,
            mobileNo: data.mobileNo,
            companyName: data.company,
            designation: data.designation,
            contactEmail: data.contactEmail,
            contactPhone: data.contactPhone,
            subscriptionId: subscription._id,
            plan: subscription,
            offline: true,
          }
        )
        .then((res) => {
          console.log(res);
          setError("");
          props.setLoading(false);
          if (res.data.msg === "success") {
            //setting the user token locally to use it later on any request for recruiter
            //props.setUser(res.data.result)
            //navigation to recruiter dashboard
            //router.push("/recruiterhome")
            router.push("/verificationmail");
          }
          //commetn added
        })
        .catch((err) => {
          console.log(err);
          props.setLoading(false);
          if (err.response) {
            if (err.response.data.length > 0) {
              setError(err.response.data);
            }
          }
        });
    } else if (plan === "Free") {
      delete subscription._id;
      console.log(subscription);
      props.setLoading(true);

      axios
        .post(
          `${process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT}/api/recruiter/sendVerificationToken`,
          {
            email: data.email,
            password: values.password,
            fullName: data.fullName,
            mobileNo: data.mobileNo,
            companyName: data.company,
            designation: data.designation,
            subscriptionId: "635a98177ca2905a363e4dcb",
            plan: subscription,
          }
        )
        .then((res) => {
          console.log(res);
          props.setLoading(false);
          setError("");
          if (res.data.msg === "success") {
            //setting the user token locally to use it later on any request for recruiter
            //props.setUser(res.data.result)
            //navigation to recruiter dashboard
            router.push("/verificationmail");
          }
        })
        .catch((err) => {
          console.log(err);
          props.setLoading(false);
          if (err.response) {
            if (err.response.data.length > 0) {
              setError(err.response.data);
            }
          }
        });
    } else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT}/api/recruiter/verifyOldUser`,
          {
            email: data.email,
            mobileNo: data.mobileNo,
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.msg === "success") {
            openPayModal(subscription, data);
          }
        })
        .catch((err) => {
          console.log(err);
          props.setLoading(false);
          if (err.response) {
            if (err.response.data.length > 0) {
              setError(err.response.data);
            }
          }
        });
    }
  };

  return (
    <div>
      <section>
        <Header id="4" />
      </section>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Container maxWidth="md" className="main_cont">
            <Box display="" mx="" my="" sx="">
              <Grid container spacing={0}>
                <Grid item xs={12} md={6} sm={12} xm={12}>
                  <h1
                    style={{
                      marginLeft: "5%",
                      fontSize: "3em",
                    }}
                  >
                    Get Access to <br />
                    <span className="primarycolorwh"></span> Candidate <br />{" "}
                    Applications
                  </h1>
                  <h5
                    style={{
                      marginLeft: "5%",
                    }}
                  >
                    By Registering On Our Platform{" "}
                  </h5>
                  {/* <img src="/login.png" alt="" className="logimg"   style={{
                width:'65%',
                marginLeft:'5%'
                
             }} />  */}

                  {allPlans.length > 0
                    ? allPlans.map(
                        (item, index) =>
                          !item.custom && (
                            <div
                              key={index}
                              className="shadow-sm plan-auth-cont"
                            >
                              <h1>{item.name}</h1>
                              <h2>₹{item.amount}/month</h2>
                              {/* <p><TaskAltIcon /> {item.cvAccess} resume access</p>
              <p><TaskAltIcon /> {item.jobPostings} job postings</p> */}
                              {item.features.map((i, ind) => (
                                <p key={ind}>
                                  <TaskAltIcon /> {i}
                                </p>
                              ))}
                            </div>
                          )
                      )
                    : null}
                </Grid>

                <Grid item xs={12} md={6} sm={12} xm={12}>
                  <div className="main_dev">
                    <h1 style={{ marginLeft: "1rem" }}>
                      Recruiter Registeration
                    </h1>
                    <TextField
                      xs={12}
                      md={6}
                      sm={12}
                      xm={12}
                      label="Email"
                      {...register("email", {
                        required: true,
                        pattern:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                      error={errors.email ? true : false}
                      id="outlined-start-adornment"
                      sx={{ m: 1, width: "35ch" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      xs={12}
                      md={6}
                      sm={12}
                      xm={12}
                      label="Full Name"
                      id="outlined-start-adornment"
                      sx={{ m: 1, width: "35ch" }}
                      {...register("fullName", { required: true })}
                      error={errors.fullName ? true : false}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />

                    <FormControl
                      sx={{ m: 1, width: "35ch" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                    <Box display="flex" mx="0.5rem" my="" sx="">
                      <p style={{ marginLeft: "12rem" }}>
                        {" "}
                        <Link href="/forgetpassword?recruiter">
                          Forget Password
                        </Link>{" "}
                      </p>
                    </Box>

                    <TextField
                      {...register("mobileNo", {
                        required: true,
                        maxLength: 10,
                      })}
                      error={errors.mobileNo ? true : false}
                      xs={12}
                      md={6}
                      sm={12}
                      xm={12}
                      label="Mobile Number"
                      // name="numberformat"
                      // type="number"
                      id="outlined-start-adornment"
                      sx={{ m: 1, width: "35ch" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      xs={12}
                      md={6}
                      sm={12}
                      xm={12}
                      label="Company Name"
                      {...register("company", { required: true })}
                      error={errors.company ? true : false}
                      id="outlined-start-adornment"
                      sx={{ m: 1, width: "35ch" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      xs={12}
                      md={6}
                      sm={12}
                      xm={12}
                      label="Designation"
                      {...register("designation", { required: true })}
                      error={errors.designation ? true : false}
                      id="outlined-start-adornment"
                      sx={{ m: 1, width: "35ch" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />

                    <FormControl className="m-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Select Plan
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={plan}
                        onChange={handleRadioChange}
                      >
                        {allPlans.length > 0 &&
                          allPlans.map(
                            (item, index) =>
                              !item.custom && (
                                <FormControlLabel
                                  value={item.name}
                                  control={<Radio />}
                                  label={item.name}
                                  key={index}
                                />
                              )
                          )}
                        <FormControlLabel
                          value={"Custom"}
                          control={<Radio />}
                          label={"Custom"}
                        />
                      </RadioGroup>
                    </FormControl>

                    <FormControl className="m-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Select Payment Method
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <FormControlLabel
                          value="Online"
                          control={
                            <Radio
                              disabled={
                                plan === "Custom" || plan === "Free"
                                  ? true
                                  : false
                              }
                            />
                          }
                          label="Online"
                        />
                        <FormControlLabel
                          value="Offline"
                          control={
                            <Radio disabled={plan === "Free" ? true : false} />
                          }
                          label="Offline"
                        />
                      </RadioGroup>
                    </FormControl>

                    {paymentMethod === "Offline" && (
                      <section className="offline-cont">
                        <TextField
                          {...register("contactEmail")}
                          fullWidth
                          className="my-2"
                          variant="outlined"
                          id="outlined-basic"
                          label="Email"
                        />
                        <TextField
                          {...register("contactPhone")}
                          fullWidth
                          className="my-2"
                          variant="outlined"
                          id="outlined-basic"
                          label="Phone"
                        />
                      </section>
                    )}

                    {error.length > 0 && (
                      <Alert className="alert" severity="error">
                        {error}
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      sx={{ m: 1, width: "42ch" }}
                      variant="contained"
                    >
                      signup
                    </Button>
                    <p
                      style={{
                        marginLeft: "5rem",
                      }}
                    >
                      <Link href="/Loginrecruiter" style={{ color: "#ff3d8b" }}>
                        {" "}
                        Already a user login instead?
                      </Link>
                    </p>
                    <Divider
                      variant="middle"
                      sx={{
                        width: "20rem",
                      }}
                    />

                    <Button
                      variant="outlined"
                      sx={{ m: 1, width: "42ch" }}
                      startIcon={<PersonAddAltIcon />}
                    >
                      <Link href="/signup" style={{ color: "#ff3d8b" }}>
                        {" "}
                        Register as a jobseeker
                      </Link>
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </div>
      </form>

      <Footer />
    </div>
  );
};
const mapStateToProps = ({ banksterUser }) => {
  return {
    user: banksterUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (token) => dispatch(setUser(token)),
    setLoading: (bool) => dispatch(setLoading(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
