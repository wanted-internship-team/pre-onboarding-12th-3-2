import React, { useState } from 'react';
import { getRecommendedWord } from '../apis/instance';
import { debounce } from '../utils/debounce';
import { isEmptyArray } from '../utils/isEmptyArray';
import { setData } from '../utils/setData';
import { SickInfoList } from '../types';

export default function Search() {
  const [searchList, setSearchList] = useState<SickInfoList>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const keyword = e.target.value;

    debouncedFetchData<SickInfoList>({
      getAPICallback: () => getRecommendedWord(keyword),
      dispatchCallback: (data) => setSearchList(data),
    });
  };

  return (
    <div>
      <input
        type='text'
        placeholder='검색어를 입력해 주세요'
        value={inputValue}
        onChange={changeHandler}
      />
      <button type='button'>확인</button>
      <div className='should-be-a-component'>
        <ul>
          {isEmptyArray(searchList) ? (
            <p>검색어 없음</p>
          ) : (
            searchList.map((el) => <li key={el.sickCd}>{el.sickNm}</li>)
          )}
        </ul>
      </div>
    </div>
  );
}

const debouncedFetchData = debounce(setData, 1000);
