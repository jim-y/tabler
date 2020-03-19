import React from 'react';

export const TableHead = props => {
  return (
    <thead>
      <tr>
        {props.headers.map(header => (
          <th>{header}</th>
        ))}
      </tr>
    </thead>
  );
};
