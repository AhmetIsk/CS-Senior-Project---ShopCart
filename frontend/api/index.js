export const url = 'http://<YOUR_IP_ADDRESS>:8000/authorization';
// export const url = "http://localhost:5000/api";
export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
