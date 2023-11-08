import { ToastContext } from "./ToastContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast({ children }) {
  const toastAlert = (text) => toast.warning(text);
  const toastSucces = (text) => toast.success(text);
  const toastError = (text) => toast.error(text);
  const toastPromise = async (promise) =>
    await toast.promise(promise, {
      pending: "Pending..",
      success: "Done 👌",
      error: "Error raised :(",
    });

  return (
    <ToastContext.Provider
      value={{ toastAlert, toastSucces, toastError, toastPromise }}
    >
      <ToastContainer
        position={toast.POSITION.BOTTOM_RIGHT}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
      <div>{children}</div>
    </ToastContext.Provider>
  );
}
