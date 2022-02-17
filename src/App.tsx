import * as React from 'react';
import axios from 'axios'
import styles from './App.module.css';
import List from './Components/List';
import Slider from './Components/Slider'

import SearchForm from './Components/SearchForm';
import { result } from 'lodash';
import { Button } from './Components/Button';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='

const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

// const getAsyncStories = () =>
//   new Promise((resolve) =>
//     setTimeout(
//       () => resolve({ data: { stories: initialStories } }),
//       1000
//     )
//   );

  
// const getAsyncStories = () =>
// new Promise((resolve, reject) => setTimeout(reject, 1000)
// );

// TYPES


type Story = {
  objectId: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
 
}



type Stories = Array<Story>


type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
  page: number
  
}

type StoriesAction = 
| StoriesFetchInitAction
| StoriesFetchSuccessAction
| StoriesFetchFailureAction
| StoriesRemoveAction


interface StoriesFetchInitAction {
  type: 'STORIES_FETCH_INIT'
}

interface StoriesFetchSuccessAction {
  type: 'STORIES_FETCH_SUCCESS';
  payload: { list: Stories, page: number}
 
  
}

interface StoriesFetchFailureAction {
  type: 'STORIES_FETCH_FAILURE'
}

interface StoriesRemoveAction {
  type: 'REMOVE_STORY';
  payload: Story;
}

type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}
//

const useSemiPersistentState = (
  key: string, 
  initialState: string): [string, (newValue: string) => void] => {
  const isMounted = React.useRef(false)
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    if(!isMounted.current) {
      isMounted.current = true
    } else {
    
    localStorage.setItem(key, value);
  }}, [value, key]);

  return [value, setValue];
};



const storiesReducer = (
  state: StoriesState,
  action: StoriesAction
) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.list,
        page: action.payload.page
        
      }
      case 'STORIES_FETCH_FAILURE' :
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
        case 'REMOVE_STORY' :
      return {
        ...state,
        data: state.data.filter(
        (story) => action.payload.objectId !== story.objectId
      ),
    }
    default:
      throw new Error();
  }
};

// const getSumComments = (stories) => {
//   console.log("C");

//   return stories.data.reduce(
//     (result, value) => result + value.num_comments,
//     0
//   )
// }


const App = () => {
 
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    {data: [], isLoading: false, isError: false, page: 0}
  );

  const getUrl = (searchTerm: string, page: number) => `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
  const [urls, setUrls] = React.useState([
    getUrl(searchTerm, 0)]
  );
  
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = (searchterm: string, page: number) => {
    const url = getUrl(searchTerm, page);
    setUrls(urls.concat(url))
  }
  
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSearch(searchTerm, 0)
    event.preventDefault()
  }
  // Last Searches

  

  const extractSearchTerm = (url: any) => url.substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&')).replace(PARAM_SEARCH, '')
 
  
  // const getLastSearches = (differentUrls: string[]) => 
  // differentUrls.slice(-5).map((extractSearchTerm))

  const getLastSearches = (differentUrls: string[]) => 
  differentUrls
  .reduce((result: string[], url: string, index: number) => {
    const searchTerm = extractSearchTerm(url);

    if (index === 0) {
      return result.concat(searchTerm);
    }
    const previousSerachTerm = result[result.length - 1];
    if(searchTerm === previousSerachTerm){
      return result
    } else {
      return result.concat(searchTerm)
    }
  }, []).slice(-6)


  const handleLastSearch = (searchTerm: any) => {
   setSearchTerm(searchTerm)
   handleSearch(searchTerm, 0)
  }

  const handleMore = () => {
    const lastUrl = urls[urls.length -1]
    const searchTerm = extractSearchTerm(lastUrl);
    handleSearch(searchTerm, stories.page + 1)
  }

  const handleLess = () => {
    const lastUrl = urls[urls.length -1]
    const searchTerm = extractSearchTerm(lastUrl);
    handleSearch(searchTerm, stories.page - 1)
  }

  const lastSearches = getLastSearches(urls)

  const handleFetchStories = React.useCallback(async () => {
    
    
    dispatchStories({ type: 'STORIES_FETCH_INIT'})
      try {
        const lastUrl = urls[urls.length - 1]
        const result = await axios.get(lastUrl)
        
        
       dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: {
          list: result.data.hits,
          page: result.data.page
        }
        })
      } catch {
        dispatchStories({ type: 'STORIES_FETCH_FAILURE'});
      }

  }, [urls]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]
  )


  const handleRemoveStory = (item: Story) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  // const searchedStories = stories.data.filter((story) =>
  //   story.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );



  return (
    <div>
      <div className={styles.container}>
      <h1 className={styles.headlinePrimary}>My Hacker Stories</h1>
      <SearchForm
      searchTerm={searchTerm}
      onSearchInput={handleSearchInput}
      onSearchSubmit={handleSearchSubmit}
      lastSearches={lastSearches}
      handleLastSearch={handleLastSearch}
       />
      {stories.isError && <p>Something went wrong ...</p>}

    
      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List
          list={stories.data}
          onRemoveItem={handleRemoveStory}
        />
      )}
      <div className={styles.pagesContainer}>
      <Button
      type='button'
      onClick={handleLess}>Less
      </Button>
      {stories.page == 0 ? null : stories.page - 1}
      <strong>{stories.page}</strong>
      {stories.page + 1}
      <Button
      type='button'
      onClick={handleMore}>More
      </Button>
      </div>
    </div>
    </div>
  );
};



export default App;

export { storiesReducer }