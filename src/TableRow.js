// TableRow.js
import React from 'react';

const TableRow = ({ service }) => (
  <tr>
    <td>{service.name}</td>
    <td>{service.description}</td>
    <td><a href="#">{service.link}</a></td>
    <td>{service.tags}</td>
    <td>{service.rating}</td>
  </tr>
);

export default TableRow;