import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PORT = import.meta.env.VITE_PORT;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || `http://localhost:${PORT}`;
const CERTIFICATE_API = BACKEND_URL+"/api/v1/certificate";

export const certificateApi = createApi({
  reducerPath: "certificateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: CERTIFICATE_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("edly_token"); // read token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCertificate: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    generateCertificate: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCertificateQuery,
  useGenerateCertificateMutation,
} = certificateApi;
