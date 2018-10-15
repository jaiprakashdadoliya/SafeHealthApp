import React from "react";
import moment from 'moment';
var formBuilderConfig = {
            fields: [                
                {
                    name: "symptom_name",
                    idField: "symptom_id",
                    title: "Symptoms Name",
                    value:"",
                    type: "autocomplete",   
                    showOnForm: true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ]
                },
                {
                    name: "since_date",
                    title: "Since When",
                    type: "date",
                    value:"",
                    showOnForm: true,
                    format:"DD/MM/YYYY",
                    clearFix:true,
                    validations:[
                        {
                            isRequired:true,
                            msg:'This field is required.'
                        }
                    ]
                },
                {
                    name: "comment",
                    title: "Comment",
                    value:"",
                    type: "text",
                    showOnForm: true,
                    clearFix:true,
                    cssClasses:{
                        inputParentClass:'col-md-12'
                    }
                },
                {
                    name:"visit_symptom_id",
                    value:"",
                    type:"hidden",
                    showOnForm: true
                },
                {
                    name: "pat_id",
                    value:"",
                    type: "hidden",
                    showOnForm: true
                },
                {
                    name: "visit_id",
                    value:"",
                    type: "hidden",
                    showOnForm: true
                },
                {
                    name:"symptom_id",
                    value:"",
                    type: "hidden",
                    showOnForm: true
                }
            ],
            data: {
                symptom_name_data:[]
            },
           handlers:{               
           }
        };
        
var gridData = {
         noDataText : "Symptoms not found !!",
         columns : [
                     {
                         Header: "Name",
                         headerClassName: 'grid-header',
                         accessor: "symptom_name"
                     },
                     {
                         Header: "Since",
                         accessor: "since_date",
                         className : "dataCellClass",
                         headerClassName: 'grid-header',
                         filterMethod: (filter, row) => {
                             return row[filter.id].includes(filter.value)
                         },
                         Cell: (props) => {return <span>{moment(props.value).format('DD/MM/YYYY')}</span>}
                     },
                     {
                         Header: "Comment",
                         accessor: "comment",
                         headerClassName: 'grid-header',
                         filterMethod: (filter, row) => {
                             return row[filter.id].includes(filter.value)
                         },
                     }
                 ],
             minRows                 : 0,
             defaultPageSize         : 5,
             className               : "table table-bordered responsive",
             defaultFilterMethod     : (filter, row) =>String(row[filter.id]) === filter.value,
             showPagination          : true,
             showPaginationTop       : true,
             showPaginationBottom    : false,
             pageSizeOptions         : [5,10,25,50,100],
             Sorted:true,
             manual:true // Identify Server Side Pagination
     }  
     
     
 var extraConfig = {       
        showEditButton:true,
        showDeleteButton:true,
        cssClasses:{
            actionHeaderClass:'grid-header-action',
            actionColumnClass:'text-center',
            editButtonClass:'green btn table-btn',
            deleteButtonClass:'red btn table-btn'
        }
    }    
       
var formConfig = {
    formBuilderConfig :formBuilderConfig,
    gridData : gridData,
    extraConfig : extraConfig
}
        
export {formConfig as formConfig}