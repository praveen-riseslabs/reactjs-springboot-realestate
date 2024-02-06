import React,{useReducer} from 'react';
import {Link} from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import PageTitle from '../../layouts/PageTitle';
import { SvgDetail } from './DataSvg';


const svgBlogData = [
    {Iconname : 'bell.svg', svgtype : SvgDetail.Bell,},
    {Iconname : 'message.svg', svgtype : SvgDetail.Message},
    {Iconname : 'logout.svg', svgtype : SvgDetail.Logout},
    {Iconname : 'mail.svg', svgtype : SvgDetail.Mail},
    {Iconname : 'user.svg', svgtype : SvgDetail.User},
    {Iconname : 'gift.svg', svgtype : SvgDetail.Gift},
    {Iconname : 'search.svg', svgtype : SvgDetail.Search},
    {Iconname : 'customer.svg', svgtype : SvgDetail.Customer},
    {Iconname : 'commode.svg', svgtype : SvgDetail.Commode},
    {Iconname : 'wifi.svg', svgtype : SvgDetail.WiFi},
    {Iconname : 'bag.svg', svgtype : SvgDetail.Bag},
    {Iconname : 'analytic.svg', svgtype : SvgDetail.Analytic},
    {Iconname : 'bed.svg', svgtype : SvgDetail.Bed},
    {Iconname : 'location.svg', svgtype : SvgDetail.Location},
];

const SvgIcons  = () => {
    const initialState = false;
    const reducer = (state, action) =>{   
        switch (action.type){
            case 'imageModal':
                return { ...state, imageModal: !state.imageModal, content : action.content}
            case 'svgModal':
                return { ...state, svgModal: !state.svgModal, content : action.content, title: action.title}			
            default:
                return state
        }	
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            <PageTitle activeMenu={"Svg Icons"} motherMenu={"Icons"} />
            <div className="card"> 
                <div className="card-body svg-area">
                    <div className="row gx-xl-3">							
                        {svgBlogData.map((item, ind)=>(
                            <div className="col-xl-2 col-lg-4 col-xxl-2 col-md-6 col-sm-6 col-12 m-b20" key={ind}>	
                                <div className="svg-icons-ov">
                                    <div className="svg-icons-prev">
                                        <div dangerouslySetInnerHTML={{ __html: item.svgtype }} />                                                    
                                    </div>
                                    <div className="svg-classname">{item.Iconname}</div>
                                    <div className="svg-icon-popup">
                                        <Link to={"#"}  onClick={() => dispatch({type:'imageModal', content: item.Iconname })} className="btn btn-sm btn-brand"><i className="fa-solid fa-image"></i></Link>
                                        <Link to={"#"} onClick={() => dispatch({type:'svgModal', content: item.Iconname, title : item.svgtype })} className="btn btn-sm btn-brand"><i className="fa fa-code"></i></Link>
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                           
                <Modal className="modal fade" show={state.imageModal} onHide={()=>dispatch({type:'imageModal'})} centered>                                
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="svg_img_label_Brassieresvg">{state.content}</h5>
                            <button type="button" className="btn-close" onClick={() => dispatch({type:'imageModal'})}></button>
                        </div>
                        <div className="modal-body">                               
                            <pre>                           
{`import MyImage from "../images/iconly/${state.content}";
export default function Imageblog() {   
return  
    <div>
    <img src={MyImage} alt="Example" />   
    </div>
}`}
;
                            </pre>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => dispatch({type:'imageModal'})}>Close</button>
                        </div>
                    </div>
                
                </Modal>
                <Modal className="modal fade" show={state.svgModal} onHide={()=>dispatch({type:'svgModal'})} centered >                    
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="svg_inline_label_Brassieresvg">{state.content}</h5>
                            <button type="button" className="btn-close"   onClick={() => dispatch({type:'svgModal'})}>
                            </button>
                        </div>
                        <div className="modal-body">
<pre>   
{state.title}    
</pre>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => dispatch({type:'svgModal'})}>Close</button>
                        </div>
                    </div>
                    
                </Modal>
            </div>
        </div>
        </>
    );
};

export default SvgIcons ;