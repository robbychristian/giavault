import { User } from "../../typedefs/user";

export function isEmpty(obj: any) {
  for (var i in obj) {
    if (obj[i].length <= 1) return true;
    return validateSecurityQuestions(obj);
  }
  return true;
}

function validateSecurityQuestions({ securityQuestions }: User) {
  if (securityQuestions && securityQuestions?.length < 3) {
    return true; // returns invalid
  }

  for (let questions of securityQuestions) {
    if (questions.question.length <= 1 || questions.answer.length <= 1) {
      return true;
    }
  }
  return false;
}

export function isEmptyNoSec(obj: any) {
  for (var i in obj) {
    if (obj[i].length <= 1) return true;
  }
  return false;
}
