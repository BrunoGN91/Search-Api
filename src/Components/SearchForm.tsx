import React from 'react'
import InputWithLabel from './InputWithLabel'
import {Button , ButtonBorderlessArray} from './Button'
import style from '../App.module.css'


type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  lastSearches: string[]
  handleLastSearch: any
}

const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit,
    lastSearches,
    handleLastSearch
  }: SearchFormProps) => (
    <form className={style.searchForm} onSubmit={onSearchSubmit}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={onSearchInput}
        className={style.input}
       
      >
        <strong>Search:</strong>
      </InputWithLabel>
      
      <Button
      
      type='submit'
      disabled={!searchTerm}
      >Submit</Button>
      <p>Last searches:  </p>
      {lastSearches.map((searchTerm: string, index) => {
         return (
           <> 
         <ButtonBorderlessArray
         key={searchTerm + index}
         type="button"
         onClick={() => handleLastSearch(searchTerm)}
         >{searchTerm}
         </ButtonBorderlessArray>
         </>
       )
       }).slice(-5).reverse()}
    </form>
  )

export default SearchForm
