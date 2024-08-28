import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ADD_TURTLE } from '../graphql/mutations'

const initialFormData = {
  name: '',
  weapon: '',
  headbandColor: ''
}

function Dashboard() {
  const [formData, setFormData] = useState(initialFormData)
  const [addTurtle] = useMutation(ADD_TURTLE, {
    variables: formData
  })

  const handleInputChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const res = await addTurtle()

    console.log(res)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="column">
        <h2 className="text-center">Add a Ninja Turtle</h2>

        <input type="text" onChange={handleInputChange} value={formData.name} name="name" placeholder="Enter the Turtle's name (Must be a renaissance artist)" />
        <input type="text" onChange={handleInputChange} value={formData.weapon} name="weapon" placeholder="Enter the Turtle's weapon" />
        <input type="text" onChange={handleInputChange} value={formData.headbandColor} name="headbandColor" placeholder="Enter the Turtle's headband color" />

        <button>Add</button>
      </form>
    </>
  )
}

export default Dashboard