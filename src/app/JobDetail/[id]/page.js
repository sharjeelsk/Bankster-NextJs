// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { connect } from "react-redux";
// import "../../style/FindJobs.scss";
// import MenuIcon from "@mui/icons-material/Menu";
// import { IconButton, Button } from "@mui/material";
// import SearchBar from "../../utils/SearchBar";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import Rating from "@mui/material/Rating";
// import WorkIcon from "@mui/icons-material/Work";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import FmdGoodIcon from "@mui/icons-material/FmdGood";
// import ArticleIcon from "@mui/icons-material/Article";
// import DescriptionIcon from "@mui/icons-material/Description";
// import Inventory2Icon from "@mui/icons-material/Inventory2";
// import Chip from "@mui/material/Chip";
// import SearchIcon from "@mui/icons-material/Search";
// import { fetchCandidateInfo } from "../../../redux/user/userActions";
// // import { Helmet } from "react-helmet";
// import { renderRating, renderAgo } from "../../utils/Functions";
// import { useParams, useRouter } from "next/navigation";
// import Footer from "@/app/components/Footer/Footer";
// import Link from "next/link";
// import Header from "@/app/components/Header/Header";
// import FilterMenu from "@/app/components/FilterMenu";
// import Head from "next/head";
import Jobs from "@/app/components/Jobs";
import axios from "axios";

export async function generateMetadata({ params }) {
  // read route params
  const id = params.id;

  // fetch data
  const product = await axios.post(
    `${process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT}/api/job/singleJob`,
    { jobId: id }
  );

  // console.log(product.data.result.title,"product in page")

  return {
    title: product.data.result.title,
    location: product.data.result.jobLocation.city,
    product: product.data.result.product,
    ctc: product.data.result.ctc.max,
    description: product.data.result.jobDescription,
    openGraph: {
      images: "/banksterfullAsset.png",
    },
  };
}

function JobDetail(props) {
  return (
    <div>
      <Jobs props={props} />
    </div>
  );
}

export default JobDetail;
