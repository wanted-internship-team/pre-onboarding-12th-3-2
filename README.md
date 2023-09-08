# 원티드 프리온보딩 12th 2팀 3주차 과제

## 🤝 과제 소개 및 목적

팀원 모두가 하나의 주제의 과제를 수행한 뒤, 가장 효율적이라고 판단되는 코드(또는 기능)를 Best Practice로 선정하여 최종 결과물에 반영합니다.
Best Practice를 선정하기 위해 작성한 코드를 동료에게 이해하기 쉽게 설명하고, 타인의 코드를 이해할 수 있어야 합니다.

>💡 좋은 코드를 만들기 위해 고민하고, 그 과정에서 팀으로 일하는 법에 익숙해집니다. <br />
>🗓️ 진행 기간: 23년 9월 5일 ~ 23년 9월 8일

※ 본 과제는 검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현 프로젝트입니다.

## 👨‍👩‍👧‍👦 팀 정보

[Team Notion](https://www.notion.so/Wanted-Pre-onboarding-FE-2-71038c8adfd74fffb28a3cf2d182e025?pvs=21)

<table>
<tr>
    <td align="center">
        <a href="https://github.com/JJineu">
        <img src="https://media.discordapp.net/attachments/1144505552005775440/1144506291209912371/KakaoTalk_20220901_060732626.jpg?width=814&height=814" width="100px;" alt=""/>
        <br />
        <sub><b>@JJineu</b></sub>
        <br />
        <sub><b>김현진</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/devsomda">
        <img src="https://avatars.githubusercontent.com/u/109324517?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>@devsomda</b></sub>
        <br />
        <sub><b>박다솜(팀장)</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/mihyunLee">
        <img src="https://avatars.githubusercontent.com/u/51310674?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>@mihyunLee</b></sub>
        <br />
        <sub><b>이미현</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/devseop">
        <img src="https://avatars.githubusercontent.com/u/102455161?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>@devseop</b></sub>
        <br />
        <sub><b>이윤섭</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/sjuhan123">
        <img src="https://avatars.githubusercontent.com/u/81420856?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>@sjuhan123</b></sub>
        <br />
        <sub><b>한승주</b></sub>
        </a>
    </td>
</tr>
</table>

## 프로젝트 소개

### 구현 내용
![preview-image](https://github.com/wanted-internship-team/pre-onboarding-12th-3-2/assets/109324517/fb9cfa05-ab31-45a4-9298-949c39cbf108)

```
- 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
  - 검색어가 없을 시 “검색어 없음” 표출

- API 호출별로 로컬 캐싱 구현
  - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
  - expire time을 구현
    
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
    
- API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

- 키보드만으로 추천 검색어들로 이동 가능하도록 구현
```

### 실행 방법

- 배포 링크: https://pre-onboarding-12th-3-2.vercel.app/
- 링크가 실행되지 않는 경우 아래 명령어를 차례대로 입력하여 실행해주세요.

```jsx
// client
git clone https://github.com/wanted-internship-team/pre-onboarding-12th-2-2.git
npm install
npm start

// server
git clone https://github.com/walking-sunset/assignment-api.git
npm install
npm start
```

<br />

## 💬 프로젝트 진행 과정
> ※ 논의에 대한 내용은 팀 노션 페이지에서 보다 자세히 확인할 수 있습니다: [노션 바로가기](https://somtha.notion.site/3-ea1ca1bd81884f4ca676c62905617284?pvs=4)

### ✅ Assignment 1
- API 호출을 통한 검색어 추천 기능 구현
- 검색어가 없을 시 “검색어 없음” 표출

### 🤝 논의 맟 결정 사항
**1. api 호출 방식: axios vs fetch**
> api request가 하나만 존재하고 있어, axios를 도입할 것인가에 대한 논의를 진행했습니다. <br /> 팀원들의 코드를 바탕으로, axios의 interceptor를 활용하는 것이 fetch를 활용하는 것보다 가시성이 높고 비동기로직을 직관적으로 파악할 수 있음을 확인했습니다.

▶ 따라서, axios를 사용하여 api를 호출하고 응답값을 반환하였습니다.

**2. api path 상수화**
> 로컬 코드 기준, `baseUrl/sick`의 요청 url에서 요청 경로 상수 지정 범위에 대해 논의했습니다. <br /> 현재는 api가 하나만 존재해 상수 하나로 관리할 수도 있지만, 추후 확장 가능성을 고려하기로 결정했습니다.

▶ endpoint를 제외한 부분을 base url로 지정하고 endpoint를 객체화하여 분리했습니다. <br />
`export const BASE_URL = process.env.REACT_APP_API_BASE_URL;` <br />
`export const API_PATH = Object.freeze({SICK: '/sick'});`

**3. 검색어 없음 처리 방식** <br />
▶ fetch 응답을 저장한 상태값(searchList)의 길이에 따라 메시지를 렌더링 합니다. <br /> 상태값의 길이를 반환하는 `isEmptyArray` 함수를 통해 길이를 확인합니다.

<br />

### ✅ Assignment 2
- API 호출별로 로컬 캐싱 구현 
- expire time 구현 (선택)
  
### 🤝 논의 맟 결정 사항
**1. 캐시 저장소**
> Cache Storage, Local Storage, Session Storage 및 리액트 상태로 저장하는 것까지 다양한 선택지를 두고 논의를 진행했습니다. 유저의 저장 횟수, 서비스의 성능 등을 고려하였습니다. Local Storage, Session Storage의 경우 용량이 적으며 캐싱을 하기에 더 권장되는 Cache Storage가 있기에 후보에서 제외하였습니다. 리액트 상태 저장의 경우 프로젝트 자체가 가지게 되는 메모리 값이 커질 것이 우려되었고, Cache Storage를 이용해 외부 기억 공간을 사용함으로써 메모리상의 이점을 가져가기로 결정했습니다.  

▶ 캐시를 저장하는 함수 `setToCacheStorage`와 값을 가져오는 `getFromCacheStorage`함수를 구현하고, cache가 있을 경우 해당 데이터를 활용하고, 없는 경우에만 요청 api를 호출합니다.
```
// data fetch 과정
  debouncedFetchData<SickInfoList>({
    getCacheCallback: () => getFromCacheStorage(keyword),
    setCacheCallback: (data) => setToCacheStorage(keyword, data, CACHE_RESET_TIME),
    getAPICallback: () => getRecommendedWord(keyword),
    dispatchCallback: (data) => setSearchList(data),
  });
```

**1-1. 캐시 관련 클래스 생성**

▶ cacheStorage를 클래스로 정의해, 추후 재사용할 수 있는 코드를 작성하고자 했습니다. 프로젝트가 커짐에 따라 라우트를 여러개 사용하게 되면 라우트에 따라 Key 값을 분리하여 캐시 값을 관리할 수 있습니다.
```
class CacheStorage {
  private KEY: string;
  private cachePromise: Promise<Cache>;

  constructor(KEY: string) {
    this.KEY = KEY;
    this.cachePromise = caches.open(this.KEY);
  }
  
  async put(url: string, response: Response): Promise<void> {
    const cache = await this.cachePromise;
    await cache.put(url, response);
  }

  async get(url: string): Promise<Response | undefined> {
    const cache = await this.cachePromise;
    return await cache.match(url);
  }
}
```

**1-2. 데이터 저장 함수의 기능 확장(캐싱 기능 추가)**

▶ 필요 데이터를 상태값에 저장하는 `setData`함수에 캐싱 기능을 함께 저장했습니다. 다양한 로컬 캐싱 함수를 적용할 수 있도록 setData의 매개변수에 캐싱함수를 추가했습니다.
```
export const setData = async <T>({
  getCacheCallback,
  setCacheCallback,
  getAPICallback,
  dispatchCallback,
}: IsetDataProps<T>) => {
  const cacheResponse = await getCacheCallback();
  if (!isEmptyArray(cacheResponse)) {
    dispatchCallback(cacheResponse);
  } else {
    try {
      const response = await getAPICallback();
      await setCacheCallback(response);
      dispatchCallback(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
};
```

**2. 캐시 만료 시간(expire time) 설정**
> 캐시 용량이 초과될 때 발생하는 예외사항을 방지하고, 서버의 데이터와 로컬의 데이터가 동기화 및 업데이트 되어 데이터의 일관성 을 유지하기 위해 expire time을 설정하기로 했습니다. 저장되는 시점의 시간 값을 함께 저장하고 현재 시간을 기준으로 일정 시간이상 차이가 나면 제거하는 로직을 `직접 구현하는 방법`과 `Cache-Control options`를 사용하는 방법이 있었습니다. <br /> Cache-Control의 경우 "Cache-Control": "max-age=1, stale-while-revalidate=59"의 옵션으로 설정하여, 자동으로 캐시가 만료되어 새로 데이터를 캐시에 저장할 것을 기대했지만 실행되지 않았고, 직접 삭제 로직을 구현해 삭제 로직을 명확히 파악하고자 했습니다. 

▶expire-time과 현재 시간 값(timestamp)을 갖는 객체를 만들어, cacheStorage 에 저장합니다. 이후, cacheStorage에 저장된 값을 바탕으로 응답된 데이터에서 현재 시간에서 timestamp 값의 차이를 계산하여 expire-time을 초과하는지 확인합니다.
```
const currentTime = new Date().getTime();
const cachedTime = res.timestamp;
const timeDiff = currentTime - cachedTime;
```

<br />

### ✅ Assignment 3
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
  
### 🤝 논의 맟 결정 사항
**1. API 호출 횟수 감소 방식: Debouncing**
▶ 기존 로직에서는, ‘담낭’ 키워드를 입력했을 때 ‘ㄷ’, ‘다’, ‘담’, ‘담ㄴ’, ‘담나’, ‘담낭’ 총 6회의 API가 호출됩니다. 관련해 throttling과 debouncing 중 마지막 키워드가 검색 요청 내용이라는 점에서, 더욱 적합한 `debouncing`를 사용하기로 했습니다. debounce의 delay 시간의 경우 한 단어를 바로 작성할 때까지 걸리는 시간보다 약간의 여유 시간을 두어 1초로 설정했습니다.

**2. Debouncing의 기준: 값 vs 함수**
> Debouncing의 기준을 값과 함수로 하는 것의 성능상 차이가 없어, 스타일과 선호의 차이에 따라 결정을 하기로 했습니다. 비슷한 로직들을 분리할 때 주로 함수 형태로 분리하였기에, debouncing도 함수 형태로 분리했습니다. <br /> 단, 함수로 선언하게 되면 컴포넌트 내에서 상태값(inputValue)이 변할 때마다 함수가 재생성되므로 입력 값의 횟수만큼 컴포넌트가 리렌더링되는 문제가 있었습니다. (⇒ 이경우 useCallback으로 fetchData 함수를 감싸주어도 동일한 현상 발생)

▶ 따라서, 컴포넌트 외부에서 fetch 함수와 debounce로 만든 fetch 함수를 정의해주었습니다.
```
// 👍 디바운싱이 적용되어 1초마다 api 호출과 동시에 컴포넌트 리렌더링
const fetchData = async (keyword: string, setSearchList: React.Dispatch<React.SetStateAction<SickInfoList>>) => {
	  try {
	    const response = await getRecommendedWord(keyword);
	    setSearchList(response);
	  } catch (error) {
	    console.error('Error fetching data:', error);
	  }
	}

const debouncedFetchData = debounce(fetchData, 1000);

export default function Search() {
  const [searchList, setSearchList] = useState<SickInfoList>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const keyword = e.target.value;

    debouncedFetchData(keyword, setSearchList);
  };
	
	return (....)
}
```

<br />

### ✅ Assignment 4
- API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정
  
### 🤝 논의 맟 결정 사항
**1. console 출력 구현**
▶  axios interceptor를 사용하여 콘솔창에 api 호출 횟수 출력했습니다.
```
export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

instance.interceptors.request.use((config) => {
  console.info('calling api');
  return config;
});
```

<br />

### ✅ Assignment 5
- 키보드만으로 추천 검색어들로 이동 가능하도록 구현
  
### 🤝 논의 맟 결정 사항
**1. 구현 방식**

▶ `keydown`이벤트로 키보드의 방향키를 눌렀을 때 이동을 구현했습니다. 별도의 `selectedIndex`상태값을 두어 selectedIndex와 검색어 아이템의 인덱스가 같을 경우, 해당 아이템을 강조하는 스타일링을 구현했습니다.

> 문제 사항1. <br /> keydown 이벤트를 걸었을 때, 하단으로 인덱스 이동이 되는 것보다 스크롤이 이동되어버리는 문제가 발생했습니다.

![problem1](https://github.com/wanted-internship-team/pre-onboarding-12th-3-2/assets/109324517/4114143a-7f21-4865-8582-ac616a9e9223)

[↑기존 화면]

![solved](https://github.com/wanted-internship-team/pre-onboarding-12th-3-2/assets/109324517/b18e24c1-d659-4fb6-b5c4-cd4a1d62d5df)

[↑변경 후]

▶ 키보드 이벤트가 event의 default값이 스크롤 이동이 우선되어, 이벤트 실행에 따라 `e.preventDefault()`를 적용해 문제를 해결했습니다.
```
  const selectListItemByKeyArrow = (e: any) => {
    if (e.nativeEvent.isComposing) return;

    switch (e.key) {
      case 'ArrowDown': {
				e.preventDefault(); // ✨ 추가하여 해결!
        const lastIndex = searchList.length - 1;
        setSelectedIndex((prev) => (prev < lastIndex ? prev + 1 : 0));
        console.log(selectedIndex);

        break;
      }
      case 'ArrowUp': {
        (...)
      }
      default:
        break;
    }
  };
```

> 문제 사항1. <br /> 추천 검색어를 클릭했을 때 기존의 selectedIndex가 변경되지 않아 다음 포커스시 클릭한 요소의 다음이 아닌, 기존 요소 다음의 요소가 포커스 되는 문제 발생가 발생했습니다.

▶ selectedIndex를 변경하는 setSelectedIndex() 를 props로 전달받아 추천 검색어 결과를 클릭했을 때 해당 요소의 인덱스로 selectedIndex를 변경해주어 해결했습니다. setSelectedIndex를 onClick 이벤트에 바로 전달할 수도 있지만, 더 선언적인 코드를 지향하고자 resetSelectedIndex를 정의해서 핸들러로 전달했습니다.
```
export default function SearchResults(props: Iprops) {
  const { searchList, selectedIndex, setSelectedIndex, selectListItemByKeyArrow, inputValue } =
    props;

 // ...

  const resetSelectedIndex = (idx: number) => {
    setSelectedIndex(idx);
  };

  return (
			  // ...
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
              // ...
              </SearchText>
            ))
          )}
        </ul>
		   // ...
  );
}
```


## 🧑🏻‍💻 프로젝트 정보

### 프로젝트 구조

```markdown
src
 ┣ apis
 ┃ ┗ instance.ts
 ┣ assets
 ┃ ┗ icon-search.svg
 ┣ components
 ┃ ┣ HighlightedText.tsx
 ┃ ┣ Search.tsx
 ┃ ┣ SearchBar.tsx
 ┃ ┗ SearchResults.tsx
 ┣ constants
 ┃ ┗ index.ts
 ┣ pages
 ┃ ┗ Main.tsx
 ┣ styles
 ┃ ┣ font.css
 ┃ ┗ GlobalStyle.js
 ┣ types
 ┃ ┗ index.ts
 ┣ utils
 ┃ ┣ cache.ts
 ┃ ┣ debounce.ts
 ┃ ┣ isEmptyArray.ts
 ┃ ┗ setData.ts
 ┣ App.tsx
 ┣ custom.d.ts
 ┗ index.tsx
```

### 폴더 구조 선정 이유

```markdown
코드 리팩토링과 확장성을 고려하여 최소한의 기능 단위로 컴포넌트를 분리했습니다.

- api, utils, components 등 기능별로 폴더를 관리했습니다.
- constants : 과제 요구 사항 관련 오타 방지 및 중복 제거와 중요한 상수 관리
- types : 공통적으로 사용되는 interface 별도 관리, 한 파일에서만 쓰이는 인터페이스만(e.g. props) 해당 파일에서 관리
```

### 사용 라이브러리 및 기술

- JavaScript / TypeScript / React
- HTTP Client: axios
- 스타일: styled-components

```jsx
"dependencies": {
  "@testing-library/jest-dom": "^5.17.0",
  "@testing-library/react": "^13.4.0",
  "@testing-library/user-event": "^13.5.0",
  "@types/jest": "^27.5.2",
  "@types/node": "^16.18.48",
  "@types/react": "^18.2.21",
  "@types/react-dom": "^18.2.7",
  "axios": "^1.5.0",
  "json-server": "^0.17.3",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.15.0",
  "react-scripts": "5.0.1",
  "typescript": "^4.9.5",
  "web-vitals": "^2.1.4"
},

"devDependencies": {
  "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
  "@typescript-eslint/parser": "^5.62.0",
  "concurrently": "^8.2.1",
  "eslint-config-prettier": "^9.0.0",
  "eslint-plugin-prettier": "^5.0.0",
  "husky": "^8.0.3",
  "lint-staged": "^14.0.1",
  "prettier": "^3.0.2",
  "styled-components": "^6.0.7",
  "vercel": "^32.1.0"
}
```

## 🫱🏻‍🫲🏿 Commit Convention & Branch Strategy & Communication Tools

### Commit Convention

```
코드 작성 방법이 팀원들마다 상이하여 코드를 읽고 이해하는 시간이 길어져 협업 간에 효율성이 떨어진다고 판단하였습니다.
따라서 Lint와 Prettier를 이용하여 같은 스타일로 작성될 수 있도록 설정했습니다.
또한, Husky와 Lint-Staged를 이용, stage 된 내용을 미리 검사하여 commit 전에 코드를 수정할 수 있도록 했습니다.
```

e.g. FEAT: 로그인 유효성 검증 기능 구현

| 태그      | 설명 (한국어로만 작성하기)                                     |
| --------- | -------------------------------------------------------------- |
| FEAT:     | 새로운 기능 추가 (변수명 변경 포함)                            |
| FIX:      | 버그 해결                                                      |
| DESIGN:   | CSS 등 사용자 UI 디자인 변경                                   |
| STYLE:    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우          |
| REFACTOR: | 프로덕션 코드 리팩토링                                         |
| COMMENT:  | 필요한 주석 추가 및 변경                                       |
| DOCS:     | 문서를 수정한 경우                                             |
| CHORE:    | 빌드 테스크 업데이트, 패키지 매니저 설정(프로덕션 코드 변경 X) |
| RENAME:   | 파일 혹은 폴더명을 수정하거나 옮기는 작업                      |
| REMOVE:   | 파일을 삭제하는 작업만 수행한 경우                             |
| INIT:     | 초기 커밋을 진행한 경우                                        |

### Branch Strategy

브랜치는 아래의 브랜치만 사용하도록 협의했습니다.

| 브랜치    | 설명                               |
| --------- | ---------------------------------- |
| main      | 배포 및 최종본, 출시 버전의 브랜치 |
| develop   | 개발용 버전의 기준이 되는 브랜치   |
| feature/~ | 세부 기능 개발을 위한 브랜치       |
| refactor  | 리팩토링을 위한 브랜치             |

### 기타 협업 도구

```
팀 커뮤니케이션 툴로 팀 노션 페이지와 디스코드를 사용했습니다.
실시간으로 만나 서로의 의견을 정리, 간단한 아카이빙 하기 위해 디스코드를 이용하였으며,
해당 내용들을 다시 팀 노션 페이지에 상세히 기록하는 방식으로 커뮤니케이션을 진행했습니다.

- Discord:
  실시간으로 만나 코드를 리뷰하고 Best-Practice를 선정하고 팀 프로젝트 진행을 위한 컨벤션, 브랜치 전략, 네이밍 등을 논의하기 위한 용도로 사용했습니다.

- Notion:
  디스코드에서 공유된 프로젝트 진행 과정 및 팀 운영 일정을 기록하고 공유하는 용도로 사용했습니다.

- Live Share(VS Code):
  페어 프로그래밍 및 디스코드의 화면공유와 같이 사용하여 실시간으로 작업을 진행하는 용도로 사용했습니다.
```

