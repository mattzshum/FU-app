import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUsers } from "./actions/usersAction";
import { User, Location, Topic, Post, setup_db, Comment } from "backend";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsers());
  });

  function App() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(loadLocation());
    });

    function App() {
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(loadTopic());
      });

      function App() {
        const dispatch = useDispatch();
        useEffect(() => {
          dispatch(loadPost());
        });      

        function App() {
          const dispatch = useDispatch();
          useEffect(() => {
            dispatch(loadsetup_db());
          });

          function App() {
            const dispatch = useDispatch();
            useEffect(() => {
              dispatch(loadComment());
            });

return (
    <div className="App">
      <h1>Hello User</h1>
    </div>
  );
};
        
export default App;