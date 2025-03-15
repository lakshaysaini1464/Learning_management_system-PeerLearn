import {  BrainCircuit } from 'lucide-react';
import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar } from './ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import DarkMode from '@/DarkMode';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import { useLogoutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

function Navbar() {
    const { user } = useSelector(store => store.auth);
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
    const navigate = useNavigate();
    const location = useLocation(); // Get the current route location

    const logoutHandler = async () => {
        await logoutUser();
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "User Logged Out.");
            navigate("/login");
        }
    }, [isSuccess]);

    // Check if the current route is /login or /signup
    const isLoginOrSignupPage = location.pathname === "/login" || location.pathname === "/signup";

    return (
        <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 shadow-sm dark:shadow-gray-800">
            <div className="flex items-center gap-3">
                {/* <School size={30} className="text-black dark:text-white" /> */}
                
                <BrainCircuit className="w-12 h-12 text-purple-600" />
                <Link
                    to="/"
                    className="font-bold text-2xl text-black dark:text-white no-underline"
                >
                PeerLearn
                </Link>
            </div>
            <div className="flex items-center gap-4">
                {/* Ternary Operator to Handle Login/Signup or User Avatar */}
                {user ? (
                    // If user is logged in, show the avatar and dropdown menu
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src={user?.photoUrl || "lak.jpg"} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                            <DropdownMenuLabel className="text-gray-900 dark:text-gray-100">
                                My Account
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Link to="my-learning" className="w-full text-gray-900 dark:text-gray-100">
                                    My Learning
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Link to="profile" className="w-full text-gray-900 dark:text-gray-100">
                                    Edit Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                                onClick={logoutHandler}
                            >
                                Log out
                            </DropdownMenuItem>
                            {user.role === "instructor" && (
                                <>
                                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                                    <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <Link to="/admin/dashboard" className="w-full text-gray-900 dark:text-gray-100">
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    // If user is not logged in, show Login and Signup buttons (only if not on /login or /signup page)
                    !isLoginOrSignupPage && (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/login")}
                                className="text-black dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Login
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/signup")}
                                className="bg-gradient-to-r from-green-500 to-teal-600 dark:from-gray-900 dark:to-gray-800 text-white"
                            >
                                Signup
                            </Button>
                        </>
                    )
                )}
                <DarkMode />
            </div>
        </div>
    );
}

export default Navbar;