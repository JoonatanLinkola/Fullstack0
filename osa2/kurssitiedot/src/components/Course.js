import React from 'react'

const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.eachPart} {props.eachEx}
    </p>
  )
}

const Content = (props) => {
  const {parts} = props
  return (
    <>
      {parts.map(each =>
        <Part key={each.id} eachPart={each.name} eachEx={each.exercises} />
      )}
    </>
  )
}
const Course = (props) => {
  return (
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  )
}

const Total = (props) => {
  const {parts} = props
  const total = parts.map(part=>part.exercises)
                     .reduce((prev,curr) => prev+curr)
  return (
    <b>Total of {total} exercises.</b>
  )
}

export default Course