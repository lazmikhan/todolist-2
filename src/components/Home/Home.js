import React from 'react';
import Header from '../Header/Header';
import Todo from './Todo';

const Home = (props) => {
    return (
        <div>
            <Header currentUser={props.currentUser}></Header>
            {
                props.currentUser!=null?
                <Todo currentUser={props.currentUser}></Todo>:
                <>
                <p style={{textAlign:'center', color:'grey', fontSize:'25px'}}>Please Login to Add your own Todo List</p>
                </>
            }
          
        </div>
    );
};

export default Home;