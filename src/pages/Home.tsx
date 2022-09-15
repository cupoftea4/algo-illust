import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFocus from '../hooks/useFocus';
import TerminalArrow from '../images/TerminalArrow';
import styles from './Home.module.scss';

const Home = () => {
  const [showTittle, setShowTittle] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState(0);
  const [inputFocus, setInputFocus]: any = useFocus();
  const navigate = useNavigate();

  useEffect(() => {    
    if (inputFocus.current) setInputFocus();
  }, [showTittle]);

  const menuItems = [
    {name: "sort", path: "sort/bubble"},
    {name: "search", path: "search/binary"},
    {name: "data structures", path: "ds/"}
  ];

  useEffect(() => {
    setTimeout(() => {
      setShowTittle(false);
    }, 1700);

    onkeydown = (e) => {
      if (e.key === 'ArrowDown') {
        setSelectedItem(selectedItem => selectedItem + 1 > 2 ? 0 : selectedItem + 1);
      }
      if (e.key === 'ArrowUp') {
        setSelectedItem(selectedItem => selectedItem - 1 < 0 ? 2 : selectedItem - 1);
      }
      if (e.key === 'Enter') {
        // ...
        setSelectedItem(selectedItem => {
          navigate(menuItems[selectedItem].path);
          return selectedItem;
        });
      }
    };
  }, []);

  const handleInput = (e: any) => {
    if (e.target.value.length < 2) return;
    menuItems.find((item, index) => {
      if (item.name.includes(e.target.value.toLowerCase())) {
        setSelectedItem(index); 
      }
    });
  }

  return (
    <div>
      <div className={styles.central}>
        {showTittle ?
          <h1 className={styles.tittle}>Algorithms Visualizer</h1>
          :
          <div className={styles.menu}>
            <span className={styles.terminalInput} >
              <TerminalArrow />
               <input type="text" onChange={handleInput} ref={inputFocus}/> 
            </span>
            <div className={styles.items}>
              {menuItems.map((item, index) => (
                <Link 
                  className={selectedItem === index ? styles.selected : ''}
                  onMouseOver={() => setSelectedItem(index)} 
                  to={item.path} 
                  key={index}>
                    {item.name}
                </Link>
                ))  
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Home;