import React from "react";
import Button from "./Button";

const Person = ({name, number, deletePerson}) => {

  return (
    <p>
      {name} {number} {' '}
      <Button name="delete" handleClick={() => deletePerson(name)}/>
    </p>
  )
}

export default Person