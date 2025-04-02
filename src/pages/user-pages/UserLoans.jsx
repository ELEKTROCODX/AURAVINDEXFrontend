import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import '../../styles/user-designs/UserLoans.css';
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/AuthContext";
import { API_IMG_URL } from "../../config";
import { convertUTCToLocal } from "../../utils/functions";
import FloatingMessage from "../../components/FloatingMessage";

const UserLoan = () => {

    const {fetchData, error} = useFetch();
    const {fetchData: finishData} = useFetch();
    const {fetchData: renewal} = useFetch();
    const {user,token} = useContext(AuthContext);
    const[loans,setLoans] = useState([]);
    const [floatingMessage, setFloatingMessage] = useState(null);

    const loadLoans = async () => {
      try{
        const response = await fetchData(`/loan/?filter_field=user&filter_value=${user}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        console.log("loans",data);
        const activeLoans = data.filter((loan)=> !loan.returned_date);
        setLoans(activeLoans);
        console.log(loans);
  
      }catch(err){
        console.log("Error in loans")
      }
      };
      
    useEffect(() => {
        loadLoans();
      }, [])

    const finishLoan = async loanId => {
        try {
          await finishData(`/loan/${loanId}/finish`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFloatingMessage("Returned success");
          loadLoans();
        } catch (err) {
          console.log(err);
          setFloatingMessage(err);
        }
      };

    const renewalLoan = async loanId => {
        try{
          await renewal(`/loan/${loanId}/renewal`,{
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          setFloatingMessage("Renewal success");
          loadLoans();
        }catch(error){
          console.log(error);
          setFloatingMessage(error);
        }
    }

    

    return (
        <>
            <Nav />
            <div className="loans-container">
                <h1 className="titles">LOANS</h1>
                <div className="loans-grid">
                    {loans?.length > 0
                        ?loans.map((loan) => (
                        <div key={loan.id} className="loan-card">
                            <img src={`${API_IMG_URL}${loan.book.book_img}`} alt={loan.title} className="loan-image" />
                            <div className="loan-info">
                                <h2 className="loan-title">{loan.book.title}</h2>
                                <p className="loan-author">ISBN: {loan.book.isbn}</p>
                                <p className="loan-due-date"><strong>Due:</strong> {convertUTCToLocal(loan.return_date)}</p>
                                <div className="loan-actions">
                                    <Button label="Renew" variant="filledBtn" action={()=> renewalLoan(loan._id)}/>
                                    <Button label="Return" variant="hollowBtn" action={()=> finishLoan(loan._id)}/>
                                </div>
                            </div>
                        </div>
                    )):(
                      <p>No loans here</p>
                    )}
                </div>
            </div>
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
export default UserLoan;