import React from 'react';
import Item from './Item'
import styles from "../App.module.css"
const List = ({ list, onRemoveItem }) => 
console.log("B") ||
  ( 
  <ul className={styles.listContainer}>
   
    {list.map((item )=> (
      <Item 
      key={item.objectId}
      item={item}
      onRemoveItem={onRemoveItem}
       />
    ))} 
</ul>
)

export default List