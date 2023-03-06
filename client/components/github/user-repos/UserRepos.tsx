import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useAppSelector } from '../../../store/store';
import { selectProfileState } from '../../../containers/profile/profileSlice';
import './UserRepos';

export const UserRepos: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(10);
  const profileState = useAppSelector(selectProfileState);
  const { repos } = profileState.value;
  const slicedData = repos.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(repos.length / itemsPerPage);

  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * itemsPerPage;
    setOffset(offset);
    setCurrentPage(selectedPage);
  };

  return (
    <div className="repos-container">
      <h4 className="text-center">Repos for {profileState.value.profile.name}</h4>
      <ul className="list-group">
        {slicedData &&
          slicedData.map((item) => (
            <li key={`repo-${item.name}`} className="list-group-item">
              <a href={item.html_url} target="_blank">
                {item.name}
              </a>
            </li>
          ))}
      </ul>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(e) => handlePageClick(e)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};
