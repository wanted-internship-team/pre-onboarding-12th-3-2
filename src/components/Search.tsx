import React, { useState, useRef, useLayoutEffect } from 'react';
import { styled } from 'styled-components';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

import { getRecommendedWord } from '../apis/instance';
import { getFromCacheStorage, setToCacheStorage } from '../utils/cache';
import { debounce } from '../utils/debounce';
import { setData } from '../utils/setData';

import { SickInfoList } from '../types';
import { ReactComponent as SearchIcon } from '../assets/icon-search.svg';

const debouncedFetchData = debounce(setData, 1000);

export default function Search() {
  const [searchList, setSearchList] = useState<SickInfoList>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // 포커스 값 초기화
    setSelectedIndex(-1);
    const keyword = e.target.value;
    if (!keyword.trim()) return;
    debouncedFetchData<SickInfoList>({
      getCacheCallback: () => getFromCacheStorage(keyword),
      setCacheCallback: (data) => setToCacheStorage(keyword, data, 1000),
      getAPICallback: () => getRecommendedWord(keyword),
      dispatchCallback: (data) => setSearchList(data),
    });
  };

  const selectListItemByKeyArrow = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLLIElement>,
  ) => {
    if (e.nativeEvent.isComposing) return;
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const lastIndex = searchList.length - 1;
        setSelectedIndex((prev) => (prev < lastIndex ? prev + 1 : 0));
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const lastIndex = searchList.length - 1;
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : lastIndex));
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <SearchBar
        inputValue={inputValue}
        selectListItemByKeyArrow={selectListItemByKeyArrow}
        changeHandler={changeHandler}
      />
      {inputValue && (
        <SearchResults
          searchList={searchList}
          selectedIndex={selectedIndex}
          selectListItemByKeyArrow={selectListItemByKeyArrow}
          inputValue={inputValue}
        />
      )}
    </>
  );
}

export const StyledSearchIcon = styled(SearchIcon)`
  margin-right: 12px;

  path {
    fill: var(--gray);
  }
`;
