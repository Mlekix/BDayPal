import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
};

export const showToastSuccess = (message) => {
  toast.success(message, toastOptions);
};

export const showToastError = (message) => {
  toast.error(message, toastOptions);
};

export const showToastWarning = (message) => {
  toast.warning(message, toastOptions);
};

export const showToastInfo = (message) => {
  toast.info(message, toastOptions);
};
