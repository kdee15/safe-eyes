import { createClient } from "contentful";
import ComponentHeroBanner from "../components/blocks/componentHeroBanner/ComponentHeroBanner";
import ComponentProfile from "../components/blocks/componentProfile/ComponentProfile";
import ComponentServiceCard from "../components/blocks/componentServiceCard/ComponentServiceCard";
const { C_SPACE_ID, C_DELIVERY_KEY } = require("../helpers/contentful-config");

export async function getStaticProps() {
  const client = createClient({
    space: C_SPACE_ID,
    accessToken: C_DELIVERY_KEY,
  });

  const resPage = await client
    .getEntries({
      content_type: "page",
    })

    .then((entries) => entries.items);

  // const resServices = await client.getEntries({
  //   content_type: "componentServiceCard",
  // });

  return {
    props: {
      Page: resPage,
      // mainNavigation: resPage[0].fields.components[0].fields,
      heroBanner: resPage[0].fields.components[0].fields,
      // profileKurt: resPage[0].fields.components[2].fields,
      // profileCompany: resPage[0].fields.components[3].fields,
      // servicesList: resServices,
    },
    revalidate: 1,
  };
}

export default function Recipes({
  Page,
  // mainNavigation,
  heroBanner,
  // servicesList,
  // profileKurt,
  // profileCompany,
}) {
  // const Services = servicesList.items;
  console.log("Page", Page);
  return (
    <div>
      <ComponentHeroBanner heroBanner={heroBanner} />
      {/* <ComponentServiceCard servicesList={servicesList} />
      <ComponentProfile data={profileKurt} />
      <ComponentProfile data={profileCompany} /> */}
    </div>
  );
}
