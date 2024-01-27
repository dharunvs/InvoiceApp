import React from "react";
import "./Table.css";
import Assets from "../../Assets";

const Table = ({ columns, rows, skipRows }) => {
  // skipRows = ["In Stock"];
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

  return (
    <table>
      <thead>
        <tr>
          {/* <div className="arrowRightBlocker"></div>
           */}
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
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rowIndex) => (
          <>
            <tr key={rowIndex}>
              {/* <div className="arrowRight">
              {rowIndex == num && <Assets.Icons.RightArrow />}
            </div> */}

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
                          column.name != "Dots"
                            ? "customBorder"
                            : "customBorder"
                        }
                      >
                        <p>
                          {/* {column.name != "Dots" ? row[column.name] : "..."} */}
                          {row[column.name]}
                        </p>
                      </div>
                    </td>
                  )
              )}
              <td></td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
