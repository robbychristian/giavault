import Typography from "@mui/material/Typography";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { FC } from "react";
import { SecurityQuestionType, User } from "../typedefs/user";

interface ISecQ {
  userData: User;
  indexSec: number;
  setUserData: (data: User) => void;
  shuffledQuestions?: [];
}

const SecurityQuestionList: FC<ISecQ> = ({ indexSec, userData, setUserData, shuffledQuestions }) => (
  <Select
    key={`sel-${indexSec}`}
    labelId={`security-question-label-${indexSec}`}
    fullWidth
    value={userData?.securityQuestions[indexSec].question}
    onChange={(event: SelectChangeEvent) => {
      const setSelectedQuestion = [...(userData?.securityQuestions || [])];
      setSelectedQuestion[indexSec] = { ...userData?.securityQuestions[indexSec], question: event.target.value };
      setUserData({ ...userData, securityQuestions: setSelectedQuestion });
    }}
    disabled={shuffledQuestions ? false : true}
  >
    {shuffledQuestions
      ? shuffledQuestions.map((question: any, index: any) => (
          <MenuItem key={`${question}-${index}`} value={question}>
            <Typography key={`typog-${index}`}>{question}</Typography>
          </MenuItem>
        ))
      : userData.securityQuestions.map((secQ: SecurityQuestionType, index: number) => (
          <MenuItem key={`${secQ.question}-${index}`} value={secQ.question}>
            <Typography key={`typog-${index}`}>{secQ.question}</Typography>
          </MenuItem>
        ))}
  </Select>
);

export default SecurityQuestionList;
