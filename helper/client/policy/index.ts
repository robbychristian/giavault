import { API } from "@libs/api";
import { InsurancePolicy } from "@typedefs/user";

export const AddPolicy = async (policy: Partial<InsurancePolicy>, accessToken: string, setSnackbar: (snackbar: any) => void) => {
  try {

    const res = await API.post("/api/policy", policy, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status == 200) {
      const { data } = res;
      return setSnackbar({ isOpen: true, message: data?.message, isError: false });
    }

    return { isOpen: true, message: res?.data?.message, isError: true };
  } catch (e: any) {
    const {
      response: {
        data: { error },
      },
    } = e;
    return { isOpen: true, message: error, isError: true };
  }
};
