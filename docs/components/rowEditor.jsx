import React from 'react';

import { EditCell, Modal } from './';

const rowEditor = ({
  properties,
  onConfirm,
  onRemove,
}) => {
  class RowEditor extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        modal: {
          show: false,
          title: 'title',
          content: 'content',
        },
      };

      this.onModalClose = this.onModalClose.bind(this);
    }
    render() {
      const { cellData } = this.props;
      const { modal } = this.state;

      return (
        <div>
          <span
            className="edit"
            onClick={() => this.edit(cellData)} style={{ cursor: 'pointer' }}
          >
            &#8665;
          </span>
          <span
            className="remove"
            onClick={e => onRemove(cellData.id, e)} style={{ cursor: 'pointer' }}
          >
            &#10007;
          </span>

          <Modal
            show={modal.show}
            title={modal.title}
            onCloseClicked={this.onModalClose}
          >
            {modal.content}
          </Modal>
        </div>
      );
    }
    edit(cellData) {
      this.setState({
        modal: {
          show: true,
          title: 'Edit',
          content: <EditCell
            onSubmit={(formData) => {
              onConfirm(cellData.id, formData);

              this.setState({
                modal: { ...this.state.modal, show: false },
              });
            }}
            onCancel={() => {
              this.setState({
                modal: {
                  ...this.state.modal,
                  ...{
                    show: false,
                  },
                },
              });
            }}
            formData={cellData}
            properties={properties}
          />,
        },
      });
    }
    onModalClose() {
      this.setState({
        modal: {
          ...this.state.modal,
          ...{
            show: false,
          },
        },
      });
    }
  }
  RowEditor.propTypes = {
    cellData: React.PropTypes.object.isRequired,
  };

  return props => ({
    children: React.createElement(RowEditor, props),
  });
};

export default rowEditor;
