import React, { useState } from "react";
import "./Table.css";
import Assets from "../../Assets";

const Table = ({ columns, rows, skipRows }) => {
  const calculateColumnWidth = (totalColumns, specifiedWidthColumns) => {
    const numberOfAutoWidthColumns =
      totalColumns - specifiedWidthColumns.length;
    const remainingWidth =
      100 -
      specifiedWidthColumns.reduce(
        (sum, col) => sum + parseFloat(col.width),
        0
      );
    const autoWidth =
      numberOfAutoWidthColumns > 0
        ? remainingWidth / numberOfAutoWidthColumns
        : 0;
    return autoWidth + "%";
  };

  const num = Math.floor(Math.random() * rows.length);

  const TableInput = ({ value }) => {
    const [val, setVal] = useState(value);
    return (
      <input
        type="text"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
        }}
      />
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th className="arrowRightBlocker"></th>

          {columns.map(
            (column, index) =>
              !skipRows.includes(column.name) && (
                <th
                  key={index}
                  style={{
                    width:
                      column.width ||
                      calculateColumnWidth(
                        columns.length,
                        columns.filter((col) => col.width)
                      ),
                  }}
                >
                  <div className={column.name.replace(/[ .\/]/g, "")}>
                    <p>{column.name != "Dots" && column.name}</p>
                    {column.icon}
                  </div>
                </th>
              )
          )}
          <th key={"unique"}></th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td style={{ width: "2%", padding: 0 }}>
              {rowIndex == num && <Assets.Icons.RightArrow />}
            </td>

            {columns.map(
              (column, colIndex) =>
                !skipRows.includes(column.name) && (
                  <td
                    key={colIndex}
                    style={{
                      width:
                        column.width ||
                        calculateColumnWidth(
                          columns.length,
                          columns.filter((col) => col.width)
                        ),
                    }}
                  >
                    <div
                      className={
                        column.name != "Dots" ? "customBorder" : "customBorder"
                      }
                    >
                      {/* <p>{row[column.name]}</p> */}
                      {/* <input type="text" value={row[column.name]} /> */}
                      <TableInput value={row[column.name]} />
                    </div>
                  </td>
                )
            )}
            <td style={{ width: "2%", padding: 0 }}>
              <Assets.Icons.HorizontalDots />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
