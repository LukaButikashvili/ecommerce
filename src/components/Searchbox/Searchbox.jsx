import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import searchData from "../../utils/searchData";
import ListView from "../ListView/ListView";
import UsersView from "../UsersView/UsersView";
import SearchBoxCSS from "./SearchBox.module.css";

const SearchBox = ({ data, linkPath }) => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestData, setSuggestData] = useState([]);
  const [showSuggestedData, setShowSuggestedData] = useState(false);

  const changeSearchedValue = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    if (!searchValue.length) {
      setShowSuggestedData(false);
      return;
    }
    const timer = setTimeout(() => {
      const suggestedData = searchData(data, searchValue, linkPath);
      setSuggestData(suggestedData);
      setShowSuggestedData(true);
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, data]);

  const ref = useRef();

  const dessapearSuggestions = (event) => {
    if (ref.current && ref.current.contains(event.target)) {
      return;
    }
    setShowSuggestedData(false);
  };

  useEffect(() => {
    window.addEventListener("click", dessapearSuggestions);

    return () => {
      window.removeEventListener("click", dessapearSuggestions);
    };
  });

  return (
    <div className={SearchBoxCSS.searchBoxWrapper} ref={ref}>
      <input
        onChange={(e) => changeSearchedValue(e)}
        name="search"
        value={searchValue}
        type="text"
        placeholder="Search"
      />
      {showSuggestedData && (
        <div className={SearchBoxCSS.suggestionsWrapper}>
          {linkPath === "products" ? (
            <ListView data={suggestData} />
          ) : (
            suggestData.map((user) => {
              return (
                <UsersView
                  key={user.id}
                  firstname={user.name.firstname}
                  lastname={user.name.lastname}
                  phone={user.phone}
                  email={user.email}
                  id={user.id}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
