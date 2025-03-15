import BuyCourseButton from '@/components/BuyCourseButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi';
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react';
import React from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Failed to load course details</h1>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className='mt-20 space-y-5'>
      {/* Course Header Section */}
      <div className='bg-gradient-to-r from-green-500 to-teal-600 dark:from-gray-900 dark:to-gray-800 text-white'>
        <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
          <h1 className='font-bold text-2xl md:text-3xl'>{course?.courseTitle}</h1>
          <p>Course Subtitle</p>
          <p>
            Created By{' '}
            <span className='text-[#C0C4FC] underline italic'>{course?.creator.name}</span>
          </p>
          <div className='flex items-center gap-2 text-sm'>
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt.split('T')[0]}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>

      {/* Course Content Section */}
      <div className='max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10'>
        {/* Course Description and Lectures */}
        <div className='w-full lg:w-1/2 space-y-5'>
          <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
          <p className='text-sm' dangerouslySetInnerHTML={{ __html: course.description }} />
          <Card>
            <CardHeader className='bg-gradient-to-r from-green-500 to-teal-600 dark:from-gray-900 dark:to-gray-800 text-white'>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{course.lectures.length} Lectures</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              {course.lectures.map((lecture, idx) => (
                <div className='mt-6 flex items-center gap-3 text-sm' key={idx}>
                  <span>{purchased ? <PlayCircle size={14} /> : <Lock size={14} />}</span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Video Section */}
        <div className='w-full lg:w-1/3'>
          <Card>
            <CardContent className='p-4 flex flex-col'>
              {purchased ? (
                // Show the video player if the course is purchased
                <div className='w-full aspect-video mb-4'>
                  <ReactPlayer
                    url={course.lectures[0].videoUrl}
                    width='100%'
                    height='100%'
                    controls={true}
                  />
                </div>
              ) : (
                // Show a placeholder or preview for non-purchased courses
                <div className='w-full aspect-video mb-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>
                  <div className='text-center'>
                    <Lock size={40} className='text-gray-500 dark:text-gray-400 mb-2' />
                    <p className='text-gray-600 dark:text-gray-300'>
                      Purchase the course to unlock all lectures.
                    </p>
                  </div>
                </div>
              )}
              <h1>{course.courseTitle}</h1>
              <Separator className='bg-gray-500 my-2' />
              <h1 className='text-lg md:text-xl font-semibold'>${course.coursePrice}</h1>
            </CardContent>
            <CardFooter className='flex justify-center p-4'>
              {purchased ? (
                <Button
                  onClick={handleContinueCourse}
                  className='w-full bg-gradient-to-r from-green-500 to-teal-600 dark:from-gray-900 dark:to-gray-800'
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;