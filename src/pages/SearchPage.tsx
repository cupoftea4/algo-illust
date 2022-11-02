import React from 'react'
import { Outlet } from 'react-router-dom';
import SearchNavBar from '../components/navigations/SearchNavBar';
import { SearchTypeId } from '../utils/types/search.types';
import styles from './SearchPage.module.scss';

const SearchPage = () => {
  const [type, setType] = React.useState<SearchTypeId>('binary');
  const [text, setText] = React.useState<string>("Some text");
  const [searchValue, setSearchValue] = React.useState<string>("");

  const startSearching = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const searchIn = data.get('searchIn')?.toString() || text;
    const searchFor = data.get('searchFor')?.toString() || '';
    console.log(searchIn, searchFor);
    setText(searchIn)
    setSearchValue(searchFor)
  }

  return (
    <>
      <header>
        <SearchNavBar type={type} setType={setType}/>      
      </header>
      <span className={styles.center}>
        {type === 'binary' ? null :
          <form onSubmit={startSearching}>
            <textarea name="searchIn" placeholder="Search in..." rows={3} cols={30} />
            <input type="text" name="searchFor" placeholder="Search for..." />
            <input type="submit" value="Run" title="Start" />
          </form>
        }
      </span>   
      <main>
        <Outlet
          context={[text, searchValue]}
         />
      </main>
    </>

  )
}

export default SearchPage