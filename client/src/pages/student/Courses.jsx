import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  if (isError) return <h1 className="text-center text-red-500">Some error occurred while fetching courses.</h1>;

  return (
    <div className="bg-gray-50 dark:bg-[#141414] min-h-screen">
      <div className="max-w-7xl mx-auto p-6 ">
        <h2 className="font-bold text-3xl text-center mb-10 text-gray-900 dark:text-gray-100">
          Our Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : (
            data?.courses &&
            data.courses.map((course, index) => (
              <Course key={index} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36 bg-gray-200 dark:bg-gray-700" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
};