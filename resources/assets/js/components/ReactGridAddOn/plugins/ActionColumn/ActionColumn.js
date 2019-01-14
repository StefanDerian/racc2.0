import React from 'react'
import PropTypes from 'prop-types'

import {Getter, Template, Plugin} from '@devexpress/dx-react-core'
import {
    Table,
} from '@devexpress/dx-react-grid-bootstrap4'

const pluginDependencies = [
    {name: 'Table'},
];

const ACTIONS_COLUMN_TYPE = 'actionsColumnType';
const TABLE_HEADING_TYPE = 'heading';

function tableColumnsWithActions(tableColumns, width) {
    return [...tableColumns, {key: ACTIONS_COLUMN_TYPE, type: ACTIONS_COLUMN_TYPE, width: width}];
}

function isHeadingActionsTableCell(tableRow, tableColumn) {
    return tableRow.type === TABLE_HEADING_TYPE && tableColumn.type === ACTIONS_COLUMN_TYPE;
}

function isActionsTableCell(tableRow, tableColumn) {
    return tableRow.type !== TABLE_HEADING_TYPE && tableColumn.type === ACTIONS_COLUMN_TYPE;

}

class ActionColumn extends React.PureComponent {
  render() {
    const {
            actions,
            width,
        } = this.props;
    const tableColumnsComputed = ({tableColumns}) => tableColumnsWithActions(tableColumns, width);
    return (
      <Plugin
                name="ActionsColumn"
                dependencies={pluginDependencies}
            >
                <Getter name="tableColumns" computed={tableColumnsComputed}/>

                <Template
                    name="tableCell"
                    predicate={({tableRow, tableColumn}) =>
                    isHeadingActionsTableCell(tableRow, tableColumn)}
                >
                    <Table.Cell>Actions Column</Table.Cell>
                </Template>
                <Template
                    name="tableCell"
                    predicate={({tableRow, tableColumn}) => isActionsTableCell(tableRow, tableColumn)}
                >
                    {params => (
                        <Table.Cell {...params} row={params.tableRow.row}>
                            {actions.map(action => {
                                const id = params.tableRow.row.id;
                                return (
                                    <div>
                                      <button className = "btn btn-md btn-primary" onClick={() => action.action(id)}>
                                          {action.icon}
                                      </button>
                                    </div>
                                )

                            })}
                       </Table.Cell>
                    )}
                </Template>
            </Plugin>
    );
  }
}
ActionColumn.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.PropTypes.shape({
        icon: PropTypes.node,
        action: PropTypes.func.isRequired
    })).isRequired,
    width: PropTypes.number
};
ActionColumn.defaultProps = {
    width: 240,
}; 
export default ActionColumn
