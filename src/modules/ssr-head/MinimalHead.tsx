export function MinimalHead() {
  return (
    <>
      {/* System data */}
      <meta charSet="UTF-8" />
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=1, viewport-fit=cover"
        name="viewport"
      />

      <link
        href={`${import.meta.env.BASE_URL}favicon.svg`}
        rel="icon"
        type="image/svg+xml"
      />
    </>
  );
}
