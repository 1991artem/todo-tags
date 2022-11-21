import { useRef, KeyboardEvent, useState } from 'react';
import { InputGroup, Form, Button } from "react-bootstrap";

interface IInput {
  setTodoTitle: (value: string) => void;
}

function Input({setTodoTitle}: IInput) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState([] as string[])

  const tagsEndPoint = {
    start: '',
    end: '',
    flag: false
  }

  const setValue = () => {
    if(inputRef.current){
      setTodoTitle(inputRef.current.value);
      inputRef.current.value = '';
      setTags([])
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
          tagsEndPoint.end = inputRef.current.value
          const tag = [tagsEndPoint.end.slice(tagsEndPoint.start.length)];
          setTags([...tags, ...tag]);
        }
      }
      if(event.key === 'Enter'){
        if(tagsEndPoint.flag){
          tagsEndPoint.end = inputRef.current.value
          const tag = [tagsEndPoint.end.slice(tagsEndPoint.start.length)];
          setTags([...tags, ...tag]);
        }
        setValue();
      }
    }

  }

  return ( 
    <>
    <Form.Label style={{color: 'green'}}>{tags.length?`tags: ${tags.join("  ")}`:''}</Form.Label>
    <InputGroup className="mb-3">
    <Form.Control
      placeholder="Enter note title"
      ref={inputRef}
      onKeyPress={keyPressHandler}
    />
    <Button 
    variant="outline-secondary" 
    id="button-addon2"
    onClick={setValue}
    >
      Save
    </Button>
  </InputGroup>
    </>
    );
}

export default Input;