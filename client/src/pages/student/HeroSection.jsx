import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery('');
  };

  return (
    <div className='relative bg-gradient-to-r from-green-500 to-teal-600 dark:from-gray-900 dark:to-gray-800 py-16 px-4 text-center'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-white text-4xl font-bold mb-4 mt-10'>
          Unlock Your Potential with Student-Led Courses
        </h1>
        <p className='text-gray-200 dark:text-gray-400 mb-8'>
          Dive deep into a world of learning and grow your skills with top-tier Student-Instructors and tailored content.
        </p>

        <form onSubmit={searchHandler} className='flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6'>
        <Input
  type='text'
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  placeholder='Search for courses'
  className='flex-grow px-4 py-3 text-gray-800 dark:text-gray-200 bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400 border-none shadow-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:border-transparent'
/>


          <Button
            type='submit'
            className='h-full mx-1 mt-1 mb-1 px-6 py-3 bg-teal-600 dark:bg-teal-700 text-white rounded-full hover:bg-teal-700 dark:hover:bg-teal-800'
          >
            Search
          </Button>
        </form>

        <Button
          onClick={() => navigate('/course/search?query=')}
          className='px-6 py-3 bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-white rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200'
        >
          Start Learning Today
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
