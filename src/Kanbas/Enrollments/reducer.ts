import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
const initialState = {
  enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload: enrollment}) => {
      for (let e of state.enrollments) {
        if (enrollment.course === e.course && enrollment.user === e.user) {
          return;
        }
      }
      const newEnrollment: any = {
        ...enrollment,
        _id: new Date().getTime().toString(),
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    unenroll: (state, { payload: enrollment }) => {
      state.enrollments = state.enrollments.filter(
        (a : any) => a.course !== enrollment.course || a.user !== enrollment.user);
    },
  },
});
export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
