import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const getEnrollments = async () => {
  const response = await axiosWithCredentials.get(`${ENROLLMENTS_API}`);
  return response.data;
}

export const enroll = async (cid: string) => {
  const response = await axiosWithCredentials.post(`${ENROLLMENTS_API}/${cid}`);
  return response.data;
}

export const unenroll = async (cid: string) => {
  const response = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${cid}`);
}
