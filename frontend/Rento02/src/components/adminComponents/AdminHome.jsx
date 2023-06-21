import React from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';

import UserManagement from './AdminProfile';
import ProductManagement from './AddProduct';
import CategoryManagement from './AddCategory';
import CouponManagement from './AddCoupon';
import ViewUsers from './ViewUsers'
import AdminProduct from './AdminProduct'
import ViewCoupons from './ViewCoupon'
import ViewOrders from './VIewOrders'
import ViewCategory from './ViewCategory';
function AdminPanel() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Admin Panel</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tab.Container defaultActiveKey="users">
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="users">Users</Nav.Link>
              </Nav.Item>
              
             
              <Nav.Item>
                <Nav.Link eventKey="categories">Categories</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="coupons">Coupons</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="viewProducts">manage products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="viewUsers">manage Users</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="viewCoupons">manage Coupons</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orders">manage Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="viewCategories">manage category</Nav.Link>
              </Nav.Item>

            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="users">
                <UserManagement />
              </Tab.Pane>
              <Tab.Pane eventKey="products">
                <ProductManagement />
              </Tab.Pane>
              <Tab.Pane eventKey="categories">
                <CategoryManagement />
              </Tab.Pane>
              <Tab.Pane eventKey="coupons">
                <CouponManagement />
              </Tab.Pane>
              <Tab.Pane eventKey="viewUsers">
                <ViewUsers />
              </Tab.Pane>
              <Tab.Pane eventKey="viewProducts">
                <AdminProduct/>
              </Tab.Pane>
              <Tab.Pane eventKey="viewCoupons">
                <ViewCoupons/>
              </Tab.Pane>
              <Tab.Pane eventKey="orders">
                <ViewOrders/>
              </Tab.Pane>
              <Tab.Pane eventKey="viewCategories">
                <ViewCategory/>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPanel;
