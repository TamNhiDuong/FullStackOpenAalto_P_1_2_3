const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {

  const sum = parts.reduce((acc, obj) => acc + obj.exercises, 0)

  return <p>Total of {sum} exercises</p>
}

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map((part, id) => {
      return (
        <Part part={part} key={id} />
      )
    })}
  </>

const Course = (props) => {
  const { course } = props
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}
export default Course