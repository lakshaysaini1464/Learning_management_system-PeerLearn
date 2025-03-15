import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 mt-20">
      <div className="my-6">
        {query ? (
          <>
            <h1 className="font-bold text-xl md:text-2xl text-gray-800">
              Results for "{query}"
            </h1>
            <p className="text-gray-600">
              Showing results for{" "}
              <span className="text-blue-800 font-bold italic">{query}</span>
            </p>
          </>
        ) : (
          <h1 className="font-bold text-xl md:text-2xl text-gray-800">
            Explore All Courses
          </h1>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <Filter handleFilterChange={handleFilterChange} />
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data?.courses?.map((course) => (
              <SearchResult key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-32 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
        No Courses Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Sorry, we couldn't find any courses matching your criteria.
      </p>
      <Link to="/" className="italic">
        <Button variant="link" className="text-blue-600 hover:text-blue-800">
          Browse All Courses
        </Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-gray-200 py-4 animate-pulse">
      <div className="h-32 w-full md:w-64">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
      <div className="flex flex-col gap-2 flex-1 px-4">
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3 rounded" />
        </div>
        <Skeleton className="h-6 w-20 mt-2 rounded" />
      </div>
      <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
        <Skeleton className="h-6 w-12 rounded" />
      </div>
    </div>
  );
};