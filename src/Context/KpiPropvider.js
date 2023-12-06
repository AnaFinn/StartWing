import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const KpiContext = createContext();

const KpiProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [kpi, setKpi] = useState();
  const [revenue, setRevenue] = useState();
  const navigate = useNavigate();

  useEffect(() => {
   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
//    const userInfo = {
//     "_id": "6540869619a2569f499bc028",
//     "name": "sem ru",
//     "email": "sem@exp.com",
//     "password": "$2a$10$jNxY2NXkOCuQPa/nIVXIA.qKcJZDYfvAHRlrKpvSRfIOIxs3M80H2",
//     "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
//     "__v": 0
// }
    setUser(userInfo);
    //console.log(userInfo);

    if (!userInfo) {
        navigate("/home");
    }
  }, [navigate]
  );

  return (
    <KpiContext.Provider value={{ user, setUser, kpi, setKpi, revenue, setRevenue }}>
      {children}
    </KpiContext.Provider>
  );
};
export const KpiState = () => {
  return useContext(KpiContext);
};

export default KpiProvider;
