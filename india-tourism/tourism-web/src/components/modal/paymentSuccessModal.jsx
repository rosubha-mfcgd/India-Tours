import { useEffect } from "react";

const PaymentSuccessModal = ({ isOpen, onClose,closeCardPayment}) => {
  
 const handlePaymentModalClose = ()=>{
  closeCardPayment();  
  onClose();

 }  
  if (!isOpen) return null;



  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Payment is Successful!</h2>
        <p>Thank you for your purchase.</p>
        <button onClick={()=>{handlePaymentModalClose()}}>Close</button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;