import _ from 'lodash';
import React from 'react';

class Pagination extends React.Component {
  /**
   * Set's up how many pages should be displayed for the list of items passed in, based on the page size. Only shows 10 pages at a time no matter which page is clicked.
   *
   * @param  {Number} totalItems  The total number of items in the list.
   * @param  {Number} currentPage The current page showing for the user.
   * @return {Object}             An object containing the properties of how many pages should be visible to the user.
   */
  static getPager(totalItems, currentPage = 1) {
    const pageSize = 5;
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage;
    let endPage;

    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else if (totalPages > 10) {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min((startIndex + pageSize) - 1, totalItems - 1);
    const pages = _.range(startPage, endPage + 1);

    return { totalItems, currentPage, pageSize, totalPages, startPage, endPage, startIndex, endIndex, pages };
  }
  constructor(props) {
    super(props);

    this.state = { pager: {} };
  }
  componentWillMount() {
    this.setPage(this.props.initialPage);
  }
  /**
   * Sets the page visible based on the page number clicked.
   *
   * @param {Number} page       A page number.
   * @param {Array} items      The items to be visible for that page.
   * @param {Number} totalItems The total number of items.  For determining how many pages should be visible.
   */
  setPage(page, items = this.props.items, totalItems = this.props.totalItems) {
    let pager = this.state.pager;

    if (page < 1 || page > pager.totalItems) {
      return;
    }

    pager = this.constructor.getPager(totalItems, page);

    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    this.setState({ pager });

    this.props.onChangePage(page, pageOfItems);
  }
  render() {
    const pager = this.state.pager;
    return (
      <nav className="text-center">
        <ul className="pagination  pagination-sm">
          <li className={pager.currentPage === 1 ? 'disabled' : ''}>
            <a
              onClick={() => this.setPage(1)}
              role="button"
              aria-label="First page"
              tabIndex="0"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pager.pages.map(page =>
            <li key={Math.random()} className={pager.currentPage === page ? 'active' : ''}>
              <a
                onClick={() => this.setPage(page)}
                role="button"
                aria-label={`Page number ${page}`}
                tabIndex="0"
              >
                {page}
              </a>
            </li>,
          )}
          <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
            <a
              onClick={() => this.setPage(pager.totalPages)}
              role="button"
              aria-label="Last page"
              tabIndex="0"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

Pagination.defaultProps = {
  initialPage: 1,
  items: [],
  totalItems: 0,
  onChangePage: () => {},
};

Pagination.propTypes = {
  initialPage: React.PropTypes.number,
  items: React.PropTypes.array.isRequired,
  onChangePage: React.PropTypes.func.isRequired,
  totalItems: React.PropTypes.number,
};

export default Pagination;
