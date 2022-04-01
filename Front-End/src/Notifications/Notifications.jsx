import React from 'react';
import NotiFeed from './NotiComponents/NotiFeed';
import './Notifications.css';
import Data from './NotiComponents/NotiData.json';

// import Data from './Components/PostData.json';

function Notifications() {
  return (
    <div className="notifications">
      <section className="header1">
        Notifications
      </section>
      <section className="flex1">
        <button className="flex-container" type="button">All</button>
        <button className="flex-container" type="button">Mentions</button>
      </section>
      {/* <div>
        <h1>helloooooo</h1>
      </div> */}
      <div>
        <NotiFeed className="notifeed" data={Data} />
      </div>
    </div>

  );
}
export default Notifications;
