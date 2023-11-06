import React from "react";
import { Button } from "@mui/material";
import "../style/JobCard.scss";
import { renderAgo } from "./Functions";
import LinearProgress from "@mui/material/LinearProgress";
import { useRouter } from "next/navigation";
function TrendingCard({ item }) {
  const router = useRouter();
  function convertToLakhsString(num) {
    const lakhs = num / 100000;
    return (
      lakhs.toLocaleString("en-IN", { maximumFractionDigits: 2 }) + " Lacs"
    );
  }
  function numberWithCommas(x) {
    //let num = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let num = x.toString();
    //return num.length>=5?`${num.substring(0,num.length-5)} lakhs`:num
    return convertToLakhsString(x);
  }
  const renderImageString = (createdBy) => {
    if (createdBy) {
      if (Array.isArray(createdBy) && createdBy.length > 0) {
        if (createdBy[0].companyImg.length > 0) {
          return `${process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT}/api/image/${createdBy[0].companyImg}`;
        } else {
          return "/job-offer.png";
        }
      } else if (createdBy.companyImg) {
        if (createdBy.companyImg.length > 0) {
          return `${process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT}/api/image/${createdBy.companyImg}`;
        } else {
          return "/job-offer.png";
        }
      } else {
        return "/job-offer.png";
      }
    }
  };
  const renderNameString = (createdBy) => {
    if (createdBy) {
      if (Array.isArray(createdBy) && createdBy.length > 0) {
        if (createdBy[0].companyName.length > 0) {
          return createdBy[0].companyName;
        } else {
          return "";
        }
      } else if (createdBy.companyName) {
        if (createdBy.companyName.length > 0) {
          return createdBy.companyName;
        } else {
          return "";
        }
      } else {
        return "";
      }
    }
  };
  //Business Development Analyst 28 characers
  return (
    <div
      onClick={() => router.push(`/JobDetail/${item._id}`)}
      className="shadow job-card-item col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 trending cp"
    >
      {/* <p className="timeframe">{renderAgo(item.createdAt)}</p> */}
      <div className="row m-auto align-items-center">
        <div className="p-0 col-3">
          <img
            src={
              item.createdByAdmin
                ? renderImageString(item.createdByAdmin)
                : renderImageString(item.createdBy)
            }
            alt="logo1"
          />
        </div>
        <div className="col-8">
          <h5 className="companyname">
            {item.companyName
              ? item.companyName.length > 15
                ? `${item.companyName.substring(0, 15)} ...`
                : item.companyName
              : ""}
          </h5>
          <p className="companylocation">
            {item.jobLocation.city},{" "}
            {`${item.jobLocation.state.substring(0, 2)}..`}
          </p>
        </div>
      </div>
      <h4 className="jobname">
        {item.title.length > 15
          ? `${item.title.substring(0, 15)} ...`
          : item.title}
      </h4>
      <h5 className="product">{`${item.product.substring(0, 18)}..`}</h5>
      <p className="description">
        {item.jobDescription.length > 100
          ? `${item.jobDescription.substring(0, 100)} ...`
          : item.jobDescription}
      </p>
      <p className="ctc">
        <span className="amount">
          ₹{numberWithCommas(item.ctc.min)} - ₹{numberWithCommas(item.ctc.max)}
        </span>
      </p>
      <LinearProgress variant="determinate" value={item.applied_count} />
      <p className="apply-text">
        <span className="primarycolor">{item.applied_count}</span> Applied out
        of 100
      </p>
    </div>
  );
}

export default TrendingCard;
