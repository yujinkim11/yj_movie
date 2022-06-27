import styled from "styled-components";
import { imgUrl } from "../../../constants/constant";
import { mainStyle } from "../../../styles/globalStyle";

const Banner = styled.section`
  height: 80vh;
  background-color: gray;
  padding: ${mainStyle.padding};
  padding-top: 250px;
`;

const Title = styled.div`
  max-width: 650px;
  width: 100%;
  line-height: 6rem;
  font-size: 80px;
  font-weight: 700;
`;

const Desc = styled.div`
  max-width: 700px;
  width: 100%;
  line-height: 2rem;
  font-size: 20px;
  margin-top: 20px;
  opacity: 0.9;
  font-weight: 300;
`;

export const MainBanner = ({ playData }) => {
  //   console.log(playData);
  return (
    <>
      <Banner
        style={{
          background: `url(${imgUrl}/${playData.backdrop_path}) no-repeat center / cover`,
        }}
      >
        <Title>{playData.title}</Title>
        <Desc>{playData.overview.slice(0, 110) + "..."}</Desc>
      </Banner>
    </>
  );
};
