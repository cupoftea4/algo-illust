import { Link } from "react-router-dom";
import HomeIcon from "../assets/HomeIcon";
import { DSTypeId, DSType } from "../utils/types/ds.types";
import styles from './NavBar.module.scss';

type NavBarProps = {
  type: DSTypeId;
  setType: (type: DSTypeId) => void;
}

const NavBar = ({type, setType}: NavBarProps) => {

  const dataStructs: DSType[] = [
    {id: 'stack', name: 'Stack'},
    {id: 'queue', name: 'Queue'},
    {id: 'linked-list', name: 'Linked List'},
    {id: 'doubly-linked', name: 'Doubly List'},
    {id: 'circular-linked', name: 'Circular List'},
    {id: 'deque', name: 'Deque'},
    {id: 'tree', name: 'Tree'},
  ];

  return (
      <nav>
        <Link to="/">
          <HomeIcon/>
        </Link>
        {dataStructs.map(sort => (
          <Link
            key={sort.id}
            to={'/ds/' + sort.id}
            className={`${type === sort.id && styles.textSelected}`}
            onClick={() => setType(sort.id)}
            title={sort.name}
          >
            <div className={`${type === sort.id && styles.selected}`}></div>
            {sort.name}
          </Link>
        ))}
      </nav>      
  );
};

export default NavBar;
