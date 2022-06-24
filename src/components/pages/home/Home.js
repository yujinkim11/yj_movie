import { useEffect } from "react";
import { movieApi } from "../../../api";
// console.log(movieApi.nowPlaying());

export const Home = () => {
  useEffect(() => {
    const movieData = async () => {
      const {
        data: { results },
      } = await movieApi.nowPlaying();
      console.log(results);
      // console.log(now);
    };
    movieData();
  }, []);

  return <div>Home</div>;
};
