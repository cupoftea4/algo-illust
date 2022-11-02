import NavBar from "../components/navigations/SortNavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { HighlightedElements, SortArray, SortTypeId } from "../utils/types/sort.types";
import styles from "./SortPage.module.scss";
import generateArray from "../utils/sorts/generateArray";
import Params from "../components/sorts/Params";
import SizeForm from "../components/SizeForm";


const SortPage = () => {
  const [array, setArray] = useState<SortArray>([]);
  const [swappingElements, setSwappingElements] = useState<HighlightedElements>({});
  const [illustDelay, setIllustDelay] = useState<number>(250);
  const [sortType, setSortType] = useState<SortTypeId>(window.location.href.split("/").pop() as SortTypeId);
  const [isASC, setIsASC] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [variant, setVariant] = useState<number>(0);

  const onLengthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSorting) {
      const data = new FormData(event.currentTarget);
      const length = parseInt(data.get("arrayLength")?.toString() || "0");
      setLoading(true);
      const array = await generateArray(length, variant);
      setLoading(false);
      setArray(array as SortArray);
    } else {
      alert("Please wait for the current sorting to finish.");
    }
  };

  return (
    <>
      <header>
        <NavBar type={sortType} setType={setSortType} />
        <span>
          <button
            className={`${styles.sortWay} ${!isASC && styles.checked}`}
            onClick={() => setIsASC(!isASC)}
            title={`Sort in ${isASC ? "ascending" : "descending"} order`}
          >
            {isASC ? "Asc" : "Desc"}
          </button>
          <Params setIllustDelay={setIllustDelay} setVariant={setVariant} />
        </span>
      </header>
      <span className='centerX'>
          <SizeForm onLengthSubmit={onLengthSubmit} />
      </span>
      {loading ?
        <span className={styles.status}>Fetching data...</span> 
      : <Outlet context={[
          [array, setArray],
          [isSorting, setIsSorting],
          [swappingElements, setSwappingElements],
          isASC,
          illustDelay
        ]} />}
    </>
  );
};

export default SortPage;