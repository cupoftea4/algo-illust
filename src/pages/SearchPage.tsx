import React from 'react'
import { Outlet } from 'react-router-dom';
import SearchNavBar from '../components/navigations/SearchNavBar';
import SizeForm from '../components/SizeForm';
import { SearchTypeId } from '../utils/types/search.types';

const SearchPage = () => {
  const [type, setType] = React.useState<SearchTypeId>('binary');


  return (
    <>
      <div>
        <header>
          <SearchNavBar type={type} setType={setType}/>
        </header>
        <span className='centerX'>
          <SizeForm onLengthSubmit={() => {}} />
        </span>         
      </div>
  
      <Outlet/>
    </>

  )
}

export default SearchPage