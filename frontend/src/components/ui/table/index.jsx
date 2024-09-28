import { Table } from "antd";
import React from "react";

const CustomTable = ({columns, dataSource, rowKey}) => {
  return (
    <Table
      className="custom-table"
      rowClassName="custom-row"
      rowKey={rowKey}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  );
};

export default CustomTable;
