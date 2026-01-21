import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/apiCalls";
import { Fragment } from "react";
import Notification from "../../UI/Notification";
import ConfirmDialog from "../../UI/ConfirmDialog";
import { useHistory } from "react-router-dom";

export default function UserList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((state) => state.user.users);
  //console.log(users)
  //const [data, setData] = useState(userRows);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const handleDelete = (id) => {
    //setData(data.filter((item) => item.id !== id));
    setConfirmDialog({
      ...ConfirmDialog,
      isOpen: false,
    });
    deleteUser(id, dispatch);
    setNotify({
      isOpen: true,
      message: "Deleted Succesfully",
      type: "error",
    });
    history.push("/users");
  };

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const userObject = users.map((item, i) => ({
    ...item,
    status: userRows[i].status,
    transaction: userRows[i].transaction,
  }));
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row?.img
                  ? params.row.img
                  : "https://firebasestorage.googleapis.com/v0/b/new-shopping-app-d6e85.appspot.com/o/17690066504092.png?alt=media&token=8195725e-fc89-4a9f-8151-a21766e532c1"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() =>
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure you want to delete this user?",
                  subTitle: "deleting of user can be done",
                  onConfirm: () => {
                    handleDelete(params.row._id);
                  },
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
      <div className="userList">
        <DataGrid
          rows={userObject}
          columns={columns}
          pageSize={8}
          checkboxSelection
          // key={userObject.id}
          getRowId={(row) => row._id}
          disableSelectionOnClick
        />
      </div>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Fragment>
  );
}
