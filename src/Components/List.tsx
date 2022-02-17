import React from 'react';
import Item from './Item'
import styles from "../App.module.css"
import { ButtonBorderless } from './Button'
import { sortBy } from 'lodash'

type Story = {
  objectId: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
}

type Stories = Array<Story>

type Listprops = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
}
interface fn {
  (param: string): void;
}
const SORTS = {
  NONE: (list: string) => list,
  TITLE: (list: string) => sortBy(list, 'title'),
  AUTHOR: (list: string) => sortBy(list, 'author').reverse(),
  COMMENTS: (list: string) => sortBy(list, 'num_comments').reverse(),
  POINTS: (list: string) => sortBy(list, 'points').reverse()

}

const List = React.memo(({ list, onRemoveItem }: Listprops) => {

const [sort, setSort] = React.useState({sortKey:'NONE', isReverse: false})

const handleSort = (sortKey: string) => {
  const isReverse: any = sort.sortKey === sortKey && !sort.isReverse
  setSort({sortKey, isReverse})
}

const sortFunction = (SORTS as any)[sort.sortKey]
const sortedList: any = sort.isReverse ? sortFunction(list).reverse() : sortFunction(list)

  return ( 
  <ul>
    <strong>Sort By</strong>
  <li style={{display: 'flex', margin: "10px"}}>
     <span style={{ margin: "0 10px"}}>
       <ButtonBorderless type="button" onClick={() => handleSort("TITLE")}>Title</ButtonBorderless>
       </span>
     <span style={{ margin: "0 10px"}}>
     <ButtonBorderless type="button" onClick={() => handleSort("AUTHOR")}>Author</ButtonBorderless>
       </span>
     <span style={{ margin: "0 10px"}}>
     <ButtonBorderless type="button" onClick={() => handleSort("COMMENTS")}>Comments</ButtonBorderless>
       </span>
     <span style={{ margin: "0 10px"}}>
     <ButtonBorderless type="button" onClick={() => handleSort("POINTS")}>Points</ButtonBorderless>
       </span>

   </li>
 <li  className={styles.listContainer}>
    {sortedList.map((item:any )=> (
      <Item 
      key={item.objectId}
      item={item}
      onRemoveItem={onRemoveItem}
       />
    ))} 
    </li>
</ul>
)
})


export default List