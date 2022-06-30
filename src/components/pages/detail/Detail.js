import { useEffect, useState } from "react";
import styled from "styled-components";
import { movieApi } from "../../../api";
import { useParams } from "react-router";
import { Container } from "../../Container";
import { mainStyle } from "../../../styles/globalStyle";
import { imgUrl } from "../../../constants/constant";
import { Loading } from "../../Loading";

const DetailWrap = styled.div`
  padding: ${mainStyle.padding};
  padding-top: 100px;
  display: flex;
  justify-content: space-between;
`;

const DetailImg = styled.div`
  width: 45%;
  height: 700px;
  background-color: white;
`;

const ConWrap = styled.div`
  margin-left: 50px;
  width: 45%;
`;

const Title = styled.h3`
  font-size: 40px;
  font-weight: 900;
  margin-bottom: 40px;
`;

const Date = styled.li`
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Genres = styled.ul`
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  li {
    list-style: none;
    margin-right: 10px;
  }
  margin: 20px 0 20px 20px;
`;

const Time = styled.li`
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
`;

const Desc = styled.p`
  font-size: 18px;
  font-weight: 200;
  line-height: 2rem;
  opacity: 0.8;
  margin-top: 30px;
`;

export const Detail = () => {
  const [movieData, SetmovieData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  // => useParams는 URL 주소에 있는 변수 값을 가져옴
  console.log(id);

  useEffect(() => {
    const detailData = async () => {
      const { data } = await movieApi.movieDetail(id);
      SetmovieData(data);
      setLoading(false);
    };
    detailData();
  }, []);

  console.log(movieData);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {movieData && (
            <>
              <Container>
                <DetailWrap>
                  <DetailImg
                    style={{
                      background: `url(${
                        movieData.backdrop_path
                          ? `${imgUrl}/${movieData.backdrop_path}`
                          : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
                      }) no-repeat center /  cover`,
                    }}
                  ></DetailImg>

                  <ConWrap>
                    <Title>{movieData.title}</Title>
                    <Genres>
                      {movieData.genres.map((genre) => (
                        <li key={genre.id}>{genre.name}</li>
                      ))}
                    </Genres>
                    <Date>{movieData.release_date}일 개봉</Date>
                    <Time>{movieData.runtime} 분</Time>

                    <Desc>{movieData.overview}</Desc>
                  </ConWrap>
                </DetailWrap>
              </Container>
            </>
          )}
        </>
      )}
      ; {"}"}
    </div>
  );
};
