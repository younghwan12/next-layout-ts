import React, { useEffect, useState } from "react"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MessageOutlined,
} from "@ant-design/icons"
import { Menu, Button, theme, Layout as AntdLayout } from "antd"
import {} from "antd"
import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
const { Header, Sider, Content } = AntdLayout
import type { MenuProps } from "antd"
import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"
interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "ReactFlow",
      children: [
        {
          key: "flowchart",
          label: <Link href="/">FlowChart</Link>,
        },
      ],
    },
    {
      key: "tree",
      label: <Link href="/tree">Tree</Link>,
    },
    {
      key: "3",
      label: <Link href="/text">TextEditor</Link>,
    },
    {
      key: "4",
      label: <Link href="/test">TestPage</Link>,
    },
    {
      key: "5",
      label: <Link href="/chat">Chatting Test</Link>,
    },
  ]

  const router = useRouter()
  const [currentMenu, setCurrentMenu] = useState(null)
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const currentMenuItem = router.pathname.substring(1) || "flowchart"

  return (
    <AntdLayout>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        {/* <div className="px-3 py-5 min-h-[64px]">
          <Image className="mx-auto" alt="logo" width="163" height="163" src="/images/logo.png" />
        </div> */}
        <div className="demo-logo" />
        <Menu mode="inline" selectedKeys={[currentMenuItem]} items={items} />
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
      <FloatButton.Group trigger="click" type="primary" style={{ right: 24 }} icon={<CustomerServiceOutlined />}>
        <FloatButton tooltip="다크 모드" icon={<CommentOutlined />} />
        <FloatButton tooltip="문의 하기" icon={<MessageOutlined />} />
      </FloatButton.Group>
    </AntdLayout>
  )
}

export default Layout
