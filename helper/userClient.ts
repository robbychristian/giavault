import { API } from "../lib/api";
import { User as IUser } from "../typedefs/user";

export const RegisterClient = async (data: IUser) => {
  try {
    const res = await API.post("/api/login", data);
    if (res.status === 201) return { isOpen: true, message: "Success", isError: false };
  } catch (e: any) {
    const {
      response: {
        data: { error },
      },
    } = e;
    return { isOpen: true, message: error, isError: true };
  }
};

export const LoginClient = async (data: Partial<IUser>) => {
  try {
    const res = await API.get("/api/login", {
      params: {
        username: data.username,
        password: data.password,
      },
    });

    return { isOpen: false, message: res, isError: false };
  } catch (e: any) {
    const {
      response: {
        data: { error },
      },
    } = e;
    return { isOpen: true, message: error, isError: true };
  }
};
