import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Image,
  Layout,
  Space,
  Switch,
  Typography,
} from "antd";
import { useMemo } from "react";

import darkLogo from "@/assets/img/dark.webp";
import lightLogo from "@/assets/img/light.webp";
import {
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  ProfileOutlined,
  SafetyOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "@tanstack/react-router";

import { useAuth } from "../hooks/useAuth";
import { useSidebar } from "../hooks/useSidebar";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../utils/cn";
import { getInitials } from "../utils/getInitials";
import { getUniqueColor } from "../utils/getUniqueColor";

const { Text } = Typography;

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  const { isMinimized, toggle } = useSidebar();

  const handleName = (name?: string) => {
    if (!name) {
      return name;
    }
    const nameArray = name.split(" ");
    if (nameArray.length === 1) {
      return nameArray[0];
    }
    if (nameArray.length > 1) {
      return `${nameArray[0]} ${nameArray.pop()}`;
    }
    return name;
  };

  const imageLogo = useMemo<string>(() => {
    if (isMinimized) {
      return "https://plataformaa.com.br/hubfs/favicon%20Plataforma%20A.png";
    }
    return theme === "dark" ? darkLogo : lightLogo;
  }, [isMinimized, theme]);

  return (
    <Layout.Header
      className={cn(
        "!flex !justify-between !items-center !p-4 !h-24",
        theme === "dark" ? "bg-slate-950!" : "bg-white!"
      )}
    >
      <Flex justify="center" align="center">
        <Link to="/dashboard" className="!h-16">
          <Image
            src={imageLogo}
            alt="Logo Algetec"
            height={isMinimized ? 48 : 48}
            width={isMinimized ? 48 : 150}
            preview={false}
          />
        </Link>
        <Button
          type="text"
          icon={isMinimized ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggle}
          size="large"
        />
      </Flex>

      <Space>
        <Switch
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          onChange={(value) => setTheme(value ? "dark" : "light")}
          defaultChecked={theme === "dark"}
        />
        <Dropdown
          menu={{
            items: [
              {
                label: "Perfil",
                icon: <ProfileOutlined />,
                key: "profile",
                onClick: () => navigate({ to: "/dashboard/profile" }),
              },
              {
                label: "Permissões",
                icon: <SafetyOutlined />,
                key: "permissions",
                onClick: () => navigate({ to: "/dashboard/permissions" }),
              },
              // {
              //   label: "Novidades",
              //   key: "news",
              //   onClick: () => navigate({ to: "/dashboard/news" }),
              //   icon: <FireOutlined />,
              // },
              {
                label: "Sair",
                icon: <LogoutOutlined />,
                key: "logout",
                onClick: () => signOut(),
              },
            ],
          }}
        >
          <Button
            type="text"
            style={{
              height: "fit-content",
              alignSelf: "center",
              justifySelf: "center",
            }}
          >
            <Space align="center">
              <Avatar style={{ backgroundColor: getUniqueColor(user?.name) }}>
                {getInitials(user?.name)}
              </Avatar>
              <Space direction="vertical">
                <Text style={{ fontSize: 16 }}>{handleName(user?.name)}</Text>
                <Text style={{ fontSize: 14 }}>{user?.role.name}</Text>
              </Space>
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </Space>
    </Layout.Header>
  );
}
