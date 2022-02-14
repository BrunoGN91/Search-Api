import React from 'react';
import styles from '../App.module.css'
import { ReactComponent as Check } from '../check.svg'

const Item = ({item, onRemoveItem}) => {
    return(
     
      <li className={styles.itemContainer} key={item.objectId}>
           <span>
            <a href={item.url}>{item.title}</a>
           </span>
           <div className={styles.itemData}>
           <span>Author: {item.author}</span>
           <span>Num. of Comments: {item.num_comments}</span>
           <span>Internet Points: {item.points}</span>
           </div>
           <span >Remove Story
             <button type="button" 
                    onClick={() => {onRemoveItem(item)}}
                    className={`${styles.button} ${styles.buttonSmall}`}>
               <Check width="18px" height="18px"/>
             </button>
           </span>
       </li>
      
    )
  }

  export default Item