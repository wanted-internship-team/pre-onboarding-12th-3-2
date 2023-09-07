import React, { useRef, useLayoutEffect } from 'react';
import { styled } from 'styled-components';
import HighlightedText from './HighlightedText';
import { isEmptyArray } from '../utils/isEmptyArray';
import { StyledSearchIcon } from './Search';
import { SickInfo, SickInfoList } from '../types';

interface Iprops {
  searchList: SickInfoList;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  selectListItemByKeyArrow: (e: React.KeyboardEvent<HTMLLIElement>) => void;
  inputValue: string;
}

export default function SearchResults(props: Iprops) {
  const { searchList, selectedIndex, setSelectedIndex, selectListItemByKeyArrow, inputValue } =
    props;

  const liRef = useRef<HTMLLIElement | null>(null);

  useLayoutEffect(() => {
    if (liRef.current) {
      liRef.current.focus();
    }
  });

  const resetSelectedIndex = (idx: number) => {
    setSelectedIndex(idx);
  };

  return (
    <SearchResultContainer>
      <ResultTitle>추천 검색어</ResultTitle>
      <ResultBox>
        <ul>
          {isEmptyArray(searchList) ? (
            <Message>검색어 없음</Message>
          ) : (
            searchList.map((el: SickInfo, idx: number) => (
              <SearchText
                key={el.sickCd}
                ref={idx === selectedIndex ? liRef : null}
                tabIndex={selectedIndex === idx ? 0 : -1}
                onKeyDown={selectListItemByKeyArrow}
                onClick={() => resetSelectedIndex(idx)}
              >
                <StyledSearchIcon width='16px' height='16px' />
                {el.sickNm.includes(inputValue) ? (
                  <HighlightedText parts={el.sickNm.split(inputValue)} value={inputValue} />
                ) : (
                  <span>{el.sickNm}</span>
                )}
              </SearchText>
            ))
          )}
        </ul>
      </ResultBox>
    </SearchResultContainer>
  );
}

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
  overflow-y: scroll;

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
  padding: 8px 0;

  span {
    padding: 5px;
    flex: 1;
  }

  &:focus,
  &:focus-visible {
    outline: none;
    color: black;
    font-weight: 500;
    background-color: rgba(49, 130, 246, 0.2);
    border-radius: 5px;
  }
`;

const Message = styled.p`
  color: var(--deepGray);
  text-align: center;
`;
