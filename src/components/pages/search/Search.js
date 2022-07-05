import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { movieApi } from "../../../api";
import { Container } from "../../Container";
import { Loading } from "../../Loading";
import { PageTitle } from "../../PageTitle";
import { imgUrl } from "../../../constants/constant";
import { Link } from "react-router-dom";

const SearchWrap = styled.div`
  margin-top: 150px;
`;

const Input = styled.input`
  all: unset;
  width: 100%;
  border: 1px solid #555;
  padding: 20px;
  box-sizing: border-box;
  font-size: 20px;
  &::placeholder {
    font-size: 20px;
  }
`;

const ConWrap = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 30px;
  row-gap: 50px;
`;

const Con = styled.div``;
const Title = styled.h3`
  font-size: 20px;
  margin-top: 10px;
`;
const Bg = styled.div`
  height: 300px;
`;

export const Search = () => {
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoadig] = useState();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const searchMovie = async () => {
    const { search: term } = getValues();
    // => getValues는 인풋 태그에 작성된 내용을 가져옴
    // console.log(term);
    setLoadig(true);
    try {
      const {
        data: { results },
      } = await movieApi.search(term);
      setSearchResult(results);

      if (results.length <= 0) {
        setError("result", {
          message: "영화가 없어요 !",
        });
        // => setError("에러 이름", {message:"값"})
        // => useForm에 있는 속성으로 에러를 설정할 수 있음
      } else {
        setSearchResult(results);
      }

      setLoadig(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(searchResult);
  console.log(errors);
  // => 폼 상태에 에러처리 담당

  return (
    <div>
      <PageTitle title={"Search"} />

      <Container>
        <SearchWrap>
          <form onSubmit={handleSubmit(searchMovie)}>
            <Input
              {...register("search", {
                required: "내용은 필수입니다!!!",
              })}
              type="text"
              placeholder="영화 검색"
            ></Input>

            {errors?.search?.message}
            {errors?.result?.message}
          </form>
        </SearchWrap>

        {loading ? (
          <Loading />
        ) : (
          <>
            {searchResult && (
              <ConWrap>
                {searchResult.map((term) => (
                  <Con key={term.id}>
                    <Link to={`/detail/${term.id}`}>
                      <Bg
                        style={{
                          background: `url(${imgUrl}${term.backdrop_path}) no-repeat center / cover`,
                        }}
                      ></Bg>
                      <Title>{term.title}</Title>
                    </Link>
                  </Con>
                ))}
              </ConWrap>
            )}
          </>
        )}
      </Container>
    </div>
  );
};
