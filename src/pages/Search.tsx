import React, { useState } from 'react';
import { getRecommendedWord } from '../apis/instance';
import { debounce } from '../utils/debounce';
import { isEmptyArray } from '../utils/isEmptyArray';
import { setData } from '../utils/setData';
import { SickInfoList } from '../types';
import { getFromCacheStorage, setToCacheStorage } from '../utils/cache';
import { styled } from 'styled-components';
import { ReactComponent as SearchIcon } from '../assets/icon-search.svg';

const debouncedFetchData = debounce(setData, 1000);

export default function Search() {
  const [searchList, setSearchList] = useState<SickInfoList>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const keyword = e.target.value;
    if (!keyword.trim()) return;
    debouncedFetchData<SickInfoList>({
      getCacheCallback: () => getFromCacheStorage(keyword),
      setCacheCallback: (data) => setToCacheStorage(keyword, data, 1000),
      getAPICallback: () => getRecommendedWord(keyword),
      dispatchCallback: (data) => setSearchList(data),
    });
  };

  return (
    <Container>
      <Title>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </Title>
      <SearchBox>
        <StyledSearchIcon width='16px' height='16px' />
        <SearchInput
          type='search'
          placeholder='검색어를 입력해 주세요'
          value={inputValue}
          onChange={changeHandler}
        />
        <SearchButton aria-label='검색'>
          <SearchIcon width='21px' height='21px' />
        </SearchButton>
      </SearchBox>
      {inputValue && (
        <SearchResultContainer>
          <ResultTitle>추천 검색어</ResultTitle>
          <ResultBox>
            <ul>
              {isEmptyArray(searchList) ? (
                <Message>검색어 없음</Message>
              ) : (
                searchList.map((el) => (
                  <SearchText key={el.sickCd}>
                    <StyledSearchIcon width='16px' height='16px' />
                    <span>{el.sickNm}</span>
                  </SearchText>
                ))
              )}
            </ul>
          </ResultBox>
        </SearchResultContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 0;
`;

const Title = styled.h2`
  font-size: 2.125rem;
  font-weight: 700;
  letter-spacing: -0.018em;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 42px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 490px;
  background-color: var(--white);
  padding: 20px 10px 20px 24px;
  border-radius: 42px;
`;

export const StyledSearchIcon = styled(SearchIcon)`
  margin-right: 12px;

  path {
    fill: var(--gray);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  caret-color: var(--blue);
  padding-right: 25px;
  background-color: var(--white);
  font-size: 18px;
  outline: 0;

  &::placeholder {
    font-family: inherit;
    color: var(--gray);
  }
`;

const SearchButton = styled.button`
  width: 48px;
  height: 48px;
  background-color: var(--blue);
  border-radius: 50%;

  svg {
    margin: 0;

    path {
      fill: var(--white);
    }
  }
`;

const SearchResultContainer = styled.div`
  width: 490px;
  max-height: 250px;
  position: absolute;
  top: 360px;
  padding: 18px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const ResultTitle = styled.h3`
  font-size: 12px;
  font-weight: normal;
  color: var(--deepGray);
`;

const ResultBox = styled.div`
  max-height: 160px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--blue);
    border-radius: 50px;
    border: 4px solid var(--blue);
    min-height: 50px;
  }
`;

const SearchText = styled.li`
  display: flex;
  align-items: center;

  span {
    padding: 5px;
    flex: 1;
  }

  &:focus,
  &:focus-visible {
    outline: none;

    span {
      background-color: var(--lightGray);
      border-radius: 5px;
    }
  }
`;

const Message = styled.p`
  color: var(--deepGray);
  text-align: center;
`;
