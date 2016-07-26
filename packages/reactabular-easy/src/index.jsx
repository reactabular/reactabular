import React from 'react';
import * as Table from 'reactabular-table';
import * as search from 'reactabular-search';
import * as sort from 'reactabular-sort';
import * as edit from 'reactabular-edit';
import * as highlight from 'reactabular-highlight';
import * as resolve from 'reactabular-resolve';

export default class EasyTable extends React.Component {
  render() {
    const { columns, rows } = this.props;

    return (
      <Table.Provider
        columns={columns}
      >
        <Table.Header />

        <Table.Body rows={rows} rowKey="id" />
      </Table.Provider>
    );
  }
}
