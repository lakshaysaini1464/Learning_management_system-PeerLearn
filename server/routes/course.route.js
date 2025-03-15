import express from "express";
import upload from "../utils/multer.js";
import isAuthenticatd from "../middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, removeCourse, removeLecture, searchCourse, togglePublishCourse } from "../controllers/course.controller.js";


const router = express.Router();

router.route("/").post(isAuthenticatd,createCourse);
router.route("/search").get(isAuthenticatd,searchCourse);
router.route("/published-courses").get(getPublishedCourse);
router.route("/").get(isAuthenticatd,getCreatorCourses);
router.route("/:courseId").put(isAuthenticatd, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticatd,  getCourseById);
router.route("/:courseId/lecture").post(isAuthenticatd,  createLecture);
router.route("/:courseId/lecture").get(isAuthenticatd, getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticatd, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticatd, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticatd, getLectureById);
router.route("/:courseId").patch(isAuthenticatd,togglePublishCourse);
router.route("/:courseId").delete(isAuthenticatd,  removeCourse);



export default router;