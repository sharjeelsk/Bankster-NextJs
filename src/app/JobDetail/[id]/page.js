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

  return {
    title: product.data.result.title,
    location: product.data.result.jobLocation.city,
    product: product.data.result.product,
    ctc: product.data.result.ctc.max,
    description: product.data.result.jobDescription,
    // openGraph: {
    //   images: "/banksterfullAsset.png",
    // },
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
