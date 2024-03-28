import React from "react";

export default function SearchBar(spec) {
  const updateSearch = (e) => {
    var searchValue = e.target.value.toLowerCase()
    const search = _.filter(spec.unfilteredArray, (item) => (
      item[spec.searchKey].toLowerCase().match(searchValue)
    ));
    spec.setFilteredArray(search);
  }

  return <input
      className="form-control"
      name="name"
      placeholder="Search"
      onChange={updateSearch}
      style={{marginBottom: "10px"}}
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