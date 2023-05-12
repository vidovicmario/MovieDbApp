import { useRequest } from "alova";
import { Card, Table } from "antd";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import singleMovieGetter from "../alova/singleMovieGetter";
import { Movie, Actor } from "../components/Interfaces";
import ReactPlayer from "react-player";
import actorsGetter from "../alova/getterActors";

const { Meta } = Card;

function MovieDetailsCard() {
  const [currentMovie, setCurrentMovie] = useState<Movie>({} as Movie);
  const [videoUrl, setVideoUrl] = useState<string[] | null>(null);
  const [actors, setActors] = useState<Actor>({} as Actor);
  const [hideDetails, setHideDetails] = useState(true);

  const { id } = useParams();
  const { data }: any = useRequest(singleMovieGetter(Number(id ?? 0)), { initialData: {} });
  const { data: actorsData } = useRequest(actorsGetter(Number(id ?? 0)));

  useEffect(() => {}, [actorsData]);

  useEffect(() => {
    setCurrentMovie(data as Movie);
  }, [data]);

  const fetchDetails = () => {
    setCurrentMovie(data as Movie);
  };

  const fetchVideos = async () => {
    setVideoUrl(data.videos.results);
  };

  const fetchActors = () => {
    if (actorsData && "cast" in (actorsData as any)) {
      setActors((actorsData as any).cast);
      console.log((actorsData as any).cast);
    }
  };

  const handleVideosBtn = () => {
    fetchVideos();
    setActors({} as Actor);
    setHideDetails(false);
  };

  const handleActorsBtn = () => {
    fetchActors();
    setVideoUrl(null);
    setHideDetails(false);
  };

  const handeDetialsBtn = () => {
    fetchDetails();
    setVideoUrl(null);
    setActors({} as Actor);
    setHideDetails(true);
  };

  // useEffect(() => {
  //   const video = data?.videos?.results;
  //   if (video) {
  //     setVideoUrl(video);
  //   }
  // }, [data]);

  const dataSource = [
    {
      key: "1",
      title: "Original Name",
      value: currentMovie.original_title,
    },
    {
      key: "2",
      title: "Date of Release",
      value: currentMovie.release_date,
    },
  ];

  const pageMargin = css`
    margin: 0 10px;
  `;

  const imageContainer = css`
    width: 800px;
    max-width: 800px;
    border-radius: 0;
  `;

  const titleStyle = css`
    font-size: 24px;
    color: black;
    display: flex;
    align-items: flex-start;
    font-size: 40px;
    font-family: "Montserrat", sans-serif;
  `;

  const descriptionStyle = css`
    color: gray;
  `;

  const cardContainer = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    max-width: 1080px;
    margin: 0 auto;
  `;

  return (
    <>
      <div css={pageMargin}>
        <div style={{ display: "flex" }}>
          <div css={imageContainer}>
            <Card
              style={{ width: "100%", borderRadius: "none" }}
              cover={
                <img
                  alt="example"
                  src={"https://image.tmdb.org/t/p/w500/" + currentMovie.poster_path}
                />
              }
            ></Card>
          </div>
          <div style={{ marginLeft: "40px", marginTop: "0px" }}>
            <h2 css={titleStyle}>{currentMovie.title}</h2>
            <h2 css={descriptionStyle}>{currentMovie.overview}</h2>
          </div>
        </div>
        <div>
          <button onClick={handeDetialsBtn}>Details</button>
          <button onClick={handleVideosBtn}>Video</button>
          {videoUrl?.map((video: any, index: any) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${video.key}`}
                controls={true}
                width="500px"
                autoplay={false}
                height="100%"
                key={index}
                onEnded={() => console.log("Video ended")}
              />
            </div>
          ))}
          <>
            <button onClick={handleActorsBtn}>Actors</button>
            <div css={cardContainer}>
              {actors &&
                Array.isArray(actors) &&
                actors.map((actor: Actor, index: number) => {
                  return (
                    <Card style={{ width: "100%", maxWidth: "360px" }} key={index}>
                      <img
                        alt="example"
                        src={"https://image.tmdb.org/t/p/w500/" + actor.profile_path}
                        style={{ width: "100%", maxWidth: "360px" }}
                      />
                      <Meta style={{ width: "100%" }} title={actor.name} />
                    </Card>
                  );
                })}
            </div>
            {hideDetails && (
              <Table
                pagination={false}
                dataSource={dataSource}
                columns={[
                  {
                    dataIndex: "title",
                    key: "title",
                  },
                  {
                    dataIndex: "value",
                    key: "value",
                  },
                ]}
              />
            )}
          </>
        </div>
      </div>
    </>
  );
}

export default MovieDetailsCard;

// import { useRequest } from "alova";
// import { Card } from "antd";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import singleMovieGetter from "../alova/singleMovieGetter";
// import { Movie } from "../components/Interfaces";

// function MovieDetails() {
//   const [currentMovie, setCurrentMovie] = useState<Movie>({} as Movie);

//   const { id } = useParams();
//   const { data } = useRequest(singleMovieGetter(Number(id ?? 0)), { initialData: {} });

//   useEffect(() => {
//     setCurrentMovie(data as Movie);
//   }, [data]);

//   console.log(currentMovie);
//   // also here you need to fill with other date from object in state(img/desc/tags...)
//   return (
//     <div>
//       <Card
//         style={{ width: "100%" }}
//         cover={<img alt="example" src={currentMovie.poster_path} />}
//       ></Card>
//       <h2>{currentMovie.original_title}</h2>
//       <h2>{currentMovie.overview}</h2>
//     </div>
//   );
// }

// export default MovieDetails;
