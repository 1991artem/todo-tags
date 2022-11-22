import { useRef, KeyboardEvent, useState, useEffect } from 'react';
import { InputGroup, Form, Button } from "react-bootstrap";
import { ICreate } from '../../interfaces/interfaces';
import useInput from '../hooks/useInput';

interface IInput {
  createTodos: (value: ICreate) => void;
}

function Input({createTodos}: IInput) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tagsArray, setTagsArray] = useState([] as string[])
  const {tags, setValue} = useInput('')
  const tagsEndPoint = {
    start: '',
    flag: false
  }

  useEffect(()=>{
    if(inputRef.current){
      createTodos({
        title: inputRef.current.value,
        tags
      }
      );
      inputRef.current.value = '';
    }
  }, [tags])


  const buttonHandler = () => {
    if(inputRef.current){
      setValue(inputRef.current.value)
    }
  }

  const keyPressHandler = (event: KeyboardEvent) => {
    if(inputRef.current){
      if(event.key === '#'){
        tagsEndPoint.start = inputRef.current.value;
        tagsEndPoint.flag = true;
      }
      if(event.key === ' '){
        if(tagsEndPoint.flag){
          const tags = inputRef.current.value.slice(tagsEndPoint.start.length).split('#');
          setTagsArray([...tagsArray, ...tags])
          tagsEndPoint.flag = false;
        }
      }
      if(event.key === 'Enter'){
        setValue(inputRef.current.value)
      }
    }

  }

  return ( 
    <>
    <p style={{color: 'green', margin: 0}}>{tagsArray.join()?`tags: ${tagsArray.join("  ")}`:''}</p>
    <InputGroup className="mb-3">
    <Form.Control
      placeholder="Enter note title"
      ref={inputRef}
      onKeyPress={keyPressHandler}
    />
    <Button 
    variant="outline-secondary" 
    id="button-addon2"
    onClick={buttonHandler}
    >
      Save
    </Button>
  </InputGroup>
    </>
    );
}

export default Input;
