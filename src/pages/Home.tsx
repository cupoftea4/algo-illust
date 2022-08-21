import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { SortTypeId } from "../types";

const href: SortTypeId = window.location.href.split('/').pop() as SortTypeId;

const Home = () => {
  const [sortType, setSortType] = useState<SortTypeId>(href);
  const [arrayLength, setArrayLength] = useState<number>(10);

  const arrayLengthChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const len = parseInt(e.target.value);
    if (len < 40 && len >= 0) {
      setArrayLength(len);
    }
  }

  return (
    <>
      <NavBar type={sortType} setType={setSortType} />
      <span style={{color: 'white'}}>
        <input value={arrayLength} onChange={arrayLengthChanged} type={'number'} max={40}/>
        <button>Run</button></span>
      <Outlet context={[sortType, setSortType]} /> 
    </>
  );
};

export default Home; 
