import FormTask from './components/FormTask'
import "../src/styles/main.css"
import ListTask from './components/ListTask'
import { useEffect } from 'react'
import { readLocalStorage } from './data/localStorage';
import DeleteModal from './components/DeleteModal';
import { useAppContext } from './contexts/Context';
import EditModal from './components/EditModal';
import ShareModal from './components/ShareModal';
import Backdrop from './components/Backdrop';

function App() {
  const { setIndex, setListTasks } = useAppContext();

  useEffect(() => {
    const localStorageElements = readLocalStorage();

    setIndex(localStorageElements.length);

    setListTasks(localStorageElements);
  }, []);

  return (
    <>
      <div className='fake-body'>
        <DeleteModal></DeleteModal>
        <EditModal></EditModal>
        <ShareModal></ShareModal>
        <Backdrop></Backdrop>

        <FormTask></FormTask>

        <ListTask></ListTask>
      </div>
    </>
  )
}

export default App
