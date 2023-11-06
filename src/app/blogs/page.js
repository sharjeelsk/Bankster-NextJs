"use client";

import React, { useEffect, useState } from "react";
import "../style/Pages.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Head from "next/head";
import axios from "axios";

function Blogs() {
  const [blogs, setBlogsData] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT}/api/job/getAllBlogs`
      )
      .then((res) => {
        console.log(res);
        setBlogsData(res.data.result);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Jobs Blogs - Find Your Dream Job</title>
        <meta
          name="description"
          content="Explore the latest job opportunities and career advice in our Jobs Blogs. Find your dream job, job search tips, and more."
        />
      </Head>
      <Header />
      <div className="page-section bg-pink p-3">
        <h1>Blogs</h1>

        <section className="blog-container">
          {blogs &&
            blogs.map((item, index) => (
              <div className="blog-head row m-auto shadow-sm" key={index}>
                <div className="col-2 img-div">
                  <img
                    src={`${process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT}/api/image/${item.img}`}
                    alt="img"
                  />
                </div>
                <div className="col-10 content-div">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Blogs;
