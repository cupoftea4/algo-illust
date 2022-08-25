import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { SortArray, SortTypeId } from "../types";
import styles from "./Home.module.scss";
import generateArray from "../features/generateArray";

const href: SortTypeId = window.location.href.split("/").pop() as SortTypeId;

const Home = () => {
  const [array, setArray] = useState<SortArray>([]);
  const [illustDelay, setIllustDelay] = useState<number>(250);
  const [sortType, setSortType] = useState<SortTypeId>(href);
  const [isASC, setIsASC] = useState<boolean>(true);
  const [variant, setVariant] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const waitDelay = () =>
    new Promise((resolve) => setTimeout(resolve, illustDelay));

  const onLengthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const length = parseInt(data.get("arrayLength")?.toString() || "0");
    setLoading(true);
    const array = await generateArray(length, variant);
    setLoading(false);
    setArray(array as SortArray);
  };

  return (
    <>
      <div>
        <span className={styles.header}>
          <NavBar type={sortType} setType={setSortType} />
          <span>
            <button
              className={`${styles.sortWay} ${!isASC && styles.checked}`}
              onClick={() => setIsASC(!isASC)}
              title={`Sort in ${isASC ? "ascending" : "descending"} order`}
            >
              {isASC ? "Asc" : "Desc"}
            </button>
            <label htmlFor="illustSpeed">Speed:</label>
            <select
              name="illustSpeed"
              defaultValue={3600 / 9}
              title="Animation speed"
              onChange={(e) => setIllustDelay(parseInt(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={3600 / (i + 2)}>{i + 1}</option>
              ))}
            </select>
            <label htmlFor="illustSpeed">Var:</label>
            <select
              name="variant"
              defaultValue={0}
              onChange={(e) => setVariant(parseInt(e.target.value))}
            >
              {Array.from({ length: 18 }, (_, i) => (
                <option key={i} value={i}>{i === 0 ? "rand" : i}</option>
              ))}
            </select>
          </span>
        </span>

        <span className={styles.params}>
          <form onSubmit={onLengthSubmit}>
            <span>
              <label htmlFor="arrayLength">Array Length:</label>
              <input
                name="arrayLength"
                placeholder="length"
                type={"number"}
                defaultValue="10"
                max={40}
                min={2}
              />
            </span>
            <span>
              <input type="submit" value="Run" />
            </span>
          </form>
        </span>
      </div>
      {loading ?
        <div className={styles.status}>Fetching data...</div> 
      : <Outlet context={[array, setArray, waitDelay, isASC, illustDelay]} />}
    </>
  );
};

export default Home;