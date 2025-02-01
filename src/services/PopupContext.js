// import React, {createContext, useContext, useState} from "react";
//
// const PopupContext = createContext();
//
// export const usePopup = () => useContext(PopupContext);
//
// export const PopupProvider = ({children}) => {
//     const [activePopup, setActivePopup] = useState(null);
//
//     const openPopup = (popupRef) => {
//         if (activePopup === popupRef) return;
//
//         // close active popup if exists
//         if (activePopup && activePopup.current && activePopup !== popupRef) {
//             activePopup.current.close();
//         }
//         popupRef.current.open();
//         setActivePopup(popupRef);
//     };
//
//     const closePopup = (popupRef) => {
//         if (activePopup && activePopup.current && activePopup === popupRef) {
//             activePopup.current.close();
//             setActivePopup(null);
//         }
//     };
//
//     return (
//         <PopupContext.Provider value={{openPopup, closePopup, activePopup}}>
//             {children}
//         </PopupContext.Provider>
//     );
// };
