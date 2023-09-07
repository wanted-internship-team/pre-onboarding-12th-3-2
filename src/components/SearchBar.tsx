import React from 'react';
import { styled } from 'styled-components';
import { StyledSearchIcon } from './Search';

interface Iprops {
  inputValue: string;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  selectListItemByKeyArrow: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar(props: Iprops) {
  const { inputValue, setSelectedIndex, selectListItemByKeyArrow, changeHandler } = props;

  const resetSelectedIndex = () => {
    setSelectedIndex(-1);
  };

  return (
    <SearchBox>
      <StyledSearchIcon width='16px' height='16px' />
      <SearchInput
        type='search'
        placeholder='검색어를 입력해 주세요'
        value={inputValue}
        onKeyDown={selectListItemByKeyArrow}
        onChange={changeHandler}
        onClick={resetSelectedIndex}
      />
      <SearchButton aria-label='검색'>
        <StyledSearchIcon width='21px' height='21px' />
      </SearchButton>
    </SearchBox>
  );
}

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 490px;
  background-color: var(--white);
  padding: 20px 10px 20px 24px;
  border-radius: 42px;
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
