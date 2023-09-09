import React from "react";
import DefaultLayout from "../component/DefaultLayout";
import { useGetAllPostQuery } from "../redux/slices/postSlice";
import Loader from "./../component/Loader";
import { message } from "antd";
import Post from "./../component/Post";

const HomePage = () => {
  const { data, isLoading, error } = useGetAllPostQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        message.error(error?.data?.message || error.error)
      ) : (
        <DefaultLayout>{<Post posts={data} />}</DefaultLayout>
      )}
    </>
  );
};

export default HomePage;
