import { Link } from "react-router-dom";
import { SortTypeId } from "../types";
import styles from './NavBar.module.scss';

type SortType = {
  id: SortTypeId;
  name: string;
}

type NavBarProps = {
  type: SortTypeId;
  setType: (type: SortTypeId) => void;
}

const NavBar = ({type, setType}: NavBarProps) => {

  const sorts: SortType[] = [
    {id: 'bubble', name: 'Bubble Sort'},
    {id: 'selection', name: 'Selection Sort'},
    {id: 'shell', name: 'Shell Sort'},
    {id: 'merge', name: 'Merge Sort'},
    {id: 'quick', name: 'Quick Sort'},
    {id: 'counting', name: 'Counting Sort'}
  ];

  return (
      <nav>
        {sorts.map(sort => (
          <Link
            key={sort.id}
            to={'/' + sort.id}
            className={`${type === sort.id && styles.textSelected}`}
            onClick={() => setType(sort.id)}
          >
            <div className={`${type === sort.id && styles.selected}`}></div>
            {sort.name}
          </Link>
        ))}

      </nav>      
  );
};

export default NavBar;
