import { useEffect, useState } from "react";
import { useWatcher } from "alova";
import listGetter from "../alova/listGetter";
import MovieCard from "./MovieCard";
//import { Row, Col } from "antd";
import { Movie } from "../components/Interfaces";
import { useSelector } from "react-redux";
//import type { RootState } from "./store";

function CardList() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const { withGenre } = useSelector((state: any) => state.genreStore);
  const { currentPage } = useSelector((state: any) => state.paginationStore);

  const { data } = useWatcher(
    () => listGetter(currentPage, 20, withGenre),
    [withGenre, currentPage]
  );

  useEffect(() => {
    setMovieList(data);
  }, [data, withGenre]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: "20px",
        margin: "0 20px",
      }}
    >
      {movieList &&
        movieList.map((item: Movie) => (
          <div>
            <MovieCard item={item} />
          </div>
        ))}
    </div>
  );
}

export default CardList;

// import { useEffect, useState } from "react";
// import { useWatcher } from "alova";
// import listGetter from "../alova/listGetter";
// import MovieCard from "./MovieCard";
// import { Row, Col } from "antd";
// import { Movie } from "./MovieCard";
// import { useSelector } from "react-redux";

// function CardList() {
//   const [movieList, setMovieList] = useState<Movie[]>([]);
//   const { withGenre } = useSelector((state) => state.genreStore);
//   const { currentPage } = useSelector((state) => state.paginationStore);

//   const { data } = useWatcher(
//     () => listGetter(currentPage, 20, withGenre),
//     [withGenre, currentPage]
//   );

//   useEffect(() => {
//     setMovieList(data);
//   }, [data, withGenre]);

//   return (
//     <div>
//       <Row gutter={[8, 8]}>
//         {movieList &&
//           movieList.map((item) => (
//             <Col key={item.id}>
//               <div>
//                 <MovieCard item={item} />
//               </div>
//             </Col>
//           ))}
//       </Row>
//     </div>
//   );
// }

// export default CardList;
//import { css } from "@emotion/react";

// const cardGrid = css`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//   grid-gap: 20px;
// `;
