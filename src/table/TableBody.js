import React from "react";

export const TableBody = props => {
  return (
    <tbody>
      {props.rows.map(playerObj => (
        <tr key={playerObj.id}>
          {Object.keys(playerObj).map(key => (
            <td>{playerObj[key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
