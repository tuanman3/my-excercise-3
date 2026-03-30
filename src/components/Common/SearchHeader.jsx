import React, { useState } from "react";
import { Button, Input } from "antd";

const { Search } = Input;

const SearchHeader = ({ onSearch }) => {
  const [tempSearch, setTempSearch] = useState("");

  return (
    <Search
      style={{ height: "33px" }}
      placeholder="Tìm kiếm theo tên,..."
      allowClear
      value={tempSearch}
      enterButton={
        <Button
          onClick={() => onSearch(tempSearch)}
          style={{
            background: "#dcd7c977",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.background = "#dcd7c9";
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "";
            e.currentTarget.style.background = "#dcd7c977";
            e.currentTarget.style.color = "";
          }}
        >
          Tìm kiếm
        </Button>
      }
      size="large"
      onSearch={(value) => onSearch(value)}
      onChange={(e) => setTempSearch(e.target.value)}
    />
  );
};

export default SearchHeader;
