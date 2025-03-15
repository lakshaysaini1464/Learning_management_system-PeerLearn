import express from "express"
import isAuthenticatd from "../middlewares/isAuthenticated.js";
import { getCourseProgress, markAsCompleted, markAsInCompleted, updateLectureProgress } from "../controllers/courseProgress.controller.js";

const router = express.Router()

router.route("/:courseId").get(isAuthenticatd, getCourseProgress);
router.route("/:courseId/lecture/:lectureId/view").post(isAuthenticatd, updateLectureProgress);
router.route("/:courseId/complete").post(isAuthenticatd, markAsCompleted);
router.route("/:courseId/incomplete").post(isAuthenticatd, markAsInCompleted);

export default router;