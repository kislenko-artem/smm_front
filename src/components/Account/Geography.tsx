import * as React from "react";
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import '../../typing'


export default class Geography extends React.Component<IGeographyProps, IGeographyState> {

    props: IGeographyProps

    constructor(props) {
        super(props);
    }

    render() {
        let total = 0;
        let slice_total = 0;
        const stop_index_slice = 4;
        if(this.props.groupInfoGegraphy.length == 0) {
            return <p>Данные не обнаружены или идет загрузка</p>;
        }
        const data = this.props.groupInfoGegraphy
            .filter((obj) => {return obj.city_id})
            .sort((a, b) => {return b.count - a.count})
            .map((object, index) => {
                total += object.count;
                if (index < stop_index_slice) {
                    slice_total += object.count;
                }
                return {'name': object.city_name, 'value': object.count}
            });
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a6d4fe'];
        let finish_data = data.slice(0, stop_index_slice);
        finish_data.push({'name': 'Остальные', 'value': total - slice_total});

        return (
            <div className="center-pie"><PieChart width={410} height={410}>
                <Pie
                    activeIndex={[]}
                    activeShape={[]}
                    data={finish_data}
                    cx={150}
                    cy={150}
                    outerRadius={150}
                    paddingAngle={0}
                    fill="#8268ee"
                    isAnimationActive={false}
                >
                    {
                        finish_data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                    }
                </Pie>
                <Legend width={140} height={76} layout='vertical' align='right' verticalAlign='middle' />
            </PieChart>
            <BootstrapTable data={data} striped={true} hover={true}>
              <TableHeaderColumn dataField="name" isKey={true} dataAlign="center" dataSort={true}>Город</TableHeaderColumn>
              <TableHeaderColumn dataField="value" dataAlign="center" dataSort={true}>Количество</TableHeaderColumn>
            </BootstrapTable>
            </div>);
    }
}