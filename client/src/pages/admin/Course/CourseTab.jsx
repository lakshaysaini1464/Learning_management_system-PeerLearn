import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import RichTextEditor from '@/components/RichTextEditor';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useEditCourseMutation,
    useGetCourseByIdQuery,
    usePublishCourseMutation,
    useRemoveCourseMutation,
} from '@/features/api/courseApi';
import { toast } from 'sonner'; // Ensure Sonner is properly installed and wrapped in your root app

const CourseTab = () => {
    const params = useParams();
    const courseId = params.courseId;
    const navigate = useNavigate();

    const [editCourse, { data: editData, isLoading: isEditLoading, isSuccess: isEditSuccess, error: editError }] =
        useEditCourseMutation(courseId);

    const { data: courseByIdData, isLoading: isCourseByIdLoading, refetch } = useGetCourseByIdQuery(courseId, {
        refetchOnMountOrArgChange: true,
    });

    const [input, setInput] = useState({
        courseTitle: '',
        subTitle: '',
        description: '',
        category: '',
        courseLevel: '',
        coursePrice: '',
        courseThumbnail: '',
    });

    const [previewThumbnail, setPreviewThumbnail] = useState('');

    const [removeCourse, { data: removeData, isSuccess: removeSuccess, error: removeError }] = useRemoveCourseMutation();

    const [publishCourse] = usePublishCourseMutation();

    useEffect(() => {
        if (courseByIdData?.course) {
            const course = courseByIdData?.course;
            setInput({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: '',
            });
        }
    }, [courseByIdData]);

    useEffect(() => {
        if (isEditSuccess) {
            toast.success(editData?.message || 'Course updated successfully.');
        }
        if (editError) {
            toast.error(editError?.data?.message || 'Failed to update course.');
        }
    }, [isEditSuccess, editError, editData]);

    useEffect(() => {
        if (removeSuccess) {
            toast.success(removeData?.message || 'Course removed successfully.');
           
        }
        if (removeError) {
            toast.error(removeError?.data?.message || 'Failed to remove course.');
        }
    }, [removeSuccess, removeError, removeData, navigate]);

    const selectCategory = (value) => {
        setInput({ ...input, category: value });
    };

    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value });
    };

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setPreviewThumbnail(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    };

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const updateCourseHandler = async () => {
        const formData = new FormData();
        formData.append('courseTitle', input.courseTitle);
        formData.append('subTitle', input.subTitle);
        formData.append('description', input.description);
        formData.append('category', input.category);
        formData.append('courseLevel', input.courseLevel);
        formData.append('coursePrice', input.coursePrice);
        formData.append('courseThumbnail', input.courseThumbnail);
        await editCourse({ formData, courseId });
    };

    const publishStatusHandler = async (action) => {
        try {
            const response = await publishCourse({ courseId, query: action });
            if (response?.data) {
                refetch();
                toast.success(response.data.message);
            }
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update publish status.');
        }
    };

    const removeCourseHandler = async () => {
        try {
            const response = await removeCourse(courseId);
            if (response?.data) {
                toast.success(response.data.message || 'Course removed successfully.');
                navigate('/admin/course');
            }
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to remove course.');
        }
    };

    return (
        <Card className="bg-white">
            <CardHeader className="flex flex-row justify-between bg-gradient-to-r from-green-500 to-teal-600 dark:from-gray-900 dark:to-gray-800">
                <div>
                    <CardTitle>Basic Course Information</CardTitle>
                    <CardDescription>Make changes to your course here. Click save when you're done.</CardDescription>
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        className='bg-gradient-to-r from-green-500 to-teal-600 dark:from-gray-900 dark:to-gray-800'
                        onClick={() => publishStatusHandler(courseByIdData?.course?.isPublished ? 'false' : 'true')}
                    >
                        {courseByIdData?.course?.isPublished ? 'UnPublish' : 'Publish'}
                    </Button>
                    <Button className="bg-white text-black mx-2" onClick={removeCourseHandler}>
                        Remove Course
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label>Title</Label>
                        <Input
                            type="text"
                            placeholder="Ex. FullStack Developer"
                            name="courseTitle"
                            value={input.courseTitle}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Sub-title</Label>
                        <Input
                            type="text"
                            placeholder="Ex. Become a FullStack Developer"
                            name="subTitle"
                            value={input.subTitle}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <RichTextEditor input={input} setInput={setInput} />
                    </div>
                    <div className="flex items-center gap-5">
                        <div>
                            <label>Category</label>
                            <Select onValueChange={selectCategory}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent className="absolute z-50 bg-white shadow-lg">
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Next JS">Next JS</SelectItem>
                                        <SelectItem value="Data Science">Data Science</SelectItem>
                                        <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                                        <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
                                        <SelectItem value="MERN Stack Development">MERN Stack Development</SelectItem>
                                        <SelectItem value="Javascript">Javascript</SelectItem>
                                        <SelectItem value="Python">Python</SelectItem>
                                        <SelectItem value="Docker">Docker</SelectItem>
                                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                                        <SelectItem value="HTML">HTML</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Course Level</Label>
                            <Select onValueChange={selectCourseLevel}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a course level" />
                                </SelectTrigger>
                                <SelectContent className="absolute z-50 bg-white shadow-lg">
                                    <SelectGroup>
                                        <SelectLabel>Level</SelectLabel>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Advance">Advance</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Price in (INR)</Label>
                            <Input
                                type="number"
                                name="coursePrice"
                                value={input.coursePrice}
                                onChange={changeEventHandler}
                                placeholder="₹999"
                                className="w-fit"
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Course Thumbnail</Label>
                        <Input type="file" accept="image/*" className="w-fit" onChange={selectThumbnail} />
                        {previewThumbnail && (
                            <img src={previewThumbnail} className="w-64 my-2" alt="Course Thumbnail" />
                        )}
                    </div>
                    <div>
                        <Button variant="outline" onClick={() => navigate('/admin/course')}>
                            Cancel
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-green-500 to-teal-600 dark:from-gray-900 dark:to-gray-800 text-white mx-3"
                            disabled={isEditLoading}
                            onClick={updateCourseHandler}
                        >
                            {isEditLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseTab;
