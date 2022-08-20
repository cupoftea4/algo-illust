import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { SortTypeId } from "../types";

const href: SortTypeId = window.location.href.split('/').pop() as SortTypeId;

const Home = () => {
  const [sortType, setSortType] = useState<SortTypeId>(href);
  return (
    <>
      <Header type={sortType} setType={setSortType} />
      <Outlet context={[sortType, setSortType]} /> 
    </>
  );
};

export default Home; 
