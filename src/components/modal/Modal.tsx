import React from 'react';
import {IPost} from "../../App";
import './modal.css'
import {Form} from "../form/Form";


type Props = {
  setOpen: Function
  modalData: IPost,
  setModalDate: Function
}

export const Modal: React.FC<Props> = ({setOpen, modalData, setModalDate}) => {
  const [loading, setLoading] = React.useState<boolean>(true)

  const handleClose = () => {
    setModalDate({ comments: [], id: 0, url: "" })
    setOpen(false)
  }

  return (
    <div className="modal modalOpen">
      <div className="modalContainer">
        <div className="modal-content">
          <div>
            {loading && <div className="loader"/>}
            <img
              style={{display: loading ? "none" : "block"}}
              onLoad={() => setLoading(false)}
              src={modalData.url}
              alt="1231"
              className="modalPost"
            />
          </div>
          <Form id={modalData.id}/>
        </div>
        <div className="modal-left">
          <div className="comments">
            {modalData.comments.length > 0 && modalData.comments.map(item => (
              <div className="comment" key={item.id}>
                  <span
                    className="time">
                    {new Date(item.date).getDay()}.
                    {new Date(item.date).getMonth()}.
                    {new Date(item.date).getFullYear()}
                  </span>
                <p className="text">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="closeWrap" onClick={handleClose}>
            <div className="closeContainer">
              <div className="close"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

