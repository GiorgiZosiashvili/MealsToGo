import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "../../../services/location/location.context";

const Search = ({ onToggle, showFavorite, favorites }) => {
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
    <SearchBar
      elevation={2}
      icon={
        Object.keys(favorites).length !== 0 && showFavorite
          ? "heart"
          : "heart-outline"
      }
      onIconPress={onToggle}
      placeholder="Search for a location"
      value={searchKeyword}
      onSubmitEditing={() => {
        search(searchKeyword);
      }}
      onChangeText={(text) => {
        setSearchKeyword(text);
      }}
    />
  );
};
//Styles
const SearchBar = styled(Searchbar)`
  margin: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export default Search;
