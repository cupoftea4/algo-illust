import { Link } from "react-router-dom";
import { SortTypeId } from "../types";
import './NavBar.scss';

type SortType = {
  id: SortTypeId;
  name: string;
}

const NavBar = ({type, setType}: {type: SortTypeId, setType: (id: SortTypeId) => void}) => {

  const sorts: SortType[] = [
    {id: 'bubble', name: 'Bubble Sort'},
    {id: 'selection', name: 'Selection Sort'},
    {id: 'shell', name: 'Shell Sort'},
    {id: 'quick', name: 'Quick Sort'},
    {id: 'merge', name: 'Merge Sort'},
    {id: 'counting', name: 'Counting Sort'}
  ];

  return (
    <nav>
      {sorts.map(sort => (
        <Link
          key={sort.id}
          to={'/' + sort.id}
          className={`${type === sort.id && 'selected'}`}
          onClick={() => setType(sort.id)}>
          {sort.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
