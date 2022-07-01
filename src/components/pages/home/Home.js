import { useEffect } from "react";
import { movieApi } from "../../../api";
import { useState } from "react";
import { Loading } from "../../Loading";
import { MainBanner } from "./MainBanner";
import { movieNum } from "../../../constants/constant";
import { Movies } from "./Movies";
// console.log(movieApi.nowPlaying());
import "swiper/css";
import { Container } from "../../Container";
import { PageTitle } from "../../PageTitle";

export const Home = () => {
  const [playing, setPlaying] = useState();
  const [rated, setRated] = useState();
  const [upComming, setUpComming] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const movieData = async () => {
      try {
        const {
          data: { results: playingData },
        } = await movieApi.nowPlaying();
        setPlaying(playingData);
        // => 비구조화 할당 이용시 변수명 변경할 땐
        // 변수명: 변경할명(임의로 지정 가능)

        const {
          data: { results: ratedData },
        } = await movieApi.topRated();
        setRated(ratedData);

        const {
          data: { results: upCommingData },
        } = await movieApi.upComming();
        setUpComming(upCommingData);

        setLoading(false);
      } catch (error) {
        // console.log(error);
      }
    };
    movieData();
  }, []);

  // console.log("현재상영 영화:", playing);
  // console.log("인기 영화:", rated);
  // console.log("개봉예정 영화:", upComming);

  return (
    <div>
      <PageTitle title={"Home"} />
      {loading ? (
        <Loading />
      ) : (
        <>
          {playing && (
            <>
              <MainBanner playData={playing[movieNum]} />
              <Container>
                <Movies movieData={playing} title="현재 상영 영화" />
                <Movies movieData={rated} title="인기 영화" />
                <Movies movieData={upComming} title="개봉 예정 영화" />
              </Container>
            </>
          )}
        </>
      )}
    </div>
  );
};
