import React from 'react';
import Header from '../Header/Header';

const Home = (props) => {
    return (
        <div>
            <Header currentUser={props.currentUser}></Header>
        </div>
    );
};

export default Home;