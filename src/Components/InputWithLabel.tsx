import React from 'react'
import styles from '../App.module.css'


type InputWithLabelProps = {
  id: string;
  value: string;
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused?: boolean;
  children: React.ReactNode;
  className: string;
}

const InputWithLabel = ({
  id, 
  value, 
  type = 'text',
  onInputChange, 
  isFocused, 
  children}: InputWithLabelProps) => {

    // A 

    const inputRef = React.useRef<HTMLInputElement>(null!);

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
