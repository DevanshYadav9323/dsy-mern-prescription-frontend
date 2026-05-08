// import React,{useEffect,useState} from "react"
// import axios from 'axios'
// import AppConfig from "../../App/constants/config";
// import { toast } from "react-toastify";
// import SettlementTable from "./SettlementsTable";

// export default function Shops(){
//   const baseUrl = AppConfig.baseUrl
//    const [settlements,setSettlements] = useState([])
//    const [loading, setLoading] = useState([])
//    const token = localStorage.getItem("token")
//    const order = 'asc';
//    const orderBy = 'calories';
//    const selected = [];
//    const columnData = [
//     {
//       id: 'coins',
//       numeric: false,
//       disablePadding: true,
//       label: 'Coins',
//       align: 'center'
//     },
//     {
//       id: 'amount',
//       numeric: false,
//       disablePadding: true,
//       label: 'Amount',
//       align: 'center'
//     },
//     {
//       id: 'status',
//       numeric: false,
//       disablePadding: true,
//       label: 'Status',
//       align: 'left'
//     },
//     {
//       id: 'created_at',
//       numeric: false,
//       disablePadding: true,
//       label: 'Created At',
//       align: 'left'
//     }
//   ];

//   const page = 0;
//   const rowsPerPage = 1;
//   const defaultPerPage = 5;
//   const filterText = '';
//   const getPendingSettlements = async () => {
//     try{
//       setLoading(true) 
//       const { data } = await axios.get(
//         `${baseUrl}/shop/list_settlement?status=pending&authorization=${token}`,
//       );
//       if(!data.error){
//         setSettlements(data.settlements);
//       } else{
//         toast(data.title)
//       }
//     } catch(error){
//       console.log(error)
//       toast(error)
//     }
//     setLoading(false)
//   };

//   useEffect(() => {
//     getPendingSettlements();
//   }, []);

//     return (
//       <div>
//         <SettlementTable
//           order={order}
//           orderBy={orderBy}
//           selected={selected}
//           data={settlements}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           defaultPerPage={defaultPerPage}
//           filterText={filterText}
//           columnData={columnData}
//           reloadData={getPendingSettlements}
//           loading={loading}
//           setLoading={setLoading}
//         />
//       </div>
//     );
// }



import React, { useEffect, useState } from "react";
import axios from 'axios';  
import SettlementTable from "./SettlementsTable";
import AppConfig from "../../App/constants/config";
import { toast } from "react-toastify";

export default function Shops() {
  const baseUrl = AppConfig.baseUrl
  const token = localStorage.getItem("token");

  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dummy data to simulate API response
  const dummyData = [
    {
      coins: 500,
      amount: 2500,
      created_at: "2025-05-20 10:15",
      history: [
        { customerName: "Alice Smith", coins: 100, amount: 500, redeemedDate: "2025-05-21" },
        { customerName: "Bob Johnson", coins: 150, amount: 750, redeemedDate: "2025-05-22" },
      ],
    },
    {
      coins: 1200,
      amount: 6000,
      created_at: "2025-05-18 09:30",
      history: [
        { customerName: "Carol Lee", coins: 300, amount: 1500, redeemedDate: "2025-05-19" },
        { customerName: "David Kim", coins: 200, amount: 1000, redeemedDate: "2025-05-20" },
        { customerName: "Eve Chen", coins: 100, amount: 500, redeemedDate: "2025-05-21" },
      ],
    },
    {
      coins: 300,
      amount: 1500,
      created_at: "2025-05-15 14:00",
      history: [
        { customerName: "Frank Moore", coins: 150, amount: 750, redeemedDate: "2025-05-16" },
      ],
    },
    {
      coins: 500,
      amount: 2500,
      created_at: "2025-05-20 10:15",
      history: [
        { customerName: "Alice Smith", coins: 100, amount: 500, redeemedDate: "2025-05-21" },
        { customerName: "Bob Johnson", coins: 150, amount: 750, redeemedDate: "2025-05-22" },
      ],
    },
    {
      coins: 1200,
      amount: 6000,
      created_at: "2025-05-18 09:30",
      history: [
        { customerName: "Carol Lee", coins: 300, amount: 1500, redeemedDate: "2025-05-19" },
        { customerName: "David Kim", coins: 200, amount: 1000, redeemedDate: "2025-05-20" },
        { customerName: "Eve Chen", coins: 100, amount: 500, redeemedDate: "2025-05-21" },
      ],
    },
    {
      coins: 300,
      amount: 1500,
      created_at: "2025-05-15 14:00",
      history: [
        { customerName: "Frank Moore", coins: 150, amount: 750, redeemedDate: "2025-05-16" },
      ],
    },
    {
      coins: 500,
      amount: 2500,
      created_at: "2025-05-20 10:15",
      history: [
        { customerName: "Alice Smith", coins: 100, amount: 500, redeemedDate: "2025-05-21" },
        { customerName: "Bob Johnson", coins: 150, amount: 750, redeemedDate: "2025-05-22" },
      ],
    },
    {
      coins: 1200,
      amount: 6000,
      created_at: "2025-05-18 09:30",
      history: [
        { customerName: "Carol Lee", coins: 300, amount: 1500, redeemedDate: "2025-05-19" },
        { customerName: "David Kim", coins: 200, amount: 1000, redeemedDate: "2025-05-20" },
        { customerName: "Eve Chen", coins: 100, amount: 500, redeemedDate: "2025-05-21" },
      ],
    },
    {
      coins: 300,
      amount: 1500,
      created_at: "2025-05-15 14:00",
      history: [
        { customerName: "Frank Moore", coins: 150, amount: 750, redeemedDate: "2025-05-16" },
      ],
    },
  ];

  // Commented API call, using dummy data instead

  const getSettlementDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${baseUrl}/shop/settlement_details`, {
        headers: {
          Authorization: token,
        },
      }
      );
      
      setSettlements(data.data);
      console.log(settlements);

      if (!data.error) {
      } else {
        toast(data.title);
      }
    } catch (error) {
      console.log(error);
      toast(error);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    getSettlementDetails();
  }, []);


  return (
    <div>
      <SettlementTable data={settlements} loading={loading} />
    </div>
  );
}
