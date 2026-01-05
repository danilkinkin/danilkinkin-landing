const data = {
  title: "Danilkinkin",
  description: "Personal landing page of Danilkinkin.",
  card: `${import.meta.env.BASE_URL}card.png`,
  canonical: "https://danilkinkin.com",
};

export function MetaData() {
  return (
    <>
      <title>{data.title}</title>
      {/* Open Graph */}
      <meta content={data.title} property="og:title" />
      <meta content={data.description} property="og:description" />
      <meta content={data.card} property="og:image" />
      <meta content={data.canonical} property="og:url" />
      <meta content="website" property="og:type" />
      {/* Twitter Cards */}
      <meta content={data.card} name="twitter:card" />
      <meta content={data.title} name="twitter:title" />
      <meta content={data.description} name="twitter:description" />
      <meta content={data.card} name="twitter:image" />
    </>
  );
}
