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
    title: `💼${product.data.result.title} | 🏬${product.data.result.companyName}`,
    description: `📍${product.data.result.jobLocation.city} | ${product.data.result.product} | ₹${product.data.result.ctc.max} | ${product.data.result.roleResp[0]}`,
    // authors: [{ name:product.data.result.createdBy.fullName}],
    // publishDate:product.data.result.createdAt
  };
}

// description: `Location:${product.data.result.jobLocation.city} |
//                 Product:${product.data.result.product},
//                 CTC:${product.data.result.ctc.max},
//   ${product.data.result.jobDescription}`,
// location: product.data.result.jobLocation.city,
// product: product.data.result.product,
// ctc: product.data.result.ctc.max,

function JobDetail(props) {
  return (
    <div>
      <Jobs props={props} />
    </div>
  );
}

export default JobDetail;
