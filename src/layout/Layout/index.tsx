import React, { useState } from "react"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons"
import { Menu, Button, theme, Layout as AntdLayout } from "antd"
import {} from "antd"
import Image from "next/image"

const { Header, Sider, Content } = AntdLayout

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [currentMenu, setCurrentMenu] = useState(null)
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const handleMouseEnter = (e) => {
    setCurrentMenu(e.key)
  }

  const handleMouseLeave = () => {
    setCurrentMenu(null)
  }

  return (
    <AntdLayout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* <div className="px-3 py-5 min-h-[64px]">
          <Image className="mx-auto" alt="logo" width="163" height="163" src="/images/logo.png" />
        </div> */}
        <div className="demo-logo" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              label: "1페이지",
              children: [
                {
                  key: "1.1",
                  label: "페이지1.1",
                },
              ],
            },
            {
              key: "2",
              label: "2페이지",
            },
            {
              key: "3",
              label: "3페이지",
            },
          ]}
        />
      </Sider>
      <AntdLayout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              //   alignItems: "center",
              //   justifyContent: "center",
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </AntdLayout>
    </AntdLayout>
  )
}

export default Layout
