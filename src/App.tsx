import * as React from 'react';
import axios from 'axios'
import styles from './App.module.css';
import List from './Components/List';
import Slider from './Components/Slider'

import SearchForm from './Components/SearchForm';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

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
  isError: boolean
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
  payload: Stories
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
        data: action.payload
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
  console.log("A: App");
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    {data: [], isLoading: false, isError: false}
  );

  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );
  
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`)
    event.preventDefault()
  }

    // Get Sum Comments
// const sumComments = React.useMemo(() => getSumComments(stories), [stories])

  // Countdown

  const [count, setCount] = React.useState(0);

  const handleIncrease = () => {
    setTimeout(() => setCount(count + 1));
  };

  const handleDecrease = () => {
    setTimeout(() => setCount(count - 1));
  };

  const handleFetchStories = React.useCallback(async () => {

    dispatchStories({ type: 'STORIES_FETCH_INIT'})
      try {
        const result = await axios.get(url)
    
       dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits
        })
      } catch {
        dispatchStories({ type: 'STORIES_FETCH_FAILURE'});
      }

  }, [url]);

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
       <Slider />
  <div>
    Count: {count}
    <div>
      <button type="button" onClick={handleIncrease}>
        Increase
      </button>
      <button type="button" onClick={handleDecrease}>
        Decrease
      </button>
    </div>
  </div>
    </div>
    </div>
  );
};



export default App;

export { storiesReducer }