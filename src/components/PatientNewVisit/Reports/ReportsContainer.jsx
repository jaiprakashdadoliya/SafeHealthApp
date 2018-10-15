import React from "react";
import Loadable from 'react-loadable'; 
import { Loading } from '../../../global';

const Reports = Loadable({
    loader: () => import('./Reports' /* webpackChunkName = "Reports" */).then(object => object.Reports),
    loading: Loading
});

export class ReportsContainer extends React.Component {
	constructor(props){
		super(props);
	}

    render() {
        return (
            <div >
                <Reports 
                    staticData          = {this.props.staticData}
                    staticDatafetched   = {this.props.staticDatafetched}
                />
            </div>
        );
    }
}