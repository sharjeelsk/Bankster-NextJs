"use client";

import React, { useEffect } from "react";
import Lottie from "lottie-react";
import Done from "../../utils/Done.json";
import { setUser } from "../../../redux/user/userActions";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";

const LottieComponent = (params) => {
  const router = useRouter();
  const { slug } = params.params;
  useEffect(() => {
    setTimeout(() => {
      if (slug.length > 0) {
        params.setUser(slug[1]);
        if (params.type === "candidate") {
          router.push("/candidatehome");
        } else {
          router.push("/recruiterhome");
        }
      }
    }, 2000);
  }, [slug]);
  return (
    <div>
      <Lottie style={{ height: "80vh", width: "100vw" }} animationData={Done} />
    </div>
  );
};
const mapStateToProps = ({ banksterUser }) => {
  return {
    banksterUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (token) => dispatch(setUser(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LottieComponent);
