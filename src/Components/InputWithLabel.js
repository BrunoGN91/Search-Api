import React from 'react'
import styles from '../App.module.css'


const InputWithLabel = ({
  id, 
  value, 
  type = 'text',
  onInputChange, 
  isFocused, 
  children,
className}) => {

    // A 

    const inputRef = React.useRef();

    // C

    React.useEffect(() => {
      if(isFocused && inputRef.current){
        // D
        inputRef.current.focus();
      }
    }, [isFocused])

    return(
    <>
      <label htmlFor={id} className={styles.label}>{children}</label>
      &nbsp;
      {/* B */}
      <input 
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
        className={styles.input}
        />
    </>
  )
}


export default InputWithLabel