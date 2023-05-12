import { useState } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import Authorization from "./Authorization";

interface MenuItem {
  label: string;
  key: string;
}

function NavBar(): JSX.Element {
  const menuItems: MenuItem[] = [
    {
      label: "Movie App",
      key: "Movie App",
    },
    {
      label: "Favorite",
      key: "favorite",
    },
    {
      label: "Entrance",
      key: "entrance",
    },
  ];

  const navigate = useNavigate();
  const [isEntranceVisible, setEntranceVisible] = useState(false);

  const handleMenuClick = (key: string) => {
    if (key === "favorite") {
      navigate("/favorite");
    } else if (key === "entrance") {
      setEntranceVisible(true);
    }
  };

  const handleCancel = () => {
    setEntranceVisible(false);
  };

  const handleOk = () => {
    // Perform validation and logic for username and password
    // Here, you can check if the password matches the confirmed password,
    // authenticate the user, or perform any other necessary actions.

    // Reset the input fields
    setEntranceVisible(false);
  };

  return (
    <>
      <Menu
        mode="horizontal"
        style={{
          height: "60px",
          backgroundColor: "lightBlue",
          color: "white",
          fontSize: "30px",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={({ key }) => handleMenuClick(key)}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}
      </Menu>
      {isEntranceVisible && <Authorization onCancel={handleCancel} onOk={handleOk} />}
    </>
  );
}

export default NavBar;

// import { Menu } from "antd";
// import { useNavigate } from "react-router-dom";
// import Authorization from "./Authorization";

// interface MenuItem {
//   label: string;
//   key: string;
// }

// function NavBar() {
//   const menuItems: MenuItem[] = [
//     {
//       label: "Movie App",
//       key: "Movie App",
//     },
//     {
//       label: "Favorite",
//       key: "favorite",
//     },
//     {
//       label: "Entrance",
//       key: "entrance",
//     },
//   ];

//   const navigate = useNavigate();

//   const handleMenuClick = (key: string) => {
//     if (key === "favorite") {
//       navigate("/favorite");
//     }
//   };

//   return (
//     <>
//       <Menu
//         items={menuItems}
//         mode="horizontal"
//         style={{
//           height: "60px",
//           backgroundColor: "lightBlue",
//           color: "white",
//           fontSize: "30px",
//           display: "flex",
//           justifyContent: "center",
//         }}
//         onClick={({ key }) => handleMenuClick(key)}
//       ></Menu>
//       <Authorization />
//     </>
//   );
// }

// export default NavBar;
