import { AppStore } from "@/store";

export default {
  checkResponse(response: any) {
    if (response) {
      if (response.status && response.status >= 200 && response.status < 300)
        return true;
      else
        AppStore.showSnackBar({
          message: response.data.message,
          color: "error",
        });
    }
    return false;
  },
  ErrorHandler(error: any, noRedirect?: boolean) {
    if (!noRedirect && error.response?.status == 401) {
      localStorage.removeItem("profile");
      localStorage.removeItem("access_token");
      localStorage.removeItem("access_token_expires_at");
      window.location.href = "/Auth";
    }
    AppStore.showSnackBar({
      message: error.response?.data?.message || error.message,
      color: "error",
    });
  },
};
