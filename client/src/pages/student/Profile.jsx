import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Course from './Course';
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';

const Profile = () => {
  const { data, isLoading, refetch } = useLoadUserQuery();

  const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading, error, isError, isSuccess }] = useUpdateUserMutation();

  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    console.log(name, profilePhoto);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile Updated.");
    }
    if (isError) {
      toast.error(error.message || " X error occurred while updating profile.");
    }
  }, [error,updateUserData, isError, isSuccess]);

  // Ensure data exists before destructuring
  const user = data?.user || {};

  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-left mx-4">PROFILE</h1>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
              <AvatarImage src={user?.photoUrl || "lak.jpg"} alt="Profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                Name:
                <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                  {user.name || "N/A"}
                </span>
              </h1>
              <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                E-mail:
                <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                  {user.email || "N/A"}
                </span>
              </h1>
              <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                Role:
                <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                  {user.role ? user.role.toUpperCase() : "N/A"}
                </span>
              </h1>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-black text-gray-200 rounded-full my-5 px-4 py-2 hover:bg-gray-800">
                  Edit Profile
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white text-gray-900 rounded-lg p-6 max-w-md mx-auto shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
                  <DialogDescription className="bg-white text-gray-600 mt-2">
                    Make changes to your profile here. Click save when you are done.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 rounded bg-white text-gray-900 border border-gray-600"
                  />
                  <input
                    type="file"
                    placeholder="Insert Profile Photo"
                    accept="image/*"
                    onChange={onChangeHandler}
                    className="w-full my-4 p-2 rounded bg-white text-gray-900 border border-gray-600"
                  />
                  <button onClick={updateUserHandler} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center">
                    {updateUserIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <p>Please Wait</p>
                      </>
                    ) : (
                      <p>Save</p>
                    )}
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
     
     <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user.enrolledCourses.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
