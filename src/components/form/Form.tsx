import React from 'react';
import './form.css'

interface IFormData {
  name: string
  comment: string
}

export const Form = ({ id }: { id: number}) => {
  const [formData, setFormData] = React.useState<IFormData>({
    name: '',
    comment: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(formData)
    })
      .then(_ => alert("comment has been added"))
      .catch(e => console.log(e))

  }

  return (
    <form action="#" className="flexColumn" onSubmit={handleSubmit}>
      <input onChange={handleChange} name="name" type="text" placeholder="Ваше имя" required className="modalInput"/>
      <input onChange={handleChange} name="comment" type="text" placeholder="Ваш коменнтарий" required className="modalInput"/>
      <button type="submit" className="modalBtn">Оставить коментарий</button>
    </form>
  );
};

