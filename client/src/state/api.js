import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://k12viet.edu.vn" }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Students"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getStudents: build.query({
      query: () => "student/students",
      providesTags: ["Students"],
    }),
  }),
});

export const { useGetUserQuery, useGetStudentsQuery } = api;
