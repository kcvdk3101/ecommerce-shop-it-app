import React, { useState } from "react";
import { Button, Form, Input, InputGroup, InputGroupAddon } from "reactstrap";

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
    <Form onSubmit={searchHandler}>
      <InputGroup>
        <Input
          type="text"
          id="search_field"
          placeholder="Enter Product Name ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <InputGroupAddon addonType="append">
          <Button color="warning" className="text-white">
            <i class="fa fa-search" aria-hidden="true"></i>
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  );
};

export default SearchInput;
