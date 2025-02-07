import React, { useState, useEffect } from "react";
import NavBar from "../component/navBar";
import SideBar from "../component/sidebar";
import Select from "react-select/base";
import "../signup.css";
import axios from "axios";
import config from "../config"; // Adjust the path as necessary

const CreateUser = () => {
  const [active, setActive] = useState("Dashboard");
  const [userName, setUserName] = useState("Gabriel");
  const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    managername: "",
    displayname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData,'alaklalallalla');
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}users/read`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

//   const dropdownOptions = [
//     { value: 0, label: "Manager" }, // Default option
//     ...users.map((user) => ({
//       value: user.userId,
//       label: user.displayName,
//     })),
//   ];

  const handleChangeValue = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    console.log("Selected Value:", selected); // Save the selected value (userId)
  };

  return (
    <div className="App">
      <NavBar userName={userName} />
      <div className="main-container" style={{ backgroundColor: "#EAEAEA" }}>
        <SideBar setActive={setActive} active={active} userName={userName} />
        <div className="signup-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Create User</h2>
            <div className="form-group">
              {/* <label htmlFor="username">Username</label> */}
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              {/* <label htmlFor="email">Email</label> */}
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              {/* <label htmlFor="password">Password</label> */}
              <input
                type="text"
                id="manager"
                name="manager"
                placeholder="Password"
                value={formData.manager}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              {/* <label htmlFor="displayname">Display Name</label> */}
              <input
                type="text"
                id="displayname"
                placeholder="Display Name"
                name="displayname"
                value={formData.displayname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              {/* <label htmlFor="manager">User Manager Dropdown</label> */}
                <select
                  onChange={handleChangeValue}
                  value={selectedOption}
                  placeholder="User Manager Dropdown"
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "16px",
                    backgroundColor: '#fff',
                    height: '46px',
                    marginTop: '3%'
                  }}
                >
                  {/* Default option */}
                  <option value="0">Manager</option>
                  {/* Dynamic options */}
                  {users.filter((user)=> user.managerId === 0).map((user) => (
                    <option key={user.userId} value={user.userId}>
                      {user.displayName}
                    </option>
                  ))}
                </select>
            </div>
            <button type="submit submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
