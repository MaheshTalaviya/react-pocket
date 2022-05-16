import logo from './../../assets/images/logo-svg.png'
import './Transactions.css'
import moment from 'moment'
const ExportData =({data,schoolData})=>{
    
    return(<div><table className="custTable" style={{width:"600px !important;",padding:"0px 40px !important;",position:"relative"}}>
        <tr className="cusTr">
            <td className="logoImg"><img style={{width:"110px",margin:"0px 40px !important;"}} src={logo}/></td>
        </tr>
        <tr className="dateTr">
           <td>
                <p className="dateText"><b>Date: </b>{moment(new Date()).format('LL')}</p>
            </td>  
        </tr>
        {/* <tr>
            <td>
                <h3 className="custTitle">Transaction Details</h3>
            </td>
        </tr> */}
        </table>

        <table style={{border:"1px solid #cfeece",borderLeft:"1px solid #cfeece",width:"500px",marginLeft:"50px",marginRight:"50px",marginTop:"50px"}}>
    <tr>
        <th colSpan="2" style={{padding:"7px",fontSize:"15px",backgroundColor:"#66b644",color:"#fff"}}>
Transaction Details
        </th>
    </tr>
    <tr className="greyBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Transaction Id</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{data.transactionId}</td>
    </tr>
    <tr className="whiteBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Account Type</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{data.accountType}</td>
    </tr>
    <tr className="greyBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Amount</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{data.amount}</td>
    </tr>
        <tr className="whiteBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Method</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{data.method}</td>
    </tr>
    <tr className="greyBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Payment Through</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{data.paymentThrough}</td>
    </tr>
    {/* <tr className="whiteBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Payment Type</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{data.paymentType}</td>
    </tr> */}
     <tr className="greyBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Receiver Name</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{data.receiverName}</td>
    </tr>
    <tr className="whiteBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Receiver Phone</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{data.receiverPhone}</td>
    </tr>
     <tr className="greyBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Sender Name</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{data.senderName}</td>
    </tr>
     <tr className="whiteBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Sender Phone</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{data.senderPhone}</td>
    </tr>
    <tr className="greyBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Transaction Date</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{data.transactionDate}</td>
    </tr>
        <tr className="whiteBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Transaction Status</td>
         {data.transactionStatus =="Failed" ?<td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"red"}}>{data.transactionStatus}</td>:''}
          {data.transactionStatus =="In Process" ?<td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"orange"}}>{data.transactionStatus}</td>:''}
          {data.transactionStatus =="Debited" ?<td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"green"}}>{data.transactionStatus}</td>:''}
          {data.transactionStatus =="Credited" ?<td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"darkgreen"}}>{data.transactionStatus}</td>:''}
          {data.transactionStatus =="Refunded" ?<td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"Olive"}}>{data.transactionStatus}</td>:''}
    </tr>
    {
        schoolData ? (<><tr className="greyBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Fee Detail</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{schoolData?.data?.fee_detail}</td>
    </tr>
     <tr className="whiteBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Institute</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{schoolData?.data?.institute}</td>
    </tr>
    <tr className="greyBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Location</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{schoolData?.data?.location}</td>
    </tr>
    <tr className="whiteBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Student Name</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{schoolData?.data?.student_name}</td>
    </tr>
    <tr className="greyBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Student Number</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{schoolData?.data?.student_number}</td>
    </tr>
     <tr className="whiteBg">
        <td style={{padding:"7px",fontSize:"12px",color:"#666"}}>Merchant Type</td>
        <td style={{borderLeft:"1px solid #cfeece",padding:"7px",fontSize:"12px",color:"#666"}}>{schoolData?.merchantType}</td>
    </tr>
    </>)
    :''
    }
   

     
        </table>
        </div>
        )
}
export default ExportData