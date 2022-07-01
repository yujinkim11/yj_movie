import { Helmet } from "react-helmet-async";

export const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>YJ MOVIE | {title}</title>
    </Helmet>
  );
};
