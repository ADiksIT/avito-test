import React from 'react';
import {fetchData} from "../../api";
import {API, Endpoints} from "../../api/endpoints";
import './form.css'

interface IFormData {
  name: string
  comment: string
}

export const Form = ({id}: { id: number }) => {
  const [formData, setFormData] = React.useState<IFormData>({
    name: '',
    comment: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    (async () => {
      e.preventDefault()
      const { error } = await fetchData(API + Endpoints.IMAGES + '/' + id + '/comments', 'POST', formData)
      if (error) {
        console.log(error)
      } else {
        alert("comments has been added")
      }
    })()
  }

  return (
    <form action="#" className="flexColumn" onSubmit={handleSubmit}>
      <input onChange={handleChange} name="name" type="text" placeholder="Ваше имя" required className="modalInput"/>
      <input onChange={handleChange} name="comment" type="text" placeholder="Ваш коменнтарий" required
             className="modalInput"/>
      <button type="submit" className="modalBtn">Оставить коментарий</button>
    </form>
  );
};

