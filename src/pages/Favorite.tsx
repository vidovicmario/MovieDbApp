// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// // table
// import { Space, Table, Tag } from "antd";
// import type { ColumnsType } from "antd/es/table";
// import { getFavoriteMovie } from "../store/favoriteSlice";

// interface DataType {
//   id: string;
//   title: string;
//   date: string;
//   vote_average: string;
//   key: string;
//   // tags: string[];
// }

// function Favorite() {
//   const { favorite } = useSelector((state: any) => state.favoriteStore);
//   const [favoriteItems, setFavoriteItems] = useState([]);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const favoriteData = localStorage.getItem("favorite");
//     if (favoriteData !== null) {
//       const parsedData = JSON.parse(favoriteData);
//       setFavoriteItems(parsedData);
//     }
//   }, []);

//   const hanldeFavorite = (id: String) => {
//     console.log(id);
//     const removeFromFavorite = favoriteItems.find((el) => el.id === id);
//     if (removeFromFavorite) {
//       dispatch(getFavoriteMovie(removeFromFavorite));
//     }
//   };

//   const columns: ColumnsType<DataType> = [
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: "title",
//       render: (text) => <a>{text}</a>,
//     },
//     {
//       title: "Date",
//       dataIndex: "release_date",
//       key: "release_date",
//     },
//     {
//       title: "Vote",
//       dataIndex: "vote_average",
//       key: "vote_average",
//     },
//     {
//       title: "Tags",
//       key: "tags",
//       dataIndex: "tags",
//       render: (_, { tags }) => (
//         <>
//           {tags.map((tag) => {
//             let color = tag.length > 5 ? "geekblue" : "green";
//             if (tag === "loser") {
//               color = "volcano";
//             }
//             return (
//               <Tag color={color} key={tag}>
//                 {tag.toUpperCase()}
//               </Tag>
//             );
//           })}
//         </>
//       ),
//     },
//     {
//       title: "Favorite",
//       key: "id",
//       dataIndex: "id",
//       render: (id) => (
//         <Space size="middle">
//           <a onClick={() => hanldeFavorite(id)}>Unfavorite</a>
//         </Space>
//       ),
//     },
//   ];

//   const data: DataType[] = favoriteItems;

//   return (
//     <div>
//       <Table
//         columns={columns}
//         dataSource={data}
//         pagination={false}
//         rowKey={(record) => record.id}
//       />
//     </div>
//   );
// }

// export default Favorite;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getFavoriteMovie } from "../store/favoriteSlice";
import { Movie } from "../components/Interfaces";

interface DataType {
  id: number;
  title: string;
  date: string;
}

function Favorite() {
  const { favorite } = useSelector((state: any) => state.favoriteStore);
  const [favoriteItems, setFavoriteItems] = useState<Movie[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.hasOwnProperty("favorite")) {
      const favoriteFromLocalStorage = localStorage.getItem("favorite");
      if (favoriteFromLocalStorage !== null) {
        setFavoriteItems(JSON.parse(favoriteFromLocalStorage));
      }
    }
  }, [favorite]);

  // useEffect(() => {
  //   if (localStorage.hasOwnProperty("favorite")) {
  //     setFavoriteItems(JSON.parse(localStorage.getItem("favorite")));
  //   }
  // }, [favorite]); ovako je bilo prije

  const hanldeFavorite = (id: any) => {
    console.log(id);
    const removeFromFavorite = favoriteItems.find((el) => el.id === id);
    if (removeFromFavorite) {
      dispatch(getFavoriteMovie(removeFromFavorite));
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "release_date",
      key: "release_date",
    },
    {
      title: "Vote",
      dataIndex: "vote_average",
      key: "vote_average",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (id) => (
        <Space size="middle">
          <a onClick={() => hanldeFavorite(id)}>Unfavorite</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = favoriteItems;

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.id}
      />
      <button>Celar all</button>
    </div>
  );
}

export default Favorite;
