import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const getEnrollments = async () => {
  const response = await axiosWithCredentials.get(`${ENROLLMENTS_API}`);
  return response.data;
}
