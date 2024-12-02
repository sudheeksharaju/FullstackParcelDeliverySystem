import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import axios  from "axios";

const Parcel = () => {
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [parcel, setParcel] = useState({});

  useEffect(() => {
    const getParcel = async () => {
      try {
        const response = await publicRequest.get(`/parcels/find/${parcelId}`);
        setParcel(res.data);
      } catch (error) {
      console.log(error);
      }
    };
    getParcel();
  }, [parcelId]);
  
  return (
    <div className="flex flex-col items-center justify-center mt-[3%] mr-[5%] ml-[5%]">
      <div className="bg-[#D9D9D9] h-[80vh] w-[60vw] rounded-md">
        <Link to="/myparcels">
          <FaArrowLeft className="text-[18px] m-2 cursor-pointer" />
        </Link>
        <div className="flex justify-between">
          <div className="flex-1">
            <ul className="m-3">
              <li className="mt-3">From: {parcel.from}</li>
              <li className="mt-3">Weight: {parcel.weight}</li>
              <li className="mt-3">Date: {parcel.date}</li>
              <li className="mt-3">Sender: {parcel.sendername}</li>
              <li className="mt-3">To : {parcel.to}</li>
              <li className="mt-3">Cost : ${parcel.cost}</li>
              <li className="mt-3">Receiver : {parcel.recipientname}</li>
              <li className="mt-3">Track ID: {parcel._id}</li>
              <li className="mt-3">Note : {parcel.note}</li>
            </ul>
            <button
              className={
                parcel.status === 1
                  ? "bg-[#1aa9dc] text-white w-[100px] cursor-pointer padding-[10px] m-[20px]"
                  : "bg-[#053f09] text-white w-[100px] cursor-pointer padding-[10px] m-[20px]"
              }
            >
              {parcel.status === 1 ? "Pending" : "Delivered"}
            </button>
          </div>
          <div className="flex-1 mr-[20%]">
            <ul className="m-3">
              <li className="mt-3">Sender Email: {parcel.senderemail}</li>
              <li className="mt-3">Recipient Email: {parcel.recipientemail}</li>
            </ul>
            <textarea
              cols={50}
              rows={7}
              name=""
              id=""
              placeholder="Leave a feedback"
              className="outline-none p-[5px]"
            ></textarea>
            <button className="bg-[#1E1E1E] w-[200px] p-[10px] text-white cursor-pointer">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parcel;

// import { useEffect, useState } from "react";
// import { FaUser } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { publicRequest } from "../requestMethods"; // Axios instance
// import { useDispatch } from "react-redux";
// import { logOut } from "../redux/userRedux";

// const MyParcels = () => {
//   const [open, setOpen] = useState(false);
//   const [data, setData] = useState([]);
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Fetch parcels
//   useEffect(() => {
//     const getParcels = async () => {
//       try {
//         const res = await publicRequest.post("/parcels/me", {
//           email: user.currentUser.email,
//         });
//         setData(res.data);
//       } catch (error) {
//         console.error("Error fetching parcels:", error);
//       }
//     };
//     getParcels();
//   }, [user]);

//   // Razorpay payment handler
//   const handlePayment = async (amount) => {
//     try {
//       const { data: order } = await publicRequest.post("/create-order", {
//         amount, // Amount in rupees
//         currency: "INR",
//       });

//       const options = {
//         key: "rzp_test_D0u4owYaM4RYkn", // Replace with Razorpay key_id
//         amount: (getTotalCartAmount() + 2) * 80 * 100,
//         currency: INR,
//         name: "Food Gallery",
//         description: "Parcel Payment",
//         order_id: razorpay_order_id,
//         handler: function (response) {
//           alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
//           // Add logic to update parcel payment status in your database
//         },
//         prefill: {
//           name: user.currentUser.name,
//           email: user.currentUser.email,
//           contact: "1234567890",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       alert("Failed to initiate payment");
//     }
//   };

//   const handleOpen = () => setOpen(!open);
//   const handleLogout = () => {
//     dispatch(logOut());
//     navigate("/login");
//   };

//   return (
//     <div>
//       <div className="relative flex items-end justify-end mr-[20%] mt-[3%]">
//         <div>
//           <span
//             className="flex items-center text-white font-semibold cursor-pointer"
//             onClick={handleOpen}
//           >
//             <FaUser className="mr-[10px]" />
//             {user.currentUser.name}
//           </span>
//         </div>
//         {open && (
//           <div className="absolute top-[20px] right-0 h-[200px] w-[250px] bg-[#7ae50e] z-[999] shadow-xl">
//             <ul className="flex flex-col items-center justify-center mt-[10px]">
//               <Link to="/allparcels">
//                 <li className="hover:text-[#97d20c] my-[5px] cursor-pointer">All parcels</li>
//               </Link>
//               <li className="hover:text-[#fff] my-[5px] cursor-pointer">Statements</li>
//               <li className="hover:text-[#fff] my-[5px] cursor-pointer" onClick={handleLogout}>
//                 Logout
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//       <div className="flex justify-evenly px-[5%]">
//         <div className="h-[90vh] w-[60vw] rounded-md">
//           <h2 className="text-[18px] text-[#561aee] p-[20px]">My Parcels</h2>
//           {data.map((parcel, index) => (
//             <div key={index} className="flex justify-between bg-[#D9D9D9] h-[150px] w-[60vw] m-[20px] p-[20px]">
//               <div>
//                 <ul>
//                   <li>From: {parcel.from}</li>
//                   <li>Weight: {parcel.weight} kg</li>
//                   <li>Date: {parcel.date}</li>
//                   <li>Sender: {parcel.sendername}</li>
//                 </ul>
//               </div>
//               <div className="flex flex-col">
//                 <span>To: {parcel.to}</span>
//                 <button
//                   className="bg-[#45de52] text-white w-[100px] cursor-pointer padding-[5px]"
//                   onClick={() => handlePayment(parcel.amount)}
//                 >
//                   Pay Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyParcels;

