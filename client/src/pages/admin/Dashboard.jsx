import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) return <h1 className="text-center text-2xl font-semibold text-gray-700">Loading...</h1>;
  if (isError) return <h1 className="text-center text-2xl font-semibold text-red-500">Failed to get purchased courses</h1>;

  const { purchasedCourse } = data || [];

  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
  }));

  const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element.amount || 0), 0);
  const totalSales = purchasedCourse.length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Sales Card */}
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg">
          <CardHeader className='bg-gradient-to-r from-green-500 to-teal-600 dark:from-gray-900 dark:to-gray-800'>
            <CardTitle className="text-lg font-semibold text-white">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
          </CardContent>
        </Card>

        {/* Total Revenue Card */}
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg">
          <CardHeader className='bg-gradient-to-r from-green-500 to-teal-600 dark:from-gray-900 dark:to-gray-800'>
            <CardTitle className="text-lg font-semibold text-white">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">₹{totalRevenue}</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Prices Chart Card */}
      <div className="mt-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg  ">
          <CardHeader className='bg-gradient-to-r from-green-500 to-teal-600 dark:from-gray-900 dark:to-gray-800'>
            <CardTitle className="text-lg font-semibold text-white">Course Prices</CardTitle>
          </CardHeader>
          <CardContent >
            <div className="w-full h-100 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={courseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value, name) => [`₹${value}`, name]}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#4a90e2"
                    strokeWidth={2}
                    dot={{ stroke: "#4a90e2", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;