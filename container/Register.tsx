import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../component/Copyright";
import Router from "next/router";
import { IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RegisterClient } from "../helper/userClient";
import { isEmpty } from "../helper/objects";
import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { SecurityQuestions } from "../constants/securityQuestions";
import { User } from "../typedefs/user";
import SecurityQuestionList from "../component/SecurityQuestion";

export default function Registration() {
  const [shuffledQuestions, setShuffledQuestions] = useState<any>(shuffle(SecurityQuestions));
  const [userData, setUserData] = useState<Partial<User> | any>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    securityQuestions: [
      { question: SecurityQuestions[0], answer: "" },
      { question: SecurityQuestions[1], answer: "" },
      { question: SecurityQuestions[2], answer: "" },
    ],
  });
  const [snackbar, setSnackbar] = useState<any>({
    isOpen: false,
    isError: false,
    message: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEmpty(userData)) return setSnackbar({ isOpen: true, isError: true, message: "Check your fields" });
    const res = await RegisterClient(userData);
    setSnackbar(res);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ isOpen: false, isError: false, message: "" });
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // const SecurityQ = ({ indexSec }: any) => (
  //   <Select
  //     key={`sel-${indexSec}`}
  //     labelId={`security-question-label-${indexSec}`}
  //     fullWidth
  //     value={userData?.securityQuestions[indexSec].question}
  //     onChange={(event: SelectChangeEvent) => {
  //       const setSelectedQuestion = [...(userData?.securityQuestions || [])];
  //       setSelectedQuestion[indexSec] = { ...userData?.securityQuestions[indexSec], question: event.target.value };
  //       setUserData({ ...userData, securityQuestions: setSelectedQuestion });
  //     }}
  //   >
  //     {shuffledQuestions.map((question: any, index: any) => (
  //       <MenuItem key={`${question}-${index}`} value={question}>
  //         <Typography key={`typog-${index}`}>{question}</Typography>
  //       </MenuItem>
  //     ))}
  //   </Select>
  // );

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={snackbar.isOpen} autoHideDuration={6000} onClose={handleClose} message={snackbar.message} action={action} />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth id="username" label="Username" name="username" onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
            </Grid>
            {Array(3)
              .fill(null)
              .map((e, index) => {
                return (
                  <>
                    <Grid item xs={12}>
                      <InputLabel id="security-question-label" key={`sec-label-${index}`}>
                        Security Question {index + 1}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12}>
                      <SecurityQuestionList indexSec={index} key={`seq-${index}`} userData={userData} setUserData={setUserData} shuffledQuestions={shuffledQuestions}></SecurityQuestionList>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoFocus
                        key={`field-${index}`}
                        required
                        fullWidth
                        name={`answer-${index}`}
                        label={`Answer ${index + 1}`}
                        type="answer"
                        id={`answer-${index}`}
                        value={userData?.securityQuestions[index].answer || ""}
                        onChange={(e) => {
                          const setSelectedQuestion = [...(userData?.securityQuestions || [])];
                          setSelectedQuestion[index] = { ...userData?.securityQuestions[index], answer: e.target.value };
                          setUserData({ ...userData, securityQuestions: setSelectedQuestion });
                        }}
                      />
                    </Grid>
                  </>
                );
              })}
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={() => Router.push("/")}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
