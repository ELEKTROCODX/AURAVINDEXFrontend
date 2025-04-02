import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import "../styles/FloatingList.css"
import useFetch from "../hooks/useFetch";
import Button from "./Button";
import FloatingListForm from "./FloatingListForm";
import FloatingMessage from "./FloatingMessage";

const FloatingLists = ({ isVisible, onClose, user, bookId, done }) => {
    if (!isVisible) return null;
    const { token } = useContext(AuthContext);
    const { fetchData, data: userLists, loading } = useFetch();

    const [isFormVisible, setIsFormVisible] = useState(false);
    const showForm = () => setIsFormVisible(true);
    const hideForm = () => setIsFormVisible(false);
    const [floatingMessage, setFloatingMessage] = useState(null);

    useEffect(() => {
        fetchData(`/book_list/?filter_field=owner&filter_value=${user}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }, []);

    const handleAddBook = (listId) => {
        fetchData(`/book_list/${listId}/book/${bookId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        onClose();
        floatingMessage("Book added to your list");

        done("Book added")

    }


    return (
        <div className="floating-list-overlay">
            <div className="floating-list-container">
                <Button variant="iconBtn" label="X" action={onClose}></Button>
                <h2>Your lists</h2>
                {userLists?.length > 0 ? (
                    userLists.map((list) => (
                        <div>
                            <div className="list-info">
                                <h2 className="list-info">{list.title}</h2>
                                <div className="btns-cont">
                                    <Button label="Add" variant="hollowBtn" action={() => handleAddBook(list._id)}></Button>
                                </div>
                            </div>
                            <FloatingListForm isVisible={isFormVisible} onClose={hideForm} user={user} bookId={bookId}></FloatingListForm>
                        </div>

                    ))
                ) : (
                    !loading &&
                    <div>
                        <p>You dont have</p>
                        <Button label="+" variant="hollowBtn" action={showForm}></Button>
                        <FloatingListForm isVisible={isFormVisible} onClose={hideForm} user={user} bookId={bookId}></FloatingListForm>
                    </div>
                )}
                <Button label="+" variant="hollowBtn" action={showForm}></Button>
            </div>
            {floatingMessage && (
        <FloatingMessage
          message={floatingMessage}
          onClose={() => setFloatingMessage(null)}
        />
      )}
        </div>
    );
}

export default FloatingLists;