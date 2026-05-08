import React,{useEffect,useState} from "react"
import axios from 'axios'
import AppConfig from "../../App/constants/config";
import { toast } from "react-toastify";
import EarningTable from "./EarningTable";

export default function Shops(){
  const baseUrl = AppConfig.baseUrl
   const [earnings,setEarnings] = useState([])
   const [loading, setLoading] = useState([])
   const token = localStorage.getItem('token')

   const order = 'asc';
   const orderBy = 'calories';
   const selected = [];
   const columnData = [
  {
    id: 'customer_name', 
    numeric: false,
    disablePadding: true,
    label: 'Customer Name',
    align: 'left'
  },
  {
    id: 'coins',
    numeric: false,
    disablePadding: true,
    label: 'Coins',
    align: 'center'
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: true,
    label: 'Amount',
    align: 'center'
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: true,
    label: 'Status',
    align: 'left'
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: true,
    label: 'Requested on',
    align: 'left'
  },
  {
    id: 'settled_on',
    numeric: false,
    disablePadding: true,
    label: 'Settled on',
    align: 'left'
  }
];
  
  const page = 0;
  const rowsPerPage = 1;
  const defaultPerPage = 5;
  const filterText = '';
  const getSettledSettlements = async () => {
    try{
      setLoading(true) 
      const { data } = await axios.get(
        `${baseUrl}/shop/list_settlement?authorization=${token}`,
      );
      console.log(data)
      if(!data.error){
        setEarnings(data.settlements);
      } else{
        toast(data.title)
      }
    } catch(error){
      console.log(error)
      toast(error)
    }
    setLoading(false)
    
  };
  
  useEffect(() => {
    getSettledSettlements();
  }, []);

    return (
      <div>
        <EarningTable
          order={order}
          orderBy={orderBy}
          selected={selected}
          data={earnings}
          page={page}
          rowsPerPage={rowsPerPage}
          defaultPerPage={defaultPerPage}
          filterText={filterText}
          columnData={columnData}
          reloadData={getSettledSettlements}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    );
}