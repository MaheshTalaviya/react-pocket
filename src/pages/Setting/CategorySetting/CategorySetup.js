import React,{useEffect,useState} from 'react'
import Header from '../../../component/Header';
import foodIcon from '../../../assets/images/food-icon.png'
import schoolIcon from '../../../assets/images/school-icon.png'
import travelIcon from '../../../assets/images/travel-icon.png'
import rechargeIcon from '../../../assets/images/phone-icon.png'
import moviesIcon from '../../../assets/images/movie-icon.png'
import otherIcon from '../../../assets/images/dot-icon.png';
import { Collapse } from 'bootstrap';
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal';
import AddSubCategoryModal from './AddSubCategoryModal';
import EditSubCategoryModal from './EditSubCategoryModal';
import { useDispatch, useSelector, } from 'react-redux'
import {getCategorySubList,updateCategoryStatus } from '../../../redux/action/SettingAction/SettingAction'

import { isEmpty } from 'lodash';

const CategorySetup = () => {
  const [expanded, SetExpanded] = useState(false)
  const [isCategory, setIsCategory] = useState()
  const [isCatModal, setIsCatModal] = useState(false)
  const [isSubCatModal, setIsSubCatModal] = useState(false)
  const [isEditCatModal, setIsEditCatModal] = useState(false)
  const [isEditSubCatModal, setIsEditSubCatModal] = useState(false)
  const [isCatId, setIsCatId] = useState('')
  const [isSubCategoryId, setIsSubCategoryId] = useState('')

  const dispatch = useDispatch(); 
  const catSubCatData = useSelector(state => state.settingData.getCatSubcatData)
  const updateCategoryStatus1 = useSelector(state => state.settingData.updateCategoryStatus)

  useEffect(() => {
    dispatch(getCategorySubList())
  },[])

 const categoryModal = ()=>{
    setIsCatModal(!isCatModal)
 }

 const editCategoryModal =(item)=>{
  setIsCatId(item)
  setIsEditCatModal(!isEditCatModal)
 }

 const subCategoryModal = (catId)=>{
  setIsCatId(catId)
  setIsSubCatModal(!isSubCatModal)
}

const editSubCategoryModal=(val)=>{
  setIsSubCategoryId(val)
  setIsEditSubCatModal(!isEditSubCatModal)
}

const updateCategoryStatusFun=(id,status,type)=>{
  if(status==1){
    status=0;
  }else{
    status=1;
  }

  const data={
    id,
    status,
    type
  }
  
  dispatch(updateCategoryStatus(data));
}

  const renderTableData = () => {
    //console.log('use....', userData)
    return  !isEmpty(catSubCatData) && catSubCatData.data.map((item, index) => {

      const { id,type,icon,status,merchant_subcategory_lists } = item 
      return (
        <div className="card" key={index}>
          <div className="card-header">
            <button 
              className="btn" 
              data-toggle="collapse" 
              data-target={`#collapse_${id}`}
              aria-expanded="false" 
              aria-controls={`collapse_${id}`}
               >
              <span className="cardIcon"><i><img src={icon?icon:foodIcon} alt /></i></span>
              <span className="cardTxt">{type}</span>
              
              
            </button>
            <div className="iconAbs">
              <a 
                className="action-link" 
                onClick={()=>editCategoryModal(item)}
              >
                  <i className="icon-icon-edit" />
              </a>
              <a 
                className={status===1 ? "action-link" : "action-link-danger" } 
                href="#" 
                onClick={()=>updateCategoryStatusFun(id,status,'category')}>
                <i className="icon-icon-block" />
              </a>
            </div>
          </div>
          <div id={`collapse_${id}`} className={`collapse `} data-parent="#accordionExample">
            <div className="card-body">
            <div className="payList">
             
            { !isEmpty(merchant_subcategory_lists) && merchant_subcategory_lists.map((val, key) => {
              return(
                <div className="payList-single" key={key}>
                  <span>{val.subcategory}</span>
                  <div className="iconAbs">
                    <a 
                      className="action-link" 
                      onClick={()=>editSubCategoryModal(val)}
                    >
                      <i className="icon-icon-edit" />
                    </a>
                    <a 
                      className={val.status===1 ? "action-link" : "action-link-danger" } 
                      href="#"
                      onClick={()=>updateCategoryStatusFun(val.id,val.status,'subcategory')}
                    >
                      <i className="icon-icon-block" />
                    </a>
                  </div>
                </div>
              )
            }) 
          } 
           
              </div>
              <div className="addSub">
                <a 
                  data-toggle="modal" 
                  data-target="#addSubCateModal" 
                  className="btn grey-btn sm-btn"
                  onClick={()=>subCategoryModal(id)}
                  >Add sub-category</a>
              </div>
            </div>
          </div>
        </div>

      )
    })
  }

  return (
    <div>
    <Header />
   
      <AddCategoryModal
        isModalOpen={isCatModal} 
        onClick={() => categoryModal()}
      />
      {isEditCatModal &&
       <EditCategoryModal
         isModalOpen={isEditCatModal} 
         onClick={() => editCategoryModal()}
         categoryData={isCatId}
      />
      }
      {isSubCatModal &&
      <AddSubCategoryModal
       isModalOpen={isSubCatModal} 
       onClick={() => subCategoryModal()}
       id={isCatId}
      />
      }
      {isEditSubCatModal &&
      <EditSubCategoryModal
       isModalOpen={isEditSubCatModal} 
       onClick={() => editSubCategoryModal()}
       subCategoryData={isSubCategoryId}
      />
      }
     
   
<section className="dash-wrap">
  <div className="settings-block sm">
    <div className="row align-items-center">
      <div className="col-lg-6">
        <h1 className="text-left">Categories Setup</h1>
      </div>
      <div className="col-lg-6">
        <input 
          className="btn btn-block green-btn"
           type="button" 
           name value="Add a new category" 
           onClick={()=>categoryModal()} 
           />
      </div>
    </div>
    <div className="cate-accordion">
      <div className="accordion" id="accordionExample">

      { renderTableData()}
   

      </div>
    </div>
  </div>
</section>
</div>
  )
}


export default CategorySetup;