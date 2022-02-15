import React from 'react';
import Item from './Item'
import styles from "../App.module.css"


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

const List = React.memo(({ list, onRemoveItem }: Listprops) => 

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
))

export default List