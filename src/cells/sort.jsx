import React from 'react';

export default function (
  onSort = () => {},
  header
) {
  return ({ property }) => {
    return <span onClick={() => onSort(property)}>{header}</span>;
  };
}
