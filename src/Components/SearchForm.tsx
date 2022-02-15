import React from 'react'
import InputWithLabel from './InputWithLabel'
import Button from './Button'
import style from '../App.module.css'


type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit,
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
    </form>
  )

export default SearchForm
