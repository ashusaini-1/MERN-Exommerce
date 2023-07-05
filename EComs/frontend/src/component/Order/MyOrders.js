import { Link } from "react-router-dom";
import React,{useEffect,Fragment} from "react";
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../actions/orderAction"
import MetaData from "../layout/MetaData";
const MyOrders = () => {
    const dispatch = useDispatch();
  
    const { orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);
  console.log(orders);
const columns = [
  { field: "id", headerName: "Order ID", width: 300 },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    cellClassName: (params) => {
      return params.getValue(params.id, "status") === "Delivered"
        ? "greenColor"
        : "redColor";
    },
  },
  {
    field: "itemsQty",
    headerName: "Items Qty",
    type: "number",
    width: 150,
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 270,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return (
        <Link to={`/order/${params.getValue(params.id, "id")}`}>
         icon
        </Link>
      );
    },
  },
];

const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    dispatch(myOrders());
  }, [dispatch]);

  return (

    <Fragment>
     <MetaData title={`${user.name} - Orders`} />

        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th key={column.field}>{column.headerName}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row, index) => (
              <Tr key={index}>
                {columns.map((column) => (
                  <Td key={column.field}>{row[column.field]}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
    </Fragment>
  );
};

export default MyOrders;
