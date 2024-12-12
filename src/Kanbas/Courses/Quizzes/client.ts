import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${REMOTE_SERVER}/api/users/current/courses`;
const ATTEMPTS_API = `${REMOTE_SERVER}/api/users/current/attempts`;

/**
 * Fetch quiz details by ID
 */
export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

/**
 * Fetch all quizzes for a student in a course
 */
export const findQuizzesForStudent = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes/student`);
  return response.data;
};

/**
 * Start a new attempt for a quiz
 */
export const startNewAttempt = async (courseId: string, quizId: string, accessCode?: string) => {
  try {
      const response = await axiosWithCredentials.post(
          `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts`,
          { access_code: accessCode }
      );
      return response.data;
  } catch (error) {
      console.error("Error in startNewAttempt:", error);
      throw error;
  }
};

/**
 * Submit an attempt for a quiz
 */
export const submitAttempt = async (attemptId: string, answers: Array<{ question_id: string; answer: string }>) => {
  const response = await axiosWithCredentials.patch(`${ATTEMPTS_API}/${attemptId}/submit`, { answers });
  return response.data;
};

/**
 * Fetch results of the last attempt for a quiz
 */
export const getQuizResult = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/result`);
  return response.data;
};

/**
 * Fetch all attempts for a quiz
 */
export const getAttemptsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts`);
  return response.data;
};

/**
 * Fetch questions for a specific quiz
 */
export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

/**
 * Fetch all quizzes for a course (Teacher view)
 */
export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};
