import React from 'react'
import App, { storiesReducer } from './App';
import InputWithLabel from './Components/InputWithLabel'
import SearchForm from './Components/SearchForm'
import List from './Components/List'
import Item from './Components/Item'
import axios from 'axios'




import { render, screen, fireEvent, act } from '@testing-library/react'


const storyOne =  {
  title: 'React',
  url: 'https://reactjs.org/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectId: 0,
}

const storyTwo = {
  title: 'Redux',
  url: 'https://redux.js.org/',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectId: 1,
}

const stories = [storyOne, storyTwo]


jest.mock('axios')

// Testing a Component Life cycle with Async / await after it re-renders

describe('App', () => {
  test('succeeds fetching data', async () => {
    const promise = Promise.resolve({
      data: {
        hits: stories,
      }
    })
    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    expect(screen.queryByText(/Loading/)).toBeInTheDocument()

    await act(() => promise);
    
    expect(screen.queryByText(/Loading/)).toBeNull()

  })
})

describe('storiesReducer', () => {
  it('removes a story from all stories', () => {
    const action = {type: 'REMOVE_STORY', payload: storyOne }// TODO: some action
    const state = { data: stories, isLoading: false, isError: false }// TODO: some current state

    const newState = storiesReducer(state, action)

    const expectedState = { // TODO: the expected state
      data: [storyTwo], 
      isLoading: false, 
      isError: false 
    }; 


    expect(newState).toStrictEqual(expectedState)
  })
})

// COMPONENTS TESTING

describe('Item', () => {
  test('renders all properties', () => {
    render(<Item item={storyOne} />);
    
    expect(screen.getByText(/Jordan Walke/)).toBeInTheDocument();
    expect(screen.getByText(/React/)).toHaveAttribute(
      'href',
      'https://reactjs.org/'
    )
  })


test('renders a clickable dismiss button', () => {
  render(<Item item={storyOne} />)
  expect(screen.getByRole('button')).toBeInTheDocument()

})

test('clicking the dismiss button casll the callback handler', () => {
  const handleRemoveItem = jest.fn();

  render( <Item item={storyOne} onRemoveItem={handleRemoveItem} />)
  fireEvent.click(screen.getByRole('button'))

  expect(handleRemoveItem).toHaveBeenCalledTimes(1)
})

})

describe('SearchForm', () => {
  const searchFormProps = {
    searchTerm: 'React',
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn()
  };

  it('renders the input field with its value', () => {
    render(<SearchForm {...searchFormProps} />)
    
    expect(screen.getByLabelText(/Search/)).toBeInTheDocument()
  })

  it('calls onSearchInput on input field change', () => {
    render(<SearchForm {...searchFormProps} />)
    fireEvent.change(screen.getByDisplayValue('React'), {
      target: { value: 'Readux'}
    })

    expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1)
  })

  it('calls onSearchSubmit on button Submit click', () => {
    render(<SearchForm {...searchFormProps} />)
    fireEvent.submit(screen.getByRole('button'))

    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1)
  })
})

describe('Something truthy and falsey', () => {
  it('true to be true', () => {
    expect(true).toBeTruthy()
  })


it('false to be false', () =>{
  expect(false).toBeFalsy()
})

})

describe('App component', () => {
  it('removes an item when clicking the Dismiss button', () => {

  })
  it('requests some initial stories from an API', () => {
    
  })
})

