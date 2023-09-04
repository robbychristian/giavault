import { API } from "@libs/api";
export const printPolicy = async (_id: string, accessToken: string, currentImage: React.MutableRefObject<any>) => {
  try {
    console.log("Printing ID: ", _id);
    const res = await API.get("/api/printing", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { _id },
    });
    currentImage.current = `${process.env.NEXT_API_URL}/static/images/printing/${res.data.url}`;
    return { isOpen: true, message: res.data.url, isError: true };
  } catch (e: any) {
    const {
      response: {
        data: { error },
      },
    } = e;
    return { isOpen: true, message: error, isError: true };
  }
};

// export const LoginApi = async (data: Partial<IUser>) => {
//   try {
//     const { username, password } = data;
//     const { password: docPass, role, _id } = await User.findOne({ username });
//     if (!docPass) return false;
//     const isMatch = await bcrypt.compare(password as string, docPass);
//     if (!isMatch) return false;
//     const jwtToken = JWTSign({ username, role, _id });
//     await User.findOneAndUpdate({ username }, { lastLogin: new Date().toISOString() });
//     return jwtToken;
//   } catch (e) {
//     console.log("e", e);
//     return false;
//   }
// };
