import React, { useState, useEffect } from "react";
import { Layout, Checkbox, Pagination, Select, DatePicker } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useRequest } from "alova";
import genresItemGetter from "../alova/genresItemGetter";
import { useDispatch } from "react-redux";
import { getCurrentPage } from "../store/paginationSlice";
import { getGenres } from "../store/genreFilter";
import { css } from "@emotion/react";

const sidebarStyles = css`
  padding: 25px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  height: 1100px;
  font-size: 20px;
  min-width: 360px;

  .ant-layout-sider-children {
    .genresList {
      padding-top: 12px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;

      // Because have default margin for checkbox!
      label {
        margin-inline-start: 0px !important;
      }
    }
  }

  .pagination {
    margin-top: 20px;
    .ant-pagination-simple-pager {
      display: none;
    }
  }
`;

const btnStyle = css`
  width: 100%;
  margin-top: 20px;
  background-color: tomato;
  border-style: none;
  :hover {
    background-color: red;
  }
`;
interface Genres {
  id: number;
  name: string;
}

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [genresList, setGenresList] = useState<Genres[]>([]);
  const [genreFilter, setGenreFilter] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useDispatch();

  const onChange = (e: CheckboxChangeEvent) => {
    const selectedGenre = Number(e.target.name);
    //kada odaberemo genre da li odabrani zanr postoji i ako postoji
    //daj nam sve sto nije taj gnere
    if (genreFilter.includes(selectedGenre)) {
      setGenreFilter((prev) => prev.filter((g) => g !== selectedGenre));
    }
    //ako ima vise odabranih zanrova ulazi ovdje dodajemo stejtu te dodatne zanrove
    else {
      setGenreFilter((prev) => [...prev, selectedGenre]);
    }
  };

  //paginacija i logika za klik na iducu ili predhodnu stranicu
  const handleCurrentPage = (calc: "plus" | "minus") => {
    if (calc === "plus") {
      setCurrentPage((prev) => prev + 1);
    } else if (calc === "minus" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  //od areja elemenata pravimo string za request
  const genresString = genreFilter.join(",");
  //userequest za request podataka
  const { data }: any = useRequest(genresItemGetter, {
    initialData: { genres: [] },
  });

  //na promjenu dodaj data.genres u stejt
  useEffect(() => {
    setGenresList(data.genres);
  }, [data]);

  //na pomjenu filtera i paginacije pozovem funkcije iz reduxa
  useEffect(() => {
    dispatch(getGenres(genresString));
    dispatch(getCurrentPage(currentPage));
  }, [genreFilter, currentPage, dispatch]);

  //logika za paginaciju
  const itemRender = (
    page: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next" | undefined,
    originalElement: React.ReactNode
  ) => {
    if (type === "prev") {
      return <a onClick={() => handleCurrentPage("minus")}>Previous</a>;
    }
    if (type === "next") {
      return <a onClick={() => handleCurrentPage("plus")}>Next</a>;
    }
    return originalElement;
  };

  return (
    <>
      <Sider width="100%" theme="light" trigger={null} collapsible css={sidebarStyles}>
        <h3>Filters:</h3>
        <p>Sort by:</p>
        <Select
          defaultValue="popular"
          style={{ width: "100%" }}
          options={[
            { value: "popular", label: "Popular" },
            { value: "lucy", label: "Unpopular" },
          ]}
        />
        <p>Release Year:</p>
        <Select
          defaultValue="year"
          style={{ width: "100%" }}
          options={[{ value: "year", label: "Year" }]}
        />
        <DatePicker picker="year" style={{ width: "100%" }} />
        <div className="genresList">
          <p>Genres:</p>

          {genresList.map((genre) => (
            <Checkbox
              style={{ fontSize: "18px" }}
              onChange={onChange}
              key={genre.id}
              name={String(genre.id)}
            >
              {genre.name}
            </Checkbox>
          ))}
        </div>

        <button css={btnStyle} onClick={() => window.location.reload()}>
          Clear Filter
        </button>

        <div className="pagination">
          <Pagination simple total={500} itemRender={itemRender} />
          <div style={{ color: "black" }}>{currentPage} of 38172</div>
        </div>
      </Sider>
    </>
  );
};

export default Sidebar;
