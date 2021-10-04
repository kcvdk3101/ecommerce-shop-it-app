import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DELETE_USER_RESET } from "../../actions/actionTypes/userActionTypes";
import { clearErrors } from "../../actions/clearErrors";
import userActions from "../../actions/userActions";
import Loader from "../common/Loader";
import MetaData from "../common/MetaData";
import Sidebar from "./Sidebar";

const UsersList = ({
  history,
  user,
  allUsers,
  clearErrors,
  getAllUsers,
  deleteUser,
}) => {
  const { loading, error, users } = allUsers;
  const { isDeleted } = user;
  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsers();

    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (isDeleted) {
      toast.success("User deleted successfully");
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, isDeleted, history, getAllUsers, clearErrors]);

  const deleteUserHandler = (id) => {
    deleteUser(id);
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,

        actions: (
          <Fragment>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(user._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Users"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Users</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setUsers()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
    allUsers: state.allUsers,
  };
}

const mapDispatchToProps = {
  getAllUsers: userActions.allUsers,
  deleteUser: userActions.deleteUser,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
