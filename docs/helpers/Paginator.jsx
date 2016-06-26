import React from 'react';
import Pagify from 'react-pagify';
import segmentize from 'segmentize';

const Paginator = ({ pagination, pages, onSelect }) => (
  <div className="pagination">
    <Pagify.Context
      className="pagify-pagination"
      segments={segmentize({
        page: pagination.page,
        pages,
        beginPages: 3,
        endPages: 3,
        sidePages: 2
      })} onSelect={onSelect}
    >
      <Pagify.Button page={pagination.page - 1}>Previous</Pagify.Button>

      <Pagify.Segment field="beginPages" />

      <Pagify.Ellipsis
        className="ellipsis"
        previousField="beginPages"
        nextField="previousPages"
      />

      <Pagify.Segment field="previousPages" />
      <Pagify.Segment field="centerPage" className="selected" />
      <Pagify.Segment field="nextPages" />

      <Pagify.Ellipsis
        className="ellipsis"
        previousField="nextPages"
        nextField="endPages"
      />

      <Pagify.Segment field="endPages" />

      <Pagify.Button page={pagination.page + 1}>Next</Pagify.Button>
    </Pagify.Context>
  </div>
);
Paginator.propTypes = {
  pagination: React.PropTypes.object,
  pages: React.PropTypes.number,
  onSelect: React.PropTypes.func
};

export default Paginator;
