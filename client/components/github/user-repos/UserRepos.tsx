import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useAppSelector } from '../../../store/store';
import { selectProfileState } from '../../../containers/profile/profileSlice';
import './UserRepos.scss';

interface ISelect {
  selected: number;
}

export const UserRepos: React.FC = () => {
  const itemsPerPage = 10;
  const [offset, setOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(10);
  const profileState = useAppSelector(selectProfileState);
  const { repos } = profileState.value;
  const slicedData = repos.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(repos.length / itemsPerPage);

  const handlePageClick = (event: ISelect) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
    const offset = currentPage * itemsPerPage;
    setOffset(offset);
  };

  return (
    <div className="repos-container">
      <header className="header">
        <h4 className="text-center">Repos for {profileState.value.profile.name}</h4>
      </header>
      <div className="content">
        <ul className="repos-list">
          {slicedData &&
            slicedData.map((item) => (
              <li key={`repo-${item.name}`} className="list-item">
                <a href={item.html_url} target="_blank">
                  {item.name}
                </a>
              </li>
            ))}
        </ul>
        <div className="pagination">
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
      </div>
    </div>
  );
};
