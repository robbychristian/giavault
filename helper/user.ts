import { User as IUser } from "../typedefs/user";
import User from "../models/user.model";
import * as bcrypt from "bcrypt";
import { JWTSign } from "../lib/jwt";

export const RegisterApi = async (data: IUser) => {
  try {
    const hashed = await bcrypt.hash(data.password, 10);
    const updated = {
      ...data,
      password: hashed,
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
