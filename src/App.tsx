import React from 'react';
import {Modal} from "./components/modal/Modal";
import {API, Endpoints} from "./api/endpoints";
import {fetchData} from "./api";
import './App.css';

interface IImage {
  id: number
  url: string
}

interface IComment {
  id: number
  text: string
  date: number | Date
}

export interface IPost extends IImage {
  comments: IComment[]
}

function App() {
  const [images, setImages] = React.useState<IImage[]>([])
  const [isModal, setIsModal] = React.useState<boolean>(false)
  const [currentPost, setCurrentPost] = React.useState<number>(0)

  const [modalData, setModalData] = React.useState<IPost>({comments: [], id: 0, url: ""})

  React.useEffect(() => {
    (async () => {
      const { data } = await fetchData(API+Endpoints.IMAGES);
      setImages(data)
    })()
  }, [])

  React.useEffect(() => {
    if (currentPost !== 0) {
      (async () => {
        const { data } = await fetchData(API+Endpoints.IMAGES+'/' +currentPost)
        setModalData(data)
        setIsModal(true)
      })()
    }
  }, [currentPost])

  const postHandle = (id: number) => setCurrentPost(id)


  return (
    <div className="container">
      <div className="homePage">
        <h1 className="title">
          TEST APP
        </h1>
        <div className="posts">
          {images.map(img =>
            <img
              className="post"
              key={img.id}
              src={img.url}
              alt={img.url}
              onClick={() => postHandle(img.id)}
            />)}
        </div>
      </div>
      {isModal && <Modal setOpen={setIsModal} modalData={modalData} setModalDate={setModalData}/>}
    </div>
  );
}

export default App;
