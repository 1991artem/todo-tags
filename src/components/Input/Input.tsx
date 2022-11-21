import { useRef, KeyboardEvent } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";

interface IInput {
  setTodoTitle: (value: string) => void;
}

function Input({setTodoTitle}: IInput) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if(inputRef.current){
      setTodoTitle(inputRef.current.value);
      inputRef.current.value = '';
    }
  }

  const keyPressHandler = (event: KeyboardEvent) => {
    if(event.key === 'Enter'){
      setTodoTitle((event.target as HTMLInputElement).value);
      (event.target as HTMLInputElement).value = '';
    }
  }

  return ( 
    <InputGroup className="mb-3">
    <Form.Control
      placeholder="Enter note title"
      ref={inputRef}
      onKeyPress={keyPressHandler}
    />
    <Button 
    variant="outline-secondary" 
    id="button-addon2"
    onClick={handleClick}
    >
      Save
    </Button>
  </InputGroup>
    );
}

export default Input;