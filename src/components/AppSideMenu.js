import { Menu } from "antd";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import React from "react";

function AppSideMenu() {
//   const pathname = usePathname();
//   const [selectedKey, setSelectedKey] = useState(["1"]);

  const menuItems = [
    {label:<Link href="/">Home</Link>, key:1},
    { label: <Link href="/posts">Posts</Link>, key: 2 },
  ];
  return (
    <Menu mode="inline" items={menuItems} ></Menu>
  );
}

export default AppSideMenu;
