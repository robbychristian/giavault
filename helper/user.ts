import { User as IUser } from "../typedefs/user";
import User from "../models/user.model";
import * as bcrypt from "bcrypt";
import { JWTSign } from "../lib/jwt";
import { Query } from "../typedefs/query";

export const RegisterApi = async (data: IUser) => {
  try {
    const hashed = await bcrypt.hash(data.password, 10);
    const secQuestions = [];
    console.log("data.securityQuestions", data.securityQuestions);
    if (data.securityQuestions && data.securityQuestions.length > 1) {
      for (let question of data?.securityQuestions) {
        secQuestions.push({ ...question, answer: await bcrypt.hash(question.answer, 10) });
      }
    }
    // console.log("secQuestions", secQuestions);
    const updated = {
      ...data,
      password: hashed,
      securityQuestions: secQuestions.length > 1 ? secQuestions : null,
    };
    await User.updateOne(updated, updated, { upsert: true });
    return { status: true, code: null };
  } catch (e: any) {
    return { status: false, code: e?.code };
  }
};

export const LoginApi = async (data: Partial<IUser>) => {
  try {
    const { username, password } = data;
    const { password: docPass, role } = await User.findOne({ username });
    if (!docPass) return false;
    const isMatch = await bcrypt.compare(password as string, docPass);
    if (!isMatch) return false;
    const jwtToken = JWTSign({ username, role });
    await User.findOneAndUpdate({ username }, { lastLogin: new Date().toISOString() });
    return jwtToken;
  } catch (e) {
    console.log("e", e);
    return false;
  }
};

export const getUsers = async (query: Query) => {
  try {
    const { limit, page, search } = query;
    return await User.aggregate([
      {
        $match: {
          $or: [
            { username: { $regex: search ?? "", $options: "i" } },
            { role: { $regex: search ?? "", $options: "i" } },
            { firstName: { $regex: search ?? "", $options: "i" } },
            { lastName: { $regex: search ?? "", $options: "i" } },
          ],
        },
      },
      {
        $project: {
          password: 0,
          securityQuestions: 0,
        },
      },
    ])
      .limit(+limit)
      .skip(+page)
      .sort({ createdAt: -1 });
  } catch (e) {}
};
