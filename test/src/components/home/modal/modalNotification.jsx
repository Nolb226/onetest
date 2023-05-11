function ModalNotification({ headingMessage, message, handleClickModal }) {
   console.log("notification");
   return (
      <>
         <div className="layer-modal" onClick={() => handleClickModal()}>
            <div className="modal-notification">
               <div className="modal-notification-icon">
                  <i class="fa-solid fa-check"></i>
               </div>
               <div className="modal-notification-heading">
                  <h2>{headingMessage}</h2>
               </div>
               <span className="modal-notification-message">{message}</span>
            </div>
         </div>
      </>
   );
}

export default ModalNotification;
