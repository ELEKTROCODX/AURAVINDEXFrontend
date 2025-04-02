import React, { useContext, useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import '../../styles/user-designs/MyLists.css';
import { AuthContext } from '../../contexts/AuthContext';
import useFetch from '../../hooks/useFetch';

const MyLists = () => {
  const [expandedListId, setExpandedListId] = useState(null);
  const { user, token } = useContext(AuthContext);
  const { fetchData: listsData, data: userLists, loading } = useFetch();
  const { fetchData: deleteData } = useFetch();

  useEffect(() => {
    listsData(`/book_list/?filter_field=owner&filter_value=${user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [user, token]);

  const toggleList = (id) => {
    setExpandedListId((prevId) => (prevId === id ? null : id));
  };

  const deleteList = async (listId) => {
    try {
      await deleteData(`/book_list/${listId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      listsData(`/book_list/?filter_field=owner&filter_value=${user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Nav />
      <div className="my-lists-container">
        <h1 className="titles">MY LISTS</h1>
        <div className="lists-wrapper">
          {userLists?.length > 0 ? (
            userLists.map((list) => (
              <div key={list.id} className="list-card">
                <div className="list-info">
                  <h2 className="list-title">{list.title}</h2>
                </div>
                <div className="list-actions">
                  <Button
                    label={expandedListId === list.id ? "Hide" : "View"}
                    variant="hollowBtn"
                    action={() => toggleList(list.id)}
                  />
                  <Button
                    label="Delete"
                    variant="filledBtn"
                    action={() => deleteList(list.id)}
                  />
                </div>
                {expandedListId === list.id && (
                  <ul className="book-list">
                    {list.books?.length > 0 ? (
                      list.books.map((book, index) => (
                        <a key={book.id || index} href={`/Book/${book._id}`}>
                          <li className="book-item">{book.title}</li>
                        </a>
                      ))
                    ) : (
                      <li>No loans</li>
                    )}
                  </ul>
                )}
              </div>
            ))
          ) : (
            !loading && <p>You don't have any lists yet</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyLists;
