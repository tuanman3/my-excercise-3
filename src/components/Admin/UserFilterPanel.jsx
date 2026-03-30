import React, { useEffect, useState } from "react";
import { Card, Row, Col, Input, Select, Button, Space } from "antd";
import { FilterOutlined, ClearOutlined, UpOutlined } from "@ant-design/icons";

const UserFilterPanel = ({
  filters,
  onFilterChange,
  onClearFilters,
  onCollapse,
  isCollapsed,
}) => {
  // create temp state to keep value was typing
  const [tempFilters, setTempFilters] = useState(filters);

  // sync when reset
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const statusOptions = [
    { value: "đã kích hoạt", label: "Đã kích hoạt" },
    { value: "chưa kích hoạt", label: "Chưa kích hoạt" },
  ];

  return (
    <Card
      className={`user-filter-card ${isCollapsed ? "collapsed" : ""}`}
      title={
        <Space>
          <FilterOutlined style={{ color: "#DCD7C9" }} />
          <span>Bộ lọc nâng cao</span>
        </Space>
      }
      extra={
        <Button
          type="text"
          icon={<UpOutlined rotate={isCollapsed ? 180 : 0} />}
          onClick={onCollapse}
          title={isCollapsed ? "Mở rộng" : "Thu gọn"}
        />
      }
      style={{ marginBottom: 16, border: "1px solid #E2DFD6" }}
      styles={{
        body: { padding: isCollapsed ? 0 : 24, transition: "all 0.3s ease" },
      }}
    >
      {/* Only show content when not collapsed */}
      {!isCollapsed && (
        <Row gutter={[16, 16]}>
          {/* Filter name */}
          <Col xs={24} sm={12} md={8}>
            <label className="filter-label">Họ tên:</label>
            <Input
              placeholder="Nhập tên nhân viên..."
              value={tempFilters.name}
              onChange={(e) =>
                setTempFilters({ ...tempFilters, name: e.target.value })
              }
              allowClear
            />
          </Col>

          {/* Filter email */}
          <Col xs={24} sm={12} md={8}>
            <label className="filter-label">Email:</label>
            <Input
              placeholder="Nhập email..."
              value={tempFilters.email}
              onChange={(e) =>
                setTempFilters({ ...tempFilters, email: e.target.value })
              }
              allowClear
            />
          </Col>

          {/* Filter phone */}
          <Col xs={24} sm={12} md={8}>
            <label className="filter-label">Số điện thoại:</label>
            <Input
              placeholder="09xxxxxxxx"
              value={tempFilters.phone}
              onChange={(e) =>
                setTempFilters({ ...tempFilters, phone: e.target.value })
              }
              allowClear
            />
          </Col>

          {/* Filter status*/}
          <Col xs={24} sm={12} md={8}>
            <label className="filter-label">Trạng thái:</label>
            <Select
              placeholder="Chọn trạng thái"
              style={{ width: "100%" }}
              value={tempFilters.status}
              onChange={(val) =>
                setTempFilters({ ...tempFilters, status: val })
              }
              allowClear
              options={statusOptions}
            />
          </Col>

          {/* button actions filter */}
          <Col xs={24} style={{ textAlign: "right", marginTop: 16 }}>
            <Space>
              <Button icon={<ClearOutlined />} onClick={onClearFilters}>
                Xóa bộ lọc
              </Button>
              <Button
                type="primary"
                icon={<FilterOutlined />}
                style={{ backgroundColor: "#A49F8C", borderColor: "#A49F8C" }} // Màu be đậm chuẩn
                onClick={() => onFilterChange(tempFilters)}
              >
                Áp dụng
              </Button>
            </Space>
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default UserFilterPanel;
