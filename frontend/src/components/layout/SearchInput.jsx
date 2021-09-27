import React, { useState } from "react";
import { Button } from "reactstrap";
const SearchInput = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <Button color="warning" className="text-white">
            <ion-icon name="search"></ion-icon>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
