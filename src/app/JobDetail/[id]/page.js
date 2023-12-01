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
    // title: `💼${product.data.result.title} | 🏬${product.data.result.companyName}`,
    // description: `📍${product.data.result.jobLocation.city} | ${product.data.result.product} | ₹${product.data.result.ctc.max} | ${product.data.result.roleResp[0]}`,
    openGraph: {
      title: `💼${product.data.result.title} | 🏬${product.data.result.companyName}`,
      description: `📍${product.data.result.jobLocation.city} | ${product.data.result.product} | ₹${product.data.result.ctc.max} | ${product.data.result.roleResp[0]}`,
      url: `/JobDetail/${product.data.result.id}`,
      type: "article",
      siteName: "banksterindia",
      publishedTime: new Date(product.data.result.createdAt).toISOString(),
      authors: [product.data.result.createdBy.fullName],
      images: [
        {
          url: "/opengraph-image.jpeg",
          width: 1200,
          height: 630,
          alt: `Preview image for banksterindia`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@banksterindia",
      title: `💼${product.data.result.title} | 🏬${product.data.result.companyName}`,
      description: `📍${product.data.result.jobLocation.city} | ${product.data.result.product} | ₹${product.data.result.ctc.max} | ${product.data.result.roleResp[0]}`,
      creator: product.data.result.createdBy.fullName,
      images: {
        url: `/opengraph-image.jpeg`,
        alt: `Preview image for banksterindia`,
      },
    },
  };
}

// authors: [{ name:product.data.result.createdBy.fullName}],
// publishDate:product.data.result.createdAt
// openGraph: {
//   title: `💼${product.data.result.title} | 🏬${product.data.result.companyName}`,
//   description: `📍${product.data.result.jobLocation.city} | ${product.data.result.product} | ₹${product.data.result.ctc.max} | ${product.data.result.roleResp[0]}`,
//   type: "article",
//   publishedTime: new Date(product.data.result.createdAt),
//   authors: [product.data.result.createdBy.fullName],
//   images: ["/opengraph-image.png"],
// },

function JobDetail(props) {
  return (
    <div>
      <Jobs props={props} />
    </div>
  );
}

export default JobDetail;
