import React from 'react';
import './App.css';
import { ReactQueryConfigProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { useDatas } from './datas';
import { MovieTable } from './movie-table/MovieTable';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column'
  },
};

Modal.setAppElement('#root');

export const App: React.FC = () => {
  const [imgSrc, setImgSrc] = React.useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { status, data, columns, error, queryConfig } = useDatas({ openModal, setImgSrc });

  if (status === 'loading') return <div>Loading ...</div>;
  if (status === 'error') return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Rover Picture"
      >
        <button onClick={closeModal}>close</button>
        <img src={imgSrc} height={512} alt="Bigger Rover Picture"/>
      </Modal>
      <MovieTable columns={columns} data={data} />
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryConfigProvider>
  );
};

export default App;
