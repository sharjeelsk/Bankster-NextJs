import React, { useEffect, useState } from "react";
import "../../style/RecruiterDashhead.scss";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import axios from "axios";
import { deleteUser } from "../../../redux/user/userActions";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import GroupIcon from "@mui/icons-material/Group";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import PlagiarismOutlinedIcon from "@mui/icons-material/PlagiarismOutlined";
import { useRouter } from "next/navigation";
const RecruiterDashhead = (props) => {
  console.log(props);
  let { id, display } = props;
  const [dashboardData, setDashboardData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT}/api/recruiter/getRecruiterDashNumbers`,
        { headers: { token: props.user.user } }
      )
      .then((res) => {
        console.log("dashdata", res);
        if (res.data.result.length > 0) {
          setDashboardData(res.data.result[0]);
          if (props.setDashboardData) {
            props.setDashboardData(res.data.result[0]);
          }
        }
      });
  }, []);
  console.log(props, dashboardData);
  return (
    <div className={display ? "shadow-lg dashhead" : "dashhead displayhidden"}>
      <h1 className="head-heading">
        Hi, {props.user.userInfo && props.user.userInfo.fullName.split(" ")[0]}
      </h1>
      {id === 1 ? (
        <div
          onClick={() => router.push("/recruiterhome")}
          className="menu-container-active"
        >
          <p>
            <HomeIcon /> Your Profile
          </p>
        </div>
      ) : (
        <div
          className="menu-container"
          onClick={() => router.push("/recruiterhome")}
        >
          <p>
            <HomeOutlinedIcon /> Your Profile
          </p>
        </div>
      )}

      {id === 2 ? (
        <div
          className="menu-container-active"
          onClick={() => router.push("/jobscreated")}
        >
          <p>
            <NoteAddIcon /> Jobs Created
          </p>
        </div>
      ) : (
        <div
          className="menu-container"
          onClick={() => router.push("/jobscreated")}
        >
          <p>
            <NoteAddOutlinedIcon /> Jobs Created
          </p>
        </div>
      )}

      {id === 3 ? (
        <div
          className="menu-container-active"
          onClick={() => router.push("/notificationsr")}
        >
          <p>
            <NotificationsIcon /> Notifications
          </p>
        </div>
      ) : (
        <div
          className="menu-container"
          onClick={() => router.push("/notificationsR")}
        >
          <p>
            <NotificationsNoneIcon /> Notifications
          </p>
        </div>
      )}

      {id === 4 ? (
        <div
          className="menu-container-active"
          onClick={() => router.push("/subscriptionR")}
        >
          <p>
            <LocalAtmIcon /> Subscription
          </p>
        </div>
      ) : (
        <div
          className="menu-container"
          onClick={() => router.push("/subscriptionR")}
        >
          <p>
            <LocalAtmIcon /> Subscription
          </p>
        </div>
      )}

      {id === 5 ? (
        <div
          className="menu-container-active"
          onClick={() => router.push("/SubRecruiters")}
        >
          <p>
            <GroupIcon /> Sub Recruiters
          </p>
        </div>
      ) : (
        <div
          className="menu-container"
          onClick={() => router.push("/SubRecruiters")}
        >
          <p>
            <PeopleOutlineIcon /> Sub Recruiters
          </p>
        </div>
      )}

      {id === 6 ? (
        <div
          className="menu-container-active"
          onClick={() => router.push("/bookmarksr")}
        >
          <p>
            <BookmarksIcon /> Saved Candidates
          </p>
        </div>
      ) : (
        <div
          className="menu-container"
          onClick={() => router.push("/bookmarksr")}
        >
          <p>
            <BookmarksOutlinedIcon /> Saved Candidates
          </p>
        </div>
      )}

      {id === 7 ? (
        <div
          className="menu-container-active"
          onClick={() => router.push("/savedsearch")}
        >
          <p>
            <PlagiarismIcon /> Saved Search
          </p>
        </div>
      ) : (
        <div
          className="menu-container"
          onClick={() => router.push("/savedsearch")}
        >
          <p>
            <PlagiarismOutlinedIcon /> Saved Search
          </p>
        </div>
      )}

      {props.user.userInfo && (
        <section className="dash-user-cont">
          <div className="row m-auto">
            <div className="col-4">
              <img
                src={
                  props.user.userInfo.profilePicture
                    ? `${process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT}/api/image/${props.user.userInfo.profilePicture}`
                    : "/user.png"
                }
                alt="profile"
              />
            </div>
            <div className="col-8">
              <h3>{props.user.userInfo.fullName}</h3>
              <p className="sub-heading">Recruiter</p>
              <p className="light-grey-text">
                Recruited:{" "}
                {dashboardData && dashboardData.hiredCandidates[0].total}
              </p>
              <p className="light-grey-text">
                Rejected:{" "}
                {dashboardData && dashboardData.rejectedCandidates[0].total}
              </p>
            </div>
          </div>
          <div className="my-3" style={{ textAlign: "right" }}>
            <Button
              onClick={() => {
                props.deleteUser();
                router.push("/");
              }}
              variant="contained"
            >
              Logout
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

const mapStateToProps = ({ banksterUser }) => {
  return {
    user: banksterUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: () => dispatch(deleteUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterDashhead);
