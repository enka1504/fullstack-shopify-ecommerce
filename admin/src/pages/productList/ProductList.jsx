import "./productList.css";

import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
//import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import Notification from "../../UI/Notification";
import ConfirmDialog from "../../UI/ConfirmDialog";

export default function ProductList() {
  // const [data, setData] = useState(productRows);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

   const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:"", subTitle: ""})

  const handleDelete = (id) => {
    //setData(data.filter((item) => item.id !== id));
    // if(window.confirm("Are you sure you want to delete this record?")) {
    //   deleteProduct(id, dispatch);
    //   setNotify({
    //     isOpen: true,
    //     message: "Deleted Succesfully",
    //     type: "error",
    //   });
    // }
     setConfirmDialog({
      ...confirmDialog,
      isOpen:false
     })
      deleteProduct(id, dispatch);
      setNotify({
        isOpen: true,
        message: "Deleted Succesfully",
        type: "error",
      });
    
  };

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => setConfirmDialog({
                 isOpen: true,
                 title:"Are you sure you want to delete this record?",
                 subTitle:"You cant undo this operation",
                 onConfirm: () => { handleDelete(params.row._id)}
              })
              }
            />
          </>
        );
      },
    },
  ];

  return (
    <Fragment>
      <div className="productList">
        <DataGrid
          rows={products}
          disableSelectionOnClick
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      </div>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
    </Fragment>
  );
}
