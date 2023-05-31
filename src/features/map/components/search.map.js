import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "../../../services/location/location.context";

const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const onChangeSearch = (query) => setSearchQuery(query);
  useEffect(() => {
    search(searchKeyword);
  }, []);
  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <SearchBar
        elevation={1}
        placeholder="Search for a location"
        value={searchKeyword}
        icon="map"
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
//Styles
const SearchContainer = styled.View`
  position: absolute;
  z-index: 2;
  width: 100%;
  top: 40px;
`;
const SearchBar = styled(Searchbar)`
  margin: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export default Search;
