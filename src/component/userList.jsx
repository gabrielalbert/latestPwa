import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./loader";
import NavBar from "../component/navBar";
import SideBar from "../component/sidebar";
import "../UserList.css"; // Import the external CSS file
import { useNavigate } from "react-router-dom";
import {
  MdDriveFileRenameOutline,
  MdOutlineMailOutline,
  MdDelete,
} from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { TbLockPassword, TbMessageReport } from "react-icons/tb";
import { AiOutlineProfile } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircleAvatar from "./circleAvatar";
import config from "../config"; // Adjust the path as necessary

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = useState("Dashboard");
  const [userName, setUserName] = useState("Gabriel");
  const [show, setShow] = useState(false);

  const [modalMode, setModalMode] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [roles, setRoles] = useState([]);
  const [managerList, setManagerList] = useState([]);
  const [userNameError, setUserNameError] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [canCreateUser, setCanCreateUser] = useState(true)

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    displayName: "",
    reportingId: 0,
    reportingTo: "",
    roleId: "",
    roleName: "",
  });

  const validateUserName = async (userName) => {
    if (!userName) return;
    try {
      setIsValidating(true);
      const response = await axios.get(
        `${config.apiBaseUrl}user/validate?username=${userName}`
      );
      if (response.data ===false) {
        setUserNameError("");
        setCanCreateUser(true)
      } else {
        setUserNameError("This Username is already taken.");
        setCanCreateUser(false)
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsValidating(false);
    }
  };
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, userName: value });
    setUserNameError("");
    setCanCreateUser(true);
    validateUserName(value);
  };

  const fetchManagerLists = async (userId) => {
    try {
      const response = await axios.get(
        `${config.apiBaseUrl}user/${userId}/managers`
      );
      setManagerList(response.data);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleClose = () => {
    setShow(false);
    setModalMode(null);
    setFormData({
      userName: "",
      password: "",
      email: "",
      displayName: "",
      reportingId: 0,
      reportingTo: "",
      roleId: "",
      roleName: "",
    });
  };

  const openCreateModal = () => {
    setShow(true);
    setModalMode("create");
    setSelectedUserId(null);
  };
  // const openEditModal = async (userId) => {
  //   const userToEdit = users.find((user) => user.userId === userId);
  //   if (userToEdit) {
  //     setFormData({
  //       userName: userToEdit.userName || "",
  //       password: userToEdit.password || "",
  //       email: userToEdit.email || "",
  //       displayName: userToEdit.displayName || "",
  //       reportingId: userToEdit.reportingId || 0,
  //       reportingTo: userToEdit.reportingTo || "",
  //       roleId: userToEdit.roleId || "",
  //       roleName: userToEdit.roleName || "",
  //     });
  //     setSelectedUserId(userId);
  //     setModalMode("edit");
  //     setShow(true);
  //   }
  // };

  const openEditModal = async (userId) => {
    try {
      setShow(true);
      setModalMode("edit");
      setSelectedUserId(userId);
      const userToEdit = users.find((user) => user.userId === userId);

      setFormData({
        userName: userToEdit.userName || "",
        password: userToEdit.password || "",
        email: userToEdit.email || "",
        displayName: userToEdit.displayName || "",
        reportingId: userToEdit.reportingId || 0,
        reportingTo: userToEdit.reportingTo || "",
        roleId: userToEdit.roleId || "",
        roleName: userToEdit.roleName || "",
      });

      await fetchManagerLists(userId);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleDelete = (userId) => {
    // Show the confirmation toast
    toast.info(
      <div>
        <div>Are you sure you want to delete this user?</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Button
            variant="danger"
            onClick={() => {
              deleteUser(userId);
              toast.dismiss(); // Dismiss the toast once user confirms
            }}
          >
            Yes
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              toast.dismiss(); // Dismiss the toast if user cancels
            }}
          >
            Cancel
          </Button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false, // Don't auto-close the toast
        closeButton: false, // Hide the close button
        hideProgressBar: true,
        draggable: false,
      }
    );
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(
        `${config.apiBaseUrl}user/delete/${userId}`
      );
      const updatedUsers = filteredUsers.filter(
        (user) => user.userId !== userId
      );
      setFilteredUsers(updatedUsers);
      toast.error("User deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    } catch (error) {
      console.error("Error deleting user", error);
      toast.error("Failed to delete the user");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (modalMode === "create") {
        const payload = { userId: 0, ...formData };
        // Call Create API
        await axios.post(
          `${config.apiBaseUrl}user/create`,
          payload
        );
        toast.success("User created successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      } else if (modalMode === "edit" && selectedUserId) {
        // Call Edit API
        const payload = { userId: selectedUserId, ...formData };
        await axios.post(
          `${config.apiBaseUrl}user/update`,
          payload
        );
        toast.success("User updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      }
      handleClose(); // Close modal after saving
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}masters/roles`
        );
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.apiBaseUrl}user/list`
      );
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  // Fetch users on component mount


  useEffect(() => {
    fetchUsers()
  }, [])
  
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
        user.userName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.displayName.toLowerCase().includes(query) ||
        getManagerName(user.managerId).toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const getManagerName = (managerId) => {
    if (managerId === 0) {
      return "Manager";
    }
    const manager = users.find((user) => user.userId === managerId);
    return manager ? manager.displayName : "N/A";
  };

  console.log(managerList, "managerList-=-=");

  return (
    <div className="App">
      <NavBar userName={userName} />
      <ToastContainer />
      <div className="main-container" style={{ backgroundColor: "#EAEAEA" }}>
        <SideBar setActive={setActive} active={active} userName={userName} />
        <div className="container">
          {/* <h1>User List</h1> */}
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />

            <button
              type="button"
              class="btn btn-primary search-button"
              // onClick={navigateTo}
              onClick={openCreateModal}
            >
              + Add User
            </button>
          </div>
          <div class="row">
            <div class="col-xl-12">
              <div class="dashboard-box margin-top-0">
                <div class="headline">
                  <h3 className="text-start">
                    Users
                  </h3>
                </div>
                {loading ? (
                  <Loader />
                ) : filteredUsers.length > 0 ? (
                  <ul class="dashboard-box-list list-item">
                    {filteredUsers.map((item, index) => (
                      <li key={index}>
                        <div class="job-listing">
                          <div class="job-listing-details">
                            <a href="#" class="job-listing-company-logo">
                            <CircleAvatar name={item?.displayName} />
                              {/* <img src="/user-avatar-small-01.jpg" alt="" /> */}
                            </a>

                            <div
                              class="job-listing-description"
                              // style={{ marginLeft: "-5%" }}
                            >
                              <span className="list-header text-start">
                                {item?.displayName} <span class="pill-badge">{item?.userName}</span>
                              </span>
                              <br />
                              <span className="text-start">{item.roleName || "N/A"}</span>
                              &nbsp; &nbsp;
                              <span class="dashboard-status-button blue">
                                {item.email || "N/A"}
                              </span>
                              <br />
                              <span class="job-listing-title text-start">
                                <TbLockPassword />{" "}
                                {"*".repeat(item.password.length) || "N/A"}
                              </span>
                              &nbsp; &nbsp;
                              <span class="dashboard-status-button blue">
                                <GrUserManager />{" "}
                                {getManagerName(item.reportingId)}
                              </span>
                              &nbsp; &nbsp;
                              <span>
                                <TbMessageReport /> {item.reportingTo || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="buttons-to-right">
                          <div className="d-flex">
                            <FaEdit
                              size={20}
                              onClick={() => openEditModal(item.userId)}
                            />
                            <MdDelete
                              size={20}
                              onClick={() => handleDelete(item.userId)}
                            />
                          </div>
                          {/* <div className="button red ripple-effect ico delete">
                            <MdDelete size={20}/>
                          </div> */}
                        </div>
                        {/* <div class="remove-button">
                            <div className='remove-button tooltip'>
                              <a class="button gray ripple-effect ico" data-tippy-placement="top"><i class="icon-feather-trash-2" title="Remove" onClick={()=>handleToggle(item._id)}></i></a>
                              <span className='tooltiptext'>Remove</span>
                            </div>
                            </div> */}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul class="dashboard-box-list no-data">
                    <span>No Data Found</span>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "create" ? "Create User" : "Edit User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="userName"
                value={formData.userName || ""}
                disabled={modalMode === "edit"}
                onChange={handleUsernameChange}
                isInvalid={!!userNameError}
              />
              <br/>
              <Form.Text className="text-danger">{userNameError}</Form.Text>
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Display Name"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
            >
              {/* <label htmlFor="manager">User Manager Dropdown</label> */}
              <Form.Label>Roles</Form.Label>
              <Form.Select
                onChange={(e) => {
                  const selectedRole = roles.find(
                    (role) => role.roleId === Number(e.target.value)
                  );
                  setFormData({
                    ...formData,
                    roleId: selectedRole.roleId,
                    roleName: selectedRole.roleName,
                  });
                }}
                value={formData.roleId}
                placeholder="Roles"
              >
                {/* Default option */}
                <option value="">Select a Role</option>
                {/* Dynamic options */}
                {roles.map((user) => (
                  <option key={user.roleId} value={user.roleId}>
                    {user.roleName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
            >
              {/* <label htmlFor="manager">User Manager Dropdown</label> */}
              <Form.Label>Managers</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    reportingId: e.target.value,
                  })
                }
                value={formData.reportingId}
                placeholder="User Manager Dropdown"
              >
                {/* Default option */}
                <option value="0">Manager</option>
                {/* Dynamic options */}
                {modalMode === "create"
                  ? users
                      .filter((user) => user.reportingId === 0)
                      .map((user) => (
                        <option key={user.userId} value={user.userId}>
                          {user.displayName}
                        </option>
                      ))
                  : managerList.map((manager) => (
                      <option key={manager.userId} value={manager.userId}>
                        {manager.displayName}
                      </option>
                    ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> 
          <Button variant="primary" onClick={handleSave} disabled={userNameError || isValidating || !canCreateUser}>
            {isValidating ? 'Validating...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserListPage;
