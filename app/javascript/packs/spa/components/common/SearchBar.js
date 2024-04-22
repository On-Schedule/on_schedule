import React from "react";
import PropTypes from 'prop-types';

const { func, shape, string, array } = PropTypes;

SearchBar.propTypes = {
  setFilteredArray: func.isRequired,
  searchKey: string.isRequired,
  unfilteredArray: array,
  style: shape({}),
  className: string,
};

export default function SearchBar(spec) {
  const {
    setFilteredArray,
    searchKey,
    unfilteredArray,
    className,
    style
  } = spec;

  const updateSearch = (e) => {
    var searchValue = e.target.value.toLowerCase()
    const search = _.filter(unfilteredArray, (item) => (
      item[searchKey].toLowerCase().match(searchValue)
    ));
    setFilteredArray(search);
  }

  return <input
      name="name"
      placeholder="Search"
      onChange={updateSearch}
      className={className + " form-control"}
      style={style}
    />
}
// ####################         template for implementing the search bar         ####################

// import SearchBar from '../common/SearchBar';

// const [searchedItem, setSearchedItem] = useState([])

// useEffect(() => {
//     setSearchedItem(ITEMS_ARRAY)
// }, [ITEMS_ARRAY])

// <SearchBar unfilteredArray={ITEMS_ARRAY} searchKey={"KEY"} setFilteredArray={setSearchedItem} />

// ##################################################################################################