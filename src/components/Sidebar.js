
import { useNavigate } from 'react-router-dom';
import '../styles/sidebar.css'

const Sidebar = ({ activeView, setActiveView }) => {
  const navigate=useNavigate()
  return (
    <div className="create-sidebar">
      <div
      onClick={() =>{ 
        navigate('/')
      }}
      >

        <img src='/images/home.svg' alt='home/svg' />
      </div>
      <div
        className={`sidebar-icon ${(activeView === 'create')? 'active' : ''}`}
        onClick={() => setActiveView('create')}
      >
        {(activeView === "create" ) ? (

          <img src="/images/more.svg" alt="plus-icon" />
        ) : (
          <img src="/images/more-2.svg" alt="plus-icon" />
        )}


      </div>
      <div
        className={`sidebar-icon ${activeView ==='orders' ? 'active' : ''}`}
        onClick={() => setActiveView('orders')}

      >{
        (activeView)=='orders'?

        <img src='/images/list-active.svg' alt='list/svg' />
        :
        <img src='/images/list.svg' alt='list/svg' />
      }
      </div>
    </div>
  );
};

export default Sidebar