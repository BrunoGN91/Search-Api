import React from 'react'
import InputWithLabel from './InputWithLabel'
import Button from './Button'
import style from '../App.module.css'


const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit,
  }) => (
    <form className={style.searchForm} onSubmit={onSearchSubmit}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={onSearchInput}
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