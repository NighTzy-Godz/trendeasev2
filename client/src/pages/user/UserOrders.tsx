import React from "react";
import { useGetMyOrdersQuery } from "../../store/apis/orderApi";

function UserOrders() {
  const { data } = useGetMyOrdersQuery("");

  console.log(data);
  return <div>My Orders</div>;
}

export default UserOrders;
