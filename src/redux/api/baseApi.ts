/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

import { toast } from "sonner";

//http://localhost:5000/api/v1
// https://server.10fix.com.bd/api/v1
const baseQuery = fetchBaseQuery({
  baseUrl: "https://blabbl.onrender.com/api",
  credentials: "omit",
  prepareHeaders: (headers: Headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", token as string);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // api.dispatch(logout());
    // signOut(auth);
  }
  if (result?.error?.status === 404) {
    toast.error((result?.error?.data as any)?.message);
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["user", "friends", "notification", "messages"],
  endpoints: () => ({}),
});
