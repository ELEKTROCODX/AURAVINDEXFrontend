import React, { useContext, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';

import '../../styles/user-designs/Book.css';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import FloatingLists from '../../components/FloatingLists';
import { API_IMG_URL } from '../../config';
import FloatingMessage from '../../components/FloatingMessage';

const Book = () => {

  const {loading, error, fetchData } = useFetch();
  const {fetchData: lendBook, error: errorLend} = useFetch();
  const { bookName } = useParams();
  const [book, setBook] = useState(null);
  const {user,token} = useContext(AuthContext);
  const navigate = useNavigate();

  const [isListVisible, setIsListVisible] = useState(false);
  const [floatingMessage, setFloatingMessage] = useState(null);
  const showForm = () => setIsListVisible(true);
  const hideForm = () => setIsListVisible(false);

  useEffect(() => {
    const fetchBook = async () => {
    if (bookName) {
        try{
          const bookData = await fetchData(`/book/${bookName}`);
          console.log('Data:',bookData);
          setBook(bookData);
        }catch(error){
          console.log("error Fetching",error);
        }
    }
  }
  fetchBook();
  }, [bookName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!book) {
    return <div>No book found.</div>;
  }

  const handleLend = async (e) =>{
    e.preventDefault();    
    if(!token){
            navigate('/signin');
            return;
        }else{
            console.log("BOOK TO LOAN:" ,book)
            const lendData = {
                user: user,
                book: book._id,
            }

            console.log("Lend data: ",lendData);

            try{
                await lendBook('/loan',{
                    method: 'POST',
                    data: lendData,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });
                setFloatingMessage("Loan success");
                console.log("Loan success")
            }catch(err){
              setFloatingMessage(
                err.response
                  ? `Error: ${err.response.data.message}`
                  : "An unexpected error occurred."
              );
            }
        }
  }

  return (
    <>
      <Nav />
      <main className="book-page">
        <section className="book-detail">
          <div className="book-image">
            <img
              src={`${API_IMG_URL}${book.book_img}`}
              alt="Cuento de Hadas"
            />
          </div>
              <div className="book-info">
                <h2>Title: {book.title || 'Loading'}</h2>
                <h3>ISBN: {book.isbn}</h3>
                <h3>
                  Author(s):{' '}
                  {book?.authors?.length > 0
                    ? book.authors
                        .map(author => author.name + ' ' + author.last_name)
                        .join(', ')
                    : 'No authors available'}
                </h3>
                <p>Genre: {""}
                    {book?.genres.length > 0
                    ? book.genres
                        .map(genres => genres)
                        .join(", ")
                        : "No genres"
                    
                    }</p>
                <p>Classification: {book.classification}</p>
                <p>Status: {book.book_status.book_status}</p>
                <p>Samples: {book.sample}</p>
                <p>Summary: {book.summary}</p>
                <center>
                  <Button label="Lend" variant="hollowBtn" action={handleLend}/>
                  <Button label="Add New List" variant="filledBtn" action={showForm}/>
                  <FloatingLists isVisible={isListVisible} onClose={hideForm} user={user} bookId={book._id}></FloatingLists>
                </center>
                
              </div>
        </section>
      </main>
      <Footer />
      {floatingMessage && (
        <FloatingMessage
          message={floatingMessage}
          onClose={() => setFloatingMessage(null)}
        />
      )}
    </>
  );
};

export default Book;
